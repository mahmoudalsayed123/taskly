import { BreadcrumbProject } from '../../../_components/BreadCrumb';
import MainHeadingSection from '../../../_components/MainHeadingSection';
import FromNewEpicDesktop from '../_components/FromNewEpicDesktop';
import FormNewEpicMobile from '../_components/FormNewEpicMobile';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { prisma } from '@/prisma';
import { Role } from '@/app/generated/prisma/enums';

const NewEpicPage = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = await params;
  const user = await getCurrentUser();

  const members = await prisma.user.findMany({
    where: {
      projectMembers: { some: { projectId: projectId, role: Role.MEMBER } },
    },
  });

  return (
    <section className="section">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      <div className=" w-full mb-10">
        <MainHeadingSection
          heading="Create New Epic"
          desc={`Define a major project phase or high-level milestone to group
          related tasks and track architectural progress.`}
        />
      </div>
      {/* Form in Mobile */}
      <FormNewEpicMobile />
      {/* Form in Desktop */}
      <FromNewEpicDesktop user={user} members={members} />
    </section>
  );
};

export default NewEpicPage;
