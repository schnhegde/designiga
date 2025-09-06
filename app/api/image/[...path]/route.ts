import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const fileId = params.path[0];
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    // Get environment variables
    const serviceAccountEmail = process.env.GOOGLE_SA_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SA_PRIVATE_KEY;

    if (!serviceAccountEmail || !privateKey) {
      return NextResponse.json(
        { error: 'Missing Google Drive configuration' },
        { status: 500 }
      );
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

    // Get the file
    const fileResponse = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    }, {
      responseType: 'stream',
    });

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');
    headers.set('Cache-Control', 'public, max-age=3600');

    // Return the image stream
    return new NextResponse(fileResponse.data as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching image from Google Drive:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
