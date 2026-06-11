import Image from 'next/image';
// import { BreadcrumbProject } from '../../_components/BreadCrumb';
import CreateEpic from '../../_components/CreateEpic';
import MainHeadingSection from '../../_components/MainHeadingSection';
import BtnNewEpicSm from './_components/BtnNewEpicSm';
import { prisma } from '@/prisma';
import ModalEpicDetails from './_components/ModalEpicDetails';
import { Role } from '@/app/generated/prisma/enums';
import Pagination from '../../_components/Pagination';
import { pagination } from '@/lib/pagination';

const Epics = async ({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: Promise<{ page?: string }>;
}) => {
  const { projectId } = await params;

  const { page } = await searchParams;

  const { currentPage, limit, skip } = await pagination(page);

  const epics = await prisma.epic.findMany({
    where: {
      projectId: projectId,
    },
    take: limit,
    skip,
    orderBy: { createdAt: 'asc' },
  });

  const memebers = await prisma.user.findMany({
    where: {
      projectMembers: { some: { projectId: projectId, role: Role.MEMBER } },
    },
  });

  const totalProjects = await prisma.project.count();

  const totalPages = Math.ceil(totalProjects / limit);

  return (
    <section className="section relative">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      {/* Heading Section + Search input + Create epic button */}
      <div className="flex items-center justify-center md:justify-between w-full mb-8">
        <div className="hidden md:block">
          <MainHeadingSection heading="Epics" desc={''} />
        </div>
        <div className=" md:flex md:items-center md:gap-8">
          {/* search */}
          <div className="relative">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={10.5}
              height={10.5}
              className="absolute top-1/2 left-2 -translate-y-1/2 "
            />
            <input
              type="text"
              placeholder="Search Epic"
              className="input-mobile px-7! py-2.5! w-full md:min-w-[300px]! h-[48px]!"
            />
          </div>
          {/* hidden true => hidden in mobile screen */}
          <CreateEpic hidden={true} />
        </div>
      </div>

      {/* Epics Card */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-[100px]">
        {/* epics card */}
        {epics?.map((epic) => (
          <ModalEpicDetails key={epic.id} epic={epic} members={memebers} />
        ))}
      </section>
      {/* Pagination */}
      <Pagination
        pageName="epics"
        path={`/project/${projectId}/epics`}
        totalPages={totalPages}
        currentPage={currentPage}
        totalProjects={totalProjects}
        limit={limit}
      />
      <BtnNewEpicSm />
    </section>
  );
};

export default Epics;
