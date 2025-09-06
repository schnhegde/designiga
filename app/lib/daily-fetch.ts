import { google } from 'googleapis';
import { Project } from '../types/project';
import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'data', 'projects-cache.json');

interface CacheData {
  projects: Project[];
  lastUpdated: string;
  nextUpdate: string;
}

export async function fetchProjectsFromDrive(): Promise<Project[]> {
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
    const projects: Project[] = [];

    console.log(`Found ${folders.length} folders in Google Drive`);

    // For each folder, look for main.png
    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;

      try {
        // Search for main.png in the folder
        const filesResponse = await drive.files.list({
          q: `'${folder.id}' in parents and name='main.png'`,
          fields: 'files(id, name)',
        });

        const mainPngFile = filesResponse.data.files?.[0];
        
        if (mainPngFile?.id) {
          // Use our proxy endpoint to serve the image
          const imageUrl = `/api/image/${mainPngFile.id}`;
          console.log(`Created project: ${folder.name} with image URL: ${imageUrl}`);
          
          projects.push({
            id: folder.id,
            name: folder.name,
            imageUrl,
            folderId: folder.id,
          });
        } else {
          console.log(`No main.png found in folder: ${folder.name}`);
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

export async function saveProjectsToCache(projects: Project[]): Promise<void> {
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

    const cacheData: CacheData = {
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

export async function loadProjectsFromCache(): Promise<Project[]> {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      console.log('No cache file found, fetching fresh data...');
      const projects = await fetchProjectsFromDrive();
      await saveProjectsToCache(projects);
      return projects;
    }

    const cacheData: CacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const now = new Date();
    const nextUpdate = new Date(cacheData.nextUpdate);

    // If it's time for the next update, fetch fresh data
    if (now >= nextUpdate) {
      console.log('Cache expired, fetching fresh data...');
      const projects = await fetchProjectsFromDrive();
      await saveProjectsToCache(projects);
      return projects;
    }

    // Check if projects have images property (migration for old cache)
    const needsMigration = cacheData.projects.some(project => !project.images);
    if (needsMigration) {
      console.log('Cache needs migration, fetching fresh data...');
      const projects = await fetchProjectsFromDrive();
      await saveProjectsToCache(projects);
      return projects;
    }

    console.log(`Using cached projects (last updated: ${cacheData.lastUpdated})`);
    return cacheData.projects;
  } catch (error) {
    console.error('Error loading projects from cache:', error);
    // Fallback to fresh fetch if cache is corrupted
    const projects = await fetchProjectsFromDrive();
    await saveProjectsToCache(projects);
    return projects;
  }
}

export function getCacheInfo(): { lastUpdated: string; nextUpdate: string; isExpired: boolean } | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return null;
    }

    const cacheData: CacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    const now = new Date();
    const nextUpdate = new Date(cacheData.nextUpdate);

    return {
      lastUpdated: cacheData.lastUpdated,
      nextUpdate: cacheData.nextUpdate,
      isExpired: now >= nextUpdate,
    };
  } catch (error) {
    console.error('Error reading cache info:', error);
    return null;
  }
}
