import { NextRequest, NextResponse } from 'next/server';
import { projectsCache, CACHE_KEY } from '../../../lib/cache';

export async function POST(request: NextRequest) {
  try {
    // Clear the cache
    projectsCache.clear(CACHE_KEY);
    
    console.log('Projects cache cleared manually');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache cleared successfully' 
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
