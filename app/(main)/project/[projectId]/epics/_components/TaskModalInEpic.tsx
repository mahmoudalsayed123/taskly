import { Task } from '@/app/generated/prisma/client';
import TaskCardInEpic from './TaskCardInEpic';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Epic } from '@/app/generated/prisma/client';
import Image from 'next/image';
import { prisma } from '@/prisma';
import { formatDate } from '@/lib/help';
import { statusBackgroundColors } from '@/app/_constant';
import Link from 'next/link';
const TaskModalInEpic = async ({
  task,
  epic,
}: {
  task: Task;
  epic: Epic | null;
}) => {
  const assignee = task.assigneeId
    ? await prisma.user.findUnique({
        where: { id: task.assigneeId },
        select: { name: true, jobTitle: true },
      })
    : null;

  const rePorter = task.rePorterId
    ? await prisma.user.findUnique({
        where: { id: task.rePorterId },
        select: { name: true },
      })
    : null;

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <TaskCardInEpic task={task} />
      </DialogTrigger>
      <DialogContent className="flex items-start gap-0 min-w-[896px] rounded-lg shadow-[0px_25px_50px_-12px_#00000040]">
        {/* taskId, epicId, title, description, copy link */}
        <div className="relative h-[428px] flex flex-col gap-3 flex-1 p-4">
          <div className="py-4 px-8 border-b border-head-table ">
            {/* taskid, epicid, title */}
            <div className="flex flex-col gap-2">
              {/* taskId, epicId */}
              <div className="flex items-center gap-3">
                <p className="w-fit h-[20px] py-0.5 px-2 font-bold text-label rounded-xs text-primary-container bg-surface-highest">{`Task-${task.id.slice(0, 3).toUpperCase()}`}</p>
                {epic && (
                  <p className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/epic-in-task.svg"
                      alt="epic-id"
                      width={12}
                      height={12.7}
                    />
                    <span className="text-body font-medium text-muted-body">{`Epic-${epic.id.slice(0, 3).toUpperCase()}`}</span>
                    <span className="text-body font-medium text-muted-body">
                      (Core Ui Overhaul)
                    </span>
                  </p>
                )}
              </div>
              {/* title */}
              <div>
                <h3 className="text-heading font-bold text-slate-dark">
                  {task.title}
                </h3>
              </div>
            </div>
          </div>
          {/* description, copy link */}
          <div className=" p-8 flex flex-col gap-3 ">
            <p className="text-label font-bold text-muted-body">description</p>
            <p className="text-body font-normal text-muted-body">
              {task.description}
            </p>
          </div>
          {/* copy id */}
          <div className="absolute top-[calc(100%-80px)] left-0 w-full h-[80px] bg-resend-container flex items-center justify-between py-4 px-8">
            {/* <div className="flex items-center gap-4 ">
              <Image
                src="/assets/icons/copy-link.svg"
                alt="copy-link"
                width={15}
                height={7.5}
              />
              <p>Copy Link</p>
            </div> */}
            <Link href={`/project/${epic?.projectId}/tasks/${task.id}/update`}>
              <button className="w-fit py-2 px-4 rounded-lg bg-primary-container text-body font-semibold text-white cursor-pointer">
                Update
              </button>
            </Link>
            <DialogClose asChild>
              <button className="py-2 px-4 rounded-lg bg-surface-highest text-body font-semibold text-slate-dark cursor-pointer">
                Close
              </button>
            </DialogClose>
          </div>
        </div>
        {/* status, assinee, reporter, dueDate, createdAt */}
        <div className="h-full flex flex-col gap-3 border-s border-head-table bg-resend-container p-8 w-[320px]">
          {/* status */}
          <div className="flex flex-col gap-2 w-[255px]">
            <p className="text-label font-bold text-muted-body">Status</p>
            <p
              className={` ${statusBackgroundColors[task.status as keyof typeof statusBackgroundColors]} w-full flex items-center justify-center gap-2  rounded-[2px] px-4 py-2.5 h-[36px] text-slate-dark text-label font-bold`}
            >
              {task.status}
            </p>
          </div>
          {/* assignee */}
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-label font-bold text-muted-body">Assignee</p>
            <div className="flex items-center gap-3 rounded-xl p-2 bg-white shadow-[0px_1px_2px_0px_#0000000D]">
              <p className="w-6 h-6 flex items-center justify-center rounded-lg bg-surface-highest text-label font-bold">
                {assignee?.name
                  .split(' ')
                  .map((word) => word[0][0].toUpperCase())}
              </p>
              <div className="flex flex-col items-start justify-start">
                <p className="text-body font-semibold text-slate-dark">
                  {assignee?.name}
                </p>
                <p className="text-label font-normal text-muted-body">
                  {assignee?.jobTitle}
                </p>
              </div>
            </div>
          </div>
          {/* reporter */}
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-label font-bold text-muted-body">Reporter</p>
            <div className="flex justify-start items-center gap-3 p-2 ps-0">
              <p className="w-6 h-6 flex items-center justify-center rounded-lg bg-surface-highest text-label font-bold">
                {rePorter?.name
                  .split(' ')
                  .map((word: string) => word[0][0].toUpperCase())}
              </p>
              <p className="text-body font-semibold text-slate-dark">
                {rePorter?.name}
              </p>
            </div>
          </div>
          {/* dueDate + createdAt */}
          <div className="pt-4 border-t border-head-table flex flex-col gap-4 ">
            <div className="flex items-center justify-between ">
              <p className="text-label font-normal text-muted-body">Due Date</p>
              <p className="text-body font-medium text-slate-dark">
                {formatDate(task.dueDate)}
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="text-label font-normal text-muted-body">
                Created At
              </p>
              <p className="text-body font-medium text-slate-dark">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModalInEpic;
