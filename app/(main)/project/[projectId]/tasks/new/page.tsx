import MainHeadingSection from '../../../_components/MainHeadingSection';
import FormNewTask from '../_components/FormNewTask';
import { prisma } from '@/prisma';

const NewTask = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ epicId?: string }>;
}) => {
  const { projectId } = await params;
  const { epicId } = await searchParams;
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

  // Get all epics in current project
  const epics = await prisma.epic.findMany({
    where: {
      projectId: projectId,
    },
  });

  //Get epic from epicId ( epicId => epic details popup )
  const specificEpic = epicId
    ? await prisma.epic.findUnique({
        where: {
          id: epicId,
        },
      })
    : undefined;

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
      <FormNewTask
        members={members}
        projectId={projectId}
        epics={epics}
        currentEpic={specificEpic || undefined}
      />
    </section>
  );
};

export default NewTask;
