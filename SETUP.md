# Google Drive Project Provider Setup

This project now includes a dynamic project provider that fetches project data from Google Drive folders. Here's how to set it up:

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=website-images@designiga.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDvwbEVIwQmF7z4\n/J3RqnWcGurH8LOtzVLhLWlWXM1DTpKnsN98/3x5Z9OsSNr7rgj2LrgvP4wMy34m\nwiYQsRtsYxOjsWZIaBCtz1K6PYPV7xXr66IjFltb6gB8AJWUIRkGpakMSkwv+HwF\n+vCTe/Pyy5TZ1D8Svu91sOPPoQKSSgkx6MSBjo7IAhK9sqnLdzTdAKoLaLloz/dx\nl0IiKUMQFc11Kze4mczYQqZw+kSFx89SvcxoFIvrBGrYbmMq0mSFDSnl5/Wy367F\nUXez3zdfs0vBsxKBBTTzs1I7d7X9DCAidp2jC646lc5ve0+1PBdNMD8Ct4BAl+Ie\n/EdIFUOHAgMBAAECggEADVi/QymstuEBs8c1bnWvEBnlNkgo2HcroIcdx3yyeIdM\nprLYgq7ZtZ4rdYylSvcjzJLcqNSuNub79D4cTqWR5hnhSAD0bGdzNj5YDp2A5ijB\nXRR69UvuvgkiwJ/Y2GMFAeoBya/u2dJ/pPkCV3gLSMdj6Z2JtC7ft2ineDF5hb4C\n6ST0p168YRNE3eErfLgWfLHH0/TPdEVvjUKF4hGFtCh+XbSEsZlkr+oa0ZWqpRxr\nqLGl91C0QKkTyWihLs3sj43GMUIL9MsGrD3RwaoN9ZUglvVXQS3aruaj5VCJJ3VA\nAGMSPSkiOUD7GBg5PjCMcM7YlBwb5helosa/EGfcUQKBgQD6D1KPqqJiIwcwVrba\n33v/2L6UofqZoxzTDHarIcFYU56EEMmP8h4X0eHLK2M5oIFLhkUEP3S3RYZLuiDl\nugVAZGhlP8Yz1KA7F5nIuVP7a3ZqbomYw7hx49+NkX26TzD2sl/x8+vwu6w5pwia\nRDADdxGn3kDyWsu/cThBvh+ITQKBgQD1c7ZrJfTpwXQfP85h8hX3rF3Vk133W9Iw\nk2oHF3ag5lVjTQsEgv5iMVjTZP35zL3PUtiB689lZsmnNsXXDqqKsUU8C73ABmBU\nMY/3q78LyGVEE/lN0RHy/Cq+O0c3pREHuLq5YYo9wl8Z+GRXH84VThR4BSi+yC1u\nHKCgiJylIwKBgQDk2Gr9cfKkD1x/34v+qLJphal8ivS18DHr76cWnJC+TeBvCpH8\ne18Q+5JBhlaLoZlSTfIRniUpqKXr3c5Hj0NJF9r2djPksT1mdwXVTc5O9JztcHXa\naZv+FsY7YCAJBnpP+xSVcF7H9Gj8ZiIYVDkAotJ0p5EWewOmE26hs+ZVrQKBgGTy\nDt7oQF52olRLwIxFrMUsjXbN4cJecAZsShnai35G3G03fUWAvjASDW77RPycOJ/w\neXyNR8FzUZHEk/8LWBYsK8YzKfm0ZZ+atpPsfWjSJNunv0tCpbgh/043QOXgrC1Z\nyul89QbLTqN2pYWzXeUjNIXb0VMNLqnvehwrswizAoGAV/JzV6CW/0Y6HDweVdMg\nJ5h2I9rmI5o5oMuR3xG8F5tgIbrjToZLdhB51C+4eKaGkSLT962bhcYHWK0Zf83/\nrCbXu2EIfy8qJW9LQqXtrPv4PAy9kXCvM8wo9+TVSSAVwR0RmEVYNDKGSWWRVm0k\n5uQmoJlLyDz/m8ezcGpQ/1s=\n-----END PRIVATE KEY-----\n"
```

**Important:** Replace `your_drive_folder_id_here` with the actual Google Drive folder ID where your project folders are stored.

## 2. Google Drive Folder Structure

Your Google Drive folder should be organized like this:

```
Your Main Folder/
├── Project 1/
│   └── main.png
├── Project 2/
│   └── main.png
├── Project 3/
│   └── main.png
└── ...
```

Each subfolder represents a project, and each subfolder must contain a `main.png` file that will be used as the project card image.

## 3. How It Works

1. **ProjectProvider Context**: Manages the state of projects, loading, and error states
2. **API Route**: `/api/projects` fetches data from Google Drive using the service account
3. **Dynamic Rendering**: The main page now dynamically renders project cards based on the folders found in Google Drive

## 4. Features

- **Loading State**: Shows a spinner while fetching projects
- **Error Handling**: Displays error messages and retry functionality
- **Empty State**: Shows a message when no projects are found
- **Responsive Design**: Projects are displayed in a responsive grid layout

## 5. Getting the Google Drive Folder ID

1. Open your Google Drive folder in a web browser
2. The folder ID is in the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Copy the folder ID and paste it in your `.env.local` file

## 6. Service Account Permissions

Make sure your service account has access to the Google Drive folder:
1. Right-click on the folder in Google Drive
2. Select "Share"
3. Add the service account email (`website-images@designiga.iam.gserviceaccount.com`)
4. Give it "Viewer" permissions

## 7. Testing

After setting up the environment variables:
1. Run `pnpm dev`
2. Visit `http://localhost:3000`
3. You should see your projects loaded from Google Drive

The system will automatically fetch all folders from your specified Google Drive folder and create project cards for each folder that contains a `main.png` file.
