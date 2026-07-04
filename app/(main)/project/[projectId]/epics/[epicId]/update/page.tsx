import { Role } from '@/app/generated/prisma/enums';
import MainHeadingSection from '../../../../_components/MainHeadingSection';
import FormUpdateEpic from '../../_components/FormUpdateEpic';
import { prisma } from '@/prisma';

const UpdateEpic = async ({
  params,
}: {
  params: Promise<{ epicId: string; projectId: string }>;
}) => {
  const { epicId } = await params;
  const epic = await prisma.epic.findUnique({
    where: {
      id: epicId,
    },
  });

  const assignedUser = epic?.assigneeId
    ? await prisma.user.findUnique({
        where: {
          id: epic?.assigneeId,
        },
      })
    : null;

  const members = await prisma.user.findMany({
    where: {
      projectMembers: {
        some: { projectId: epic?.projectId, role: Role.MEMBER },
      },
    },
  });

  if (!epic) {
    return <div>Epic not found</div>;
  }
  return (
    <section className="section">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      <div className=" w-full mb-10">
        <MainHeadingSection
          heading="Update Epic"
          desc={`Refine your epic details, adjust the timeline, or reassign ownership to keep your project on track.`}
        />
      </div>
      <FormUpdateEpic epic={epic} members={members} />
    </section>
  );
};

export default UpdateEpic;
