import { Project } from '../types/project';

interface CacheEntry {
  data: Project[];
  timestamp: number;
  lastModified?: string;
}

class ProjectsCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly BACKGROUND_REFRESH_THRESHOLD = 2 * 60 * 1000; // 2 minutes

  set(key: string, data: Project[], lastModified?: string): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      lastModified,
    });
  }

  get(key: string): Project[] | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    // If cache is too old, return null to force refresh
    if (age > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  shouldRefreshInBackground(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    const age = now - entry.timestamp;

    // Refresh in background if cache is older than threshold but still valid
    return age > this.BACKGROUND_REFRESH_THRESHOLD && age < this.CACHE_DURATION;
  }

  getLastModified(key: string): string | undefined {
    return this.cache.get(key)?.lastModified;
  }

  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;

    const now = Date.now();
    const age = now - entry.timestamp;

    return age > this.CACHE_DURATION;
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  getCacheInfo(key: string): { age: number; isStale: boolean; shouldRefresh: boolean } | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const age = now - entry.timestamp;

    return {
      age,
      isStale: age > this.CACHE_DURATION,
      shouldRefresh: this.shouldRefreshInBackground(key),
    };
  }
}

export const projectsCache = new ProjectsCache();
export const CACHE_KEY = 'projects';
