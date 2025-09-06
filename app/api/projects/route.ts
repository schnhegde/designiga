import { NextRequest, NextResponse } from 'next/server';
import { loadProjectsFromCache, getCacheInfo } from '../../lib/daily-fetch';

export async function GET(request: NextRequest) {
  try {
    // Load projects from daily cache
    const projects = await loadProjectsFromCache();
    const cacheInfo = getCacheInfo();
    
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60', // 5 minutes cache
        'X-Cache': 'HIT',
        'X-Last-Updated': cacheInfo?.lastUpdated || 'unknown',
        'X-Next-Update': cacheInfo?.nextUpdate || 'unknown',
      },
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json(
      { error: 'Failed to load projects' },
      { status: 500 }
    );
  }
}
