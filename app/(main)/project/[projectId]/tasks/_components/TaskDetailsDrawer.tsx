import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Task } from '@/app/generated/prisma/client';
import Image from 'next/image';
import TaskCard from './TaskCard';
import { prisma } from '@/prisma';
import { statusBackgroundColors } from '@/app/_constant';
import { formatDate } from '@/lib/help';

const TaskDetailsDrawer = async ({ task }: { task: Task }) => {
  const epic = task.epicId
    ? await prisma.epic.findUnique({
        where: { id: task.epicId },
        select: { id: true },
      })
    : null;

  const assignee = task.assigneeId
    ? await prisma.user.findUnique({
        where: { id: task.assigneeId },
        select: { name: true, jobTitle: true },
      })
    : null;

  const createdBy = task.rePorterId
    ? await prisma.user.findUnique({
        where: { id: task.rePorterId },
        select: { name: true },
      })
    : null;

  return (
    <div className="flex flex-wrap gap-2 max-w-[448px]  shadow-[0px_-4px_24px_0px_rgba(4,27,60,0.06)]">
      <Drawer direction="bottom">
        <DrawerTrigger className="w-full ">
          <TaskCard task={task} />
        </DrawerTrigger>
        <DrawerContent className="px-5 pb-10 md:hidden block!">
          <DrawerHeader>
            <DrawerTitle className=" flex flex-col gap-1 pt-5">
              <div className="flex flex-col items-start gap-1">
                <p className="text-label font-bold text-slate-medium">
                  {`Task-${task.id.slice(0, 3).toUpperCase()}`}
                </p>
                <div className="flex flex-col items-start gap-4">
                  <p className="text-[24px] font-bold text-slate-dark text-start">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-4">
                    <p
                      className={` ${statusBackgroundColors[task.status as keyof typeof statusBackgroundColors]} rounded-xl py-1 px-3 flex items-center justify-center gap-2 w-[100px] h-full text-slate-dark text-label font-bold`}
                    >
                      {task.status}
                    </p>
                    {epic && (
                      <p className="flex items-center gap-2 bg-surface-highest rounded-xl py-1 px-3">
                        <Image
                          src="/assets/icons/epic-in-task.svg"
                          alt="epic-id"
                          width={12}
                          height={12.7}
                        />
                        <span className="text-label font-bold text-muted-body">{`Epic-${epic.id.slice(0, 3).toUpperCase()}`}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          {/* Assignee + createdby + dueDate + created At */}
          <div className="mt-8 grid grid-cols-2 gap-2 w-full">
            {/* Assignee + createdby + dueDate + created At */}
            {/* assignee */}
            <div className="flex flex-col gap-3 p-3 bg-resend-container rounded-lg">
              <p className="text-label font-bold text-muted-body">Assignee</p>
              <div className="flex items-center gap-3 rounded-xl p-2 ps-0 shadow-[0px_1px_2px_0px_#0000000D]">
                <p className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-highest text-label font-bold">
                  {assignee?.name
                    .split(' ')
                    .map((word) => word[0][0].toUpperCase())}
                </p>
                <p className="text-label font-bold text-slate-dark  wrap-break-word line-clamp-1">
                  {assignee?.name}
                </p>
              </div>
            </div>
            {/* dueDate */}
            <div className="flex flex-col gap-3 p-3 bg-resend-container rounded-lg ">
              <p className="text-label font-normal text-muted-body">Due Date</p>
              <div className="flex items-center gap-2">
                <Image
                  src={'/assets/icons/date.svg'}
                  alt="due-date"
                  width={10.5}
                  height={12}
                  className=""
                />
                <p className="text-label font-bold text-slate-dark">
                  {formatDate(task.dueDate)}
                </p>
              </div>
            </div>
            {/* createdby */}
            <div className="flex flex-col gap-3 p-3 bg-resend-container rounded-lg">
              <p className="text-label font-bold text-muted-body">Reporter</p>
              <div className="flex justify-start items-center gap-3 p-2 ps-0">
                <p className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-highest text-label font-bold">
                  {createdBy?.name
                    .split(' ')
                    .map((word: string) => word[0][0].toUpperCase())}
                </p>
                <p className="text-label font-bold text-slate-dark">
                  {createdBy?.name}
                </p>
              </div>
            </div>
            {/* created At */}
            <div className="flex flex-col gap-3 p-3 bg-resend-container rounded-lg">
              <p className="text-label font-normal text-muted-body">
                Created At
              </p>
              <div className="flex items-center gap-2">
                <Image
                  src={'/assets/icons/clock.svg'}
                  alt="created-at"
                  width={10.5}
                  height={12}
                  className=""
                />
                <p className="text-label font-bold text-slate-dark">
                  {formatDate(task.createdAt)}
                </p>
              </div>
            </div>
          </div>
          {/* description  */}
          <div className="mt-8 flex flex-col gap-3">
            <p className="text-body font-bold text-muted-body">Description</p>
            <p className="p-5 rounded-lg border border-head-table shadow-[0px_1px_2px_0px_#0000000D] text-body font-normal text-muted-body bg-white">
              {task.description}
            </p>
          </div>
          <DrawerClose asChild>
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={14}
              height={14}
              className="absolute top-[30px] right-[30px]"
            />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TaskDetailsDrawer;
