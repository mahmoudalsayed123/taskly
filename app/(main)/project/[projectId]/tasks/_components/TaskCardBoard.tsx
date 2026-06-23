import { Task } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';
import { prisma } from '@/prisma';
import Image from 'next/image';

const TaskCardBoard = async ({ task }: { task: Task }) => {
  const assigneeName = task.assigneeId
    ? (
        await prisma.user.findUnique({
          where: { id: task.assigneeId },
          select: { name: true },
        })
      )?.name
    : null;
  return (
    <div className="w-full h-[133px] flex flex-col justify-between gap-4 shadow-[0px_2px_8px_0px_#00000005]  rounded-lg border bg-white p-4 cursor-pointer ">
      <h3 className="font-medium text-body text-slate-dark text-left">
        {task.title}
      </h3>

      <div className="flex items-center justify-between">
        {task.dueDate && (
          <div className="flex items-center gap-2">
            <Image
              src={'/assets/icons/date.svg'}
              alt="calendar"
              width={9}
              height={10}
            />
            <p className="text-label font-bold text-muted-body">
              {formatDate(task.dueDate)}
            </p>
          </div>
        )}
        <p className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-highest text-label font-bold">
          {assigneeName?.slice(0, 2).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default TaskCardBoard;
