import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import EpicCard from './EpicCard';
import { Epic } from '@/app/generated/prisma/client';
import { prisma } from '@/prisma';
import Image from 'next/image';
import { formatDate } from '@/lib/help';
import Link from 'next/link';
import TaskCardInEpic from './TaskCardInEpic';
import TasksList from './TasksList';

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

          {/* Tasks List */}
          <TasksList tasks={tasks} tasksCount={tasksCount} epic={epic} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEpicDetails;
