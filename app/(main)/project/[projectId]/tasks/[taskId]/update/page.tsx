import MainHeadingSection from '@/app/(main)/project/_components/MainHeadingSection';
import FormUpdateTask from '../../_components/FormUpdateTask';
import { prisma } from '@/prisma';
import { Task } from '@/app/generated/prisma/client';

const UpdateTask = async ({
  params,
}: {
  params: Promise<{ taskId: string; projectId: string }>;
}) => {
  const { taskId } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  const members = await prisma.user.findMany({
    where: {
      projectMembers: {
        some: { projectId: task?.projectId },
      },
    },
  });
  const epics = await prisma.epic.findMany({
    where: {
      projectId: task?.projectId,
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
          heading="Update Task"
          desc={`Refine your task details, adjust the timeline, or reassign ownership to keep your project on track.`}
        />
      </div>
      <FormUpdateTask task={task as Task} members={members} epics={epics} />
    </section>
  );
};

export default UpdateTask;
