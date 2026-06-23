// import Image from 'next/image';
// import { BreadcrumbProject } from '../../_components/BreadCrumb';
import CreateEpic from '../../_components/CreateEpic';
import MainHeadingSection from '../../_components/MainHeadingSection';
import BtnNewEpicSm from './_components/BtnNewEpicSm';
import { prisma } from '@/prisma';
import ModalEpicDetails from './_components/ModalEpicDetails';
import { Role } from '@/app/generated/prisma/enums';
import Pagination from '../../_components/Pagination';
import { pagination } from '@/lib/pagination';
import { Suspense } from 'react';
import Search from '../../_components/Search';

const Epics = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const { projectId } = await params;

  const { page, search } = await searchParams;

  let { currentPage, limit, skip } = await pagination(page);

  const epics = await prisma.epic.findMany({
    where: {
      projectId: projectId,
      title: { contains: search || '', mode: 'insensitive' },
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

  const totalEpics = await prisma.epic.count({
    where: {
      projectId,
      title: {
        contains: search || '',
        mode: 'insensitive',
      },
    },
  });

  const totalPages = Math.ceil(totalEpics / limit);

  if (epics.length === 0) {
    return (
      <section className="section h-screen flex flex-col justify-center items-center ">
        <div className="flex flex-col items-center gap-10">
          <p className="text-heading text-slate-dark font-bold">
            No Epic Found ❌
          </p>
          {/* hidden true => hidden in mobile screen */}
          <CreateEpic hidden={true} size="w-full" />
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            <Search projectId={projectId} pageName="epics" />
            {/* hidden true => hidden in mobile screen */}
            <CreateEpic hidden={true} />
          </div>
        </div>

        {/* Epics Card */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-[100px]">
          {/* epics card */}
          {epics?.map((epic) => (
            <ModalEpicDetails key={epic.id} epic={epic} />
          ))}
        </section>
        {/* Pagination */}
        <Pagination
          pageName="epics"
          path={`/project/${projectId}/epics`}
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalEpics}
          limit={limit}
          search={search || ''}
        />
        <BtnNewEpicSm />
      </section>
    </Suspense>
  );
};

export default Epics;
