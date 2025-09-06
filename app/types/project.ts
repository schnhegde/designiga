export interface ProjectImage {
  id: string;
  name: string;
  url: string;
  isMain: boolean;
}

export interface Project {
  id: string;
  name: string;
  imageUrl: string; // Main image for card display
  folderId: string;
  images?: ProjectImage[]; // All images in the project (optional for backward compatibility)
  description?: string; // Story text from story.txt file
}

export interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
