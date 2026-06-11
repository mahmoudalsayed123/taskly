import { BreadcrumbProject } from '../../_components/BreadCrumb';
import MainHeadingSection from '../../_components/MainHeadingSection';
import MemberBox from '../../_components/MemberBox';

import MemberTable from '../../_components/MemberTable';
import InviteDialogLg from '../../_components/InviteDialogLg';
import InviteDrawerSm from '../../_components/InviteDrawerSm';
import { prisma } from '@/prisma';

const Members = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const projectName = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
    },
  });

  const members = await prisma.user.findMany({
    where: {
      projectMembers: { some: { projectId: projectId } },
    },
  });

  const memberRole = await prisma.project_Member.findMany({
    where: {
      projectId: projectId,
      userId: {
        in: members.map((member) => member.id),
      },
    },
    select: {
      userId: true,
      role: true,
    },
  });

  return (
    <>
      {/* Mobile View */}
      <section className="section md:hidden! h-[calc(100vh - 88px)]">
        {/* Heading Section + Invite Members */}
        <div className="flex items-center justify-center md:justify-between w-full mb-8">
          <MainHeadingSection heading="Project Members" desc={''} />
        </div>
        {/* Members List */}
        <section className="relative pb-[100px]! flex flex-col items-center gap-3 w-full">
          {/* Header of member box */}
          {/* <div className="hidden md:flex items-center justify-between w-full h-[24px]  px-3 py-5 rounded-[2px] bg-red-500">
            <h4 className="text-body font-semibold text-slate-dark">member</h4>
            <h4 className="text-body font-semibold text-slate-dark">Role </h4>
            <h4 className="text-body font-semibold text-slate-dark">Actions</h4>
          </div> */}

          {/* member box */}
          {members.map((member) => (
            <MemberBox
              key={member.id}
              member={member}
              memberRole={memberRole}
            />
          ))}

          <InviteDrawerSm />
        </section>
      </section>

      {/* Table Member List in Larg Screens */}
      <section className="section hidden! md:flex!">
        <div className=" w-full flex items-center">
          {/* BreadCrumb */}
          {/* <BreadcrumbProject /> */}
        </div>
        {/* Heading Section + Invite Members */}
        <div className="flex items-center justify-center md:justify-between w-full mb-8">
          <MainHeadingSection heading="Project Members" desc={''} />
          <InviteDialogLg projectId={projectId} />
        </div>
        {/* Member table */}
        <MemberTable members={members} memberRole={memberRole} />
      </section>
    </>
  );
};

export default Members;
