#!/usr/bin/env node

/**
 * Daily project fetch script
 * This script should be run once per day to fetch fresh project data from Google Drive
 * 
 * Usage:
 * - Manual: node scripts/daily-fetch.js
 * - Cron: 0 0 * * * cd /path/to/project && node scripts/daily-fetch.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const CACHE_FILE = path.join(__dirname, '..', 'data', 'projects-cache.json');

async function fetchProjectsFromDrive() {
  try {
    console.log('Starting daily project fetch from Google Drive...');
    
    // Get environment variables
    const folderId = process.env.DRIVE_FOLDER_ID;
    const serviceAccountEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY;

    if (!folderId || !serviceAccountEmail || !privateKey) {
      throw new Error('Missing Google Drive configuration');
    }

    // Initialize Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // List folders in the specified directory
    const foldersResponse = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    const folders = foldersResponse.data.files || [];
    const projects = [];

    console.log(`Found ${folders.length} folders in Google Drive`);

    // For each folder, collect all images
    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;

      try {
        // Search for all image files in the folder
        const filesResponse = await drive.files.list({
          q: `'${folder.id}' in parents and (mimeType contains 'image/')`,
          fields: 'files(id, name, mimeType)',
        });

        const imageFiles = filesResponse.data.files || [];
        
        if (imageFiles.length > 0) {
          // Find main.png for the card display
          const mainImage = imageFiles.find(file => file.name === 'main.png') || imageFiles[0];
          
          // Create project images array
          const projectImages = imageFiles.map(file => ({
            id: file.id,
            name: file.name,
            url: `/api/image/${file.id}`,
            isMain: file.name === 'main.png'
          }));

          const mainImageUrl = `/api/image/${mainImage.id}`;
          console.log(`Created project: ${folder.name} with ${imageFiles.length} images`);
          
          projects.push({
            id: folder.id,
            name: folder.name,
            imageUrl: mainImageUrl,
            folderId: folder.id,
            images: projectImages,
          });
        } else {
          console.log(`No images found in folder: ${folder.name}`);
        }
      } catch (error) {
        console.error(`Error processing folder ${folder.name}:`, error);
        // Continue with other folders even if one fails
      }
    }

    console.log(`Successfully processed ${projects.length} projects`);
    return projects;
  } catch (error) {
    console.error('Error fetching projects from Google Drive:', error);
    throw error;
  }
}

async function saveProjectsToCache(projects) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const now = new Date();
    const nextUpdate = new Date(now);
    nextUpdate.setDate(nextUpdate.getDate() + 1);
    nextUpdate.setHours(0, 0, 0, 0); // Set to midnight tomorrow

    const cacheData = {
      projects,
      lastUpdated: now.toISOString(),
      nextUpdate: nextUpdate.toISOString(),
    };

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log(`Projects cached successfully. Next update: ${nextUpdate.toISOString()}`);
  } catch (error) {
    console.error('Error saving projects to cache:', error);
    throw error;
  }
}

async function runDailyFetch() {
  try {
    console.log('Starting daily project fetch...');
    console.log('Time:', new Date().toISOString());
    
    // Fetch projects from Google Drive
    const projects = await fetchProjectsFromDrive();
    
    // Save to cache
    await saveProjectsToCache(projects);
    
    console.log(`Daily fetch completed successfully. Fetched ${projects.length} projects.`);
    console.log('Next update will be at midnight tomorrow.');
    
  } catch (error) {
    console.error('Daily fetch failed:', error);
    process.exit(1);
  }
}

// Run the fetch
runDailyFetch();
