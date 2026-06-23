import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import EpicCard from './EpicCard';
import { Epic } from '@/app/generated/prisma/client';
import { prisma } from '@/prisma';
import Image from 'next/image';
import { formatDate } from '@/lib/help';
import Link from 'next/link';
import TaskCardInEpic from './TaskCardInEpic';

const ModalEpicDetails = async ({ epic }: { epic: Epic }) => {
  const userCreatedEpic = await prisma.user.findUnique({
    where: {
      id: epic.createdById,
    },
  });

  const assigneeEpic = epic.assigneeId
    ? await prisma.user.findUnique({
        where: {
          id: epic.assigneeId,
        },
      })
    : null;

  const tasks = await prisma.task.findMany({
    where: {
      epicId: epic.id,
    },
    orderBy: { createdAt: 'asc' },
  });

  const tasksCount = await prisma.task.count({
    where: {
      epicId: epic.id,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EpicCard epic={epic} />
      </DialogTrigger>
      <DialogContent className="md:min-w-[670px]! md:h-fit! overflow-y-auto rounded-lg">
        <div className="px-4 pt-6 md:h-fit!">
          <p className="text-[10px] font-bold text-primary-container">
            {`epic-${epic.id.slice(0, 3).toUpperCase()}`}
          </p>
          <h3 className="text-[20px] font-bold text-slate-dark">
            {epic.title}
          </h3>
        </div>

        {/* Details */}
        <div className="py-2 px-4 flex flex-col gap-5 md:h-fit! md:pb-5">
          {/* Description */}
          <div className="flex flex-col gap-1.5 mb-3">
            <p className="text-label font-bold text-slate-medium">
              Description
            </p>
            <p>{epic.description}</p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-0 md:items-center md:justify-between mb-3">
            {/* Created By + assignee  */}
            {/* Created By */}
            <div className="flex flex-col gap-2">
              <p className="text-label font-bold text-slate-medium ">
                Created By
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-primary-container rounded-[12px] p-2 text-white text-label font-bold">
                  {userCreatedEpic?.name?.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="text-body font-bold text-slate-medium line-clamp-1">
                  {userCreatedEpic?.name}
                </h3>
              </div>
            </div>
            {/* assignee */}
            <div className="flex flex-col gap-2">
              <p className="text-label font-bold text-slate-medium">Assignee</p>
              <div className="flex items-center gap-2">
                {assigneeEpic?.name ? (
                  <>
                    <div className="flex items-center justify-center bg-primary-container rounded-[12px] p-2 text-white text-label font-bold">
                      {assigneeEpic?.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <h3 className="text-body font-bold text-slate-medium line-clamp-1">
                      {assigneeEpic?.name}
                    </h3>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center bg-primary-container rounded-[12px] p-2 text-white text-label font-bold">
                      <Image
                        src="/assets/icons/noUser.svg"
                        alt="user"
                        width={12}
                        height={12}
                      />
                    </div>
                    <h3 className="text-label font-bold text-slate-medium">
                      No Assignee
                    </h3>
                  </>
                )}
              </div>
            </div>

            {/* deadline + Created At */}
            {/* deadline */}
            <div className="flex flex-col gap-1">
              <p className="text-label font-bold text-slate-medium">Deadline</p>
              <div className="flex items-center">
                <div className="rounded-[12px] p-2 ps-0 text-white text-label font-bold">
                  <Image
                    src="/assets/icons/date_epic_popup.svg"
                    alt="calendar"
                    width={12}
                    height={12}
                  />
                </div>
                <h3 className="text-body font-medium text-slate-medium">
                  {formatDate(epic.deadline)}
                </h3>
              </div>
            </div>
            {/* Created at */}
            <div className="flex flex-col gap-1">
              <p className="text-label font-bold text-slate-dark">Created At</p>
              <div className="flex items-center">
                <div className=" rounded-[12px] p-2 ps-0 text-white text-label font-bold">
                  <Image
                    src="/assets/icons/date_epic_popup.svg"
                    alt="calendar"
                    width={12}
                    height={12}
                  />
                </div>
                <h3 className="text-body font-medium text-slate-dark">
                  {formatDate(epic.createdAt)}
                </h3>
              </div>
            </div>
          </div>

          {/* Update */}
          <Link href={`/project/${epic.projectId}/epics/${epic.id}/update`}>
            <button className="text-white bg-primary-container px-5 py-2 rounded-md font-bold w-full cursor-pointer ">
              Update Epic
            </button>
          </Link>

          {/* No Tasks */}
          <div className="flex flex-col gap-4">
            {/* Number Of Tasks */}
            <div className="flex items-center justify-between">
              <h4
                className={`font-bold  ${tasksCount === 0 ? 'text-label text-slate-medium' : 'text-body text-slate-dark'}`}
              >
                Tasks
              </h4>
              <div className="flex items-center gap-4">
                {tasksCount !== 0 && (
                  <>
                    <Link
                      href={`/project/${epic.projectId}/tasks/new?epicId=${epic.id}`}
                      className="flex items-center gap-2 h-[25px] px-2  rounded-xl cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/add-task-primary.svg"
                        alt="plus"
                        width={10.5}
                        height={10.5}
                      />
                      <p className="flex items-center justify-center h-full text-label font-bold text-primary-container mt-1 ">
                        Add Task
                      </p>
                    </Link>
                    <p className="text-[10px] font-bold text-muted-body mt-1 px-2 py-1 bg-head-table rounded-xl">
                      {tasksCount} tasks
                    </p>
                  </>
                )}
              </div>
            </div>
            {/* Add Task */}
            {tasksCount === 0 && (
              <Link
                href={`/project/${epic.projectId}/tasks/new?epicId=${epic.id}`}
                className="flex flex-col items-center p-8 rounded-lg border-2 border-dash border-[#C3C6D64D] bg-resend-container text-center"
              >
                <div className="rounded-[12px] w-[40px] h-[40px] flex items-center justify-center bg-head-table mb-3">
                  <Image
                    src="/assets/icons/add-task.svg"
                    alt="add task"
                    width={18}
                    height={16}
                  />
                </div>
                <p className="text-body font-normal text-muted-body mb-4">
                  No tasks have been added to this epic yet
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-white  shadow-[0px_1px_2px_0px_#0000000D] rounded-sm">
                  <Image
                    src="/assets/icons/plus.svg"
                    alt="add task"
                    width={10.5}
                    height={10.5}
                  />
                  <span className="text-label font-bold">Add Task</span>
                </button>
              </Link>
            )}

            {tasksCount !== 0 && (
              <div className="rounded-lg flex flex-col items-center w-full">
                {tasks.map((task) => (
                  <TaskCardInEpic task={task} key={task.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEpicDetails;
