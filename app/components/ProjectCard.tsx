import React from 'react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProjectCard({ 
  project,
  onClick,
  className = "",
  style
}: ProjectCardProps) {
  const handleClick = () => {
    onClick(project);
  };

  return (
    <div 
      className={`group cursor-pointer animate-fade-in ${className}`} 
      style={style}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg mb-6">
        <img
          src={project.imageUrl}
          alt={`${project.name} Project`}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      {/* Label Section - Aligned to the left */}
      <div className="text-left">
        <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
          {project.name}
        </h3>
      </div>
    </div>
  );
}
