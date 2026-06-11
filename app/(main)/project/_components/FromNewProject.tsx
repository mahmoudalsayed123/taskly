'use client';

import { useRouter } from 'next/navigation';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const FromNewProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();

    if (!projectName || !projectDescription) {
      toast.error('Project name and description are required', {
        className: 'bg-red-500',
        position: 'top-center',
      });
      return;
    }
    if (projectName.length < 3 || projectDescription.length < 10) {
      toast.error('Project name and description are too short', {
        className: 'bg-red-500',
        description:
          'Project name must be at least 5 characters long and project description must be at least 10 characters long',
        position: 'top-center',
      });
      return;
    }

    const res = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        description: projectDescription,
      }),
    });
    if (!res.ok) {
      toast.error('Failed to create project', {
        description: 'Please try again',
        className: 'bg-red-500',
      });
      return;
    }
    const project = await res.json();

    if (project) {
      toast.success('Project created successfully', {
        description: 'Project has been created successfully',
        className: 'bg-success-container',
      });

      // router.push(`/project`);
    }

    setProjectName('');
    setProjectDescription('');
  };

  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <div className="relative w-full">
          {/* Project Name */}
          <label className="label" htmlFor="project-name">
            Project Name
          </label>
          <input
            className="input-mobile h-[45px]!"
            type="text"
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        {/* Project Description */}
        <div className="relative w-full">
          <label className="label" htmlFor="project-name">
            Description
          </label>
          <textarea
            className="input-mobile h-[170px]! resize-none placeholder:text-body font-normal"
            id="project-name"
            placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <span className="text-label text-slate-medium font-normal absolute bottom-[-25px] right-0">
            {projectDescription.length}/500
          </span>
        </div>
      </div>
      {/* Create Project Button */}
      <div className="w-full flex flex-col md:flex-row-reverse justify-center md:justify-between md:mt-[60px] items-center gap-4">
        <button
          className="w-full! md:w-[170px]! md:h-[50px]! rounded-[4px] btn-primary text-body font-bold cursor-pointer shadow-[0px_4px_6px_-4px_#0000001A]"
          type="submit"
          onClick={handleCreateProject}
        >
          Create Project
        </button>
        <p className="text-[16px] font-bold text-primary-container cursor-pointer md:ps-10">
          Cancel
        </p>
      </div>
    </>
  );
};

export default FromNewProject;
