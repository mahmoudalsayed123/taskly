import Image from 'next/image';
import MainHeadingSection from './_components/MainHeadingSection';
import ProjectCard from './_components/ProjectCard';
import CreateProject from './_components/CreateProject';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma';
import NotHaveProject from './_components/NotHaveProject';
import Link from 'next/link';
import Pagination from './_components/Pagination';
import { pagination } from '@/lib/pagination';

const Project = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/signup');
  }

  const { page } = await searchParams;

  const { currentPage, limit, skip } = await pagination(page);

  const projects = await prisma.project.findMany({
    where: { projectMembers: { some: { userId: user.id } } },
    take: limit,
    skip,
    orderBy: { createdAt: 'asc' },
  });

  const totalProjects = await prisma.project.count();

  const totalPages = Math.ceil(totalProjects / limit);

  return projects.length === 0 ? (
    <section className="section justify-center! gap-4!">
      <NotHaveProject />
    </section>
  ) : (
    <section className="section">
      {/* Heading + Create New Project */}
      <div className="flex items-center justify-between w-full">
        <MainHeadingSection
          heading="Projcts"
          desc={'Manage And Curate Your Projects'}
        />
        <CreateProject hidden={true} />
      </div>
      {/* Projects */}
      <section className="section_card relative pb-[100px]">
        {/* Project Card */}
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Link href={'/project/new'}>
          <button className="md:hidden w-fit p-4 flex items-center justify-center absolute bottom-[20px] right-0 text-white bg-primary-container rounded-[12px] cursor-pointer">
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={14}
              height={14}
            />
          </button>
        </Link>
      </section>
      {/* Pagination */}
      <Pagination
        pageName="projects"
        path="/project"
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={totalProjects}
        limit={limit}
      />
    </section>
  );

  // <section className="section justify-center! gap-4!">
  //   <NotHaveProject />
  // </section>
  // <section className="section justify-center! gap-4!">
  //   <ProjectError />
  // </section>
  // <section className="section_skeleton flex! flex-wrap! items-center! justify-center! md:grid!">
  //   <SkeletonCard />
  //   <SkeletonCard />
  //   <SkeletonCard />
  //   <SkeletonCard />
  //   <SkeletonCard />
  //   <SkeletonCard />
  //   <SkeletonCard />
  // </section>
};
export default Project;
