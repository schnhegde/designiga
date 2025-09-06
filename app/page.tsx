'use client';

import { useRouter } from 'next/navigation';
import ProjectCard from './components/ProjectCard';
import SkeletonProjectCard from './components/SkeletonProjectCard';
import { useProjects } from './contexts/ProjectContext';
import { Project } from './types/project';

export default function Home() {
  const { projects, loading, error } = useProjects();
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="px-12 sm:px-16 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 text-left">
            Crafting modern, impactful logos
            <br />
            and brand identities, with a special focus
            <br/>
            on Kannada based design.
            
          </h1>
        </div>
      </div>

      {/* Projects Section */}
      <div className="flex-1 px-12 sm:px-16 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SkeletonProjectCard className="animate-pulse" textWidth="long" />
              <SkeletonProjectCard className="animate-pulse [animation-delay:0.5s]" textWidth="short" />
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Error loading projects: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
          
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No projects found. Make sure your Google Drive folder contains folders with main.png files.</p>
            </div>
          )}
          
          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleProjectClick}
                  style={{ 
                    animationDelay: `${index * 0.15}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
