import React from 'react';

interface SkeletonProjectCardProps {
  className?: string;
  style?: React.CSSProperties;
  textWidth?: 'short' | 'medium' | 'long';
}

export default function SkeletonProjectCard({ className = "", style, textWidth = 'medium' }: SkeletonProjectCardProps) {
  return (
    <div className={`group cursor-pointer ${className}`} style={style}>
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg mb-6">
        <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse animate-breathe">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      {/* Label Section */}
      <div className="text-left">
        <div className={`relative h-6 bg-gray-200 rounded animate-pulse overflow-hidden ${
          textWidth === 'short' ? 'w-1/2' : 
          textWidth === 'long' ? 'w-5/6' : 
          'w-3/4'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
