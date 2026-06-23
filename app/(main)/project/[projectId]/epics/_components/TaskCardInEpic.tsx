import { Task } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';
import { prisma } from '@/prisma';
import Image from 'next/image';

const TaskCardInEpic = async ({ task }: { task: Task }) => {
  const taskAssignee = task.assigneeId
    ? await prisma.user.findUnique({
        where: {
          id: task.assigneeId,
        },
      })
    : null;

  return (
    <div className="w-full flex items-center justify-between gap-2 border border-slate-light p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/icons/task-correct.svg"
          alt={taskAssignee?.name || ''}
          width={20}
          height={20}
          className="object-contain"
        />
        <div className="flex flex-col gap-1">
          <p className="text-label line-clamp-1 sm:text-body font-medium text-slate-dark">
            {task.title}
          </p>
          <div className="flex items-center gap-2">
            <p className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-highest text-[8px] font-bold text-slate-medium">
              {taskAssignee?.name?.slice(0, 2).toUpperCase()}
            </p>
            <p className="text-body font-normal text-slate-light">
              {taskAssignee?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-label font-bold text-slate-light">Due Date</p>
        <p className="text-label sm:text-body font-medium text-slate-dark">
          {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
};

export default TaskCardInEpic;
