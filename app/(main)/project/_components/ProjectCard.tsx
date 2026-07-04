import Image from 'next/image';

import { formatDate } from '@/lib/help';
import { Project } from '@/app/generated/prisma/browser';
import Link from 'next/link';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/project/${project?.id}/epics`}
      className="flex flex-col items-start gap-2 w-full rounded-lg p-6 bg-white"
    >
      <div className="flex items-center justify-between mb-3 ">
        <h2 className="text-title font-semibold ">{project.name}</h2>
        <Image
          src="/assets/icons/dots.svg"
          alt="dots"
          width={3}
          height={12}
          className="md:hidden"
        />
      </div>
      <p className="text-body font-normal text-muted-body mb-3 line-clamp-2">
        {project.description}
      </p>
      <div className="hidden pt-4 w-full md:flex items-center justify-between">
        <span className="text-label font-bold text-muted-body">CreatedAt</span>
        <span className="text-body font-medium text-muted-body">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className=" md:hidden flex items-center gap-1 text-label font-medium text-muted-body">
        <Image src="/assets/icons/date.svg" alt="date" width={11} height={12} />
        <span className="text-label font-bold text-muted-body">
          {formatDate(project.createdAt)}
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
