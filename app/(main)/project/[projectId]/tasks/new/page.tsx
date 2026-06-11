import MainHeadingSection from '../../../_components/MainHeadingSection';
import FormNewTask from '../_components/FormNewTask';
import { prisma } from '@/prisma';

const NewTask = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  // All members in projects { admin and members }
  const members = await prisma.user.findMany({
    where: {
      projectMembers: {
        some: {
          projectId: projectId,
        },
      },
    },
  });

  console.log(members);
  // Get all epics in current project
  const epics = await prisma.epic.findMany({
    where: {
      projectId: projectId,
    },
  });
  return (
    <section className="section">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      <div className=" w-full">
        <MainHeadingSection
          heading="Create New Task"
          desc={`Initialize a new work item within the Architectural Workspace ecosystem.`}
        />
      </div>
      {/* Form Add new task */}
      <FormNewTask members={members} projectId={projectId} epics={epics} />
    </section>
  );
};

export default NewTask;
