import Image from 'next/image';
import { Task } from '@/app/generated/prisma/client';
import { prisma } from '@/prisma';
import { formatDate } from '@/lib/help';

const TaskCard = async ({ task }: { task: Task }) => {
  const assignee = await prisma.user.findUnique({
    where: {
      id: task.assigneeId as string,
    },
  });
  const lastLetter = assignee?.name.split(' ').pop()?.[0]?.toUpperCase() || '';
  const firstLetter = assignee?.name.split(' ')[0]?.[0]?.toUpperCase() || '';
  return (
    <div className="flex flex-col gap-3 p-4 w-full bg-white rounded-lg shadow-[0px_4px_24px_0px_#041B3C0A] mb-3 md:mb-0">
      {/* taskId, status, title */}
      <div className="flex flex-col gap-1">
        {/* status,taskId */}
        <div className="w-full flex items-center justify-between">
          <p className="text-label font-bold text-slate-medium">
            {task.id.slice(0, 3).toUpperCase()}
          </p>
          <p className="py-0.5 px-1 text-[10px] font-bold rounded-xs bg-success">
            {task.status}
          </p>
        </div>
        <h3 className="text-title font-medium text-slate-dark">{task.title}</h3>
      </div>
      {/* dueDate, Assignee, dots icons */}
      <div className="w-full flex  justify-between">
        {/* dueDate, Assignee */}
        <div className="w-full flex items-center gap-3">
          {/* Assignee */}
          <p className="flex items-center justify-center text-label text-slate-dark font-bold w-7 h-7 rounded-full bg-surface-highest">
            {firstLetter}
            {lastLetter}
          </p>
          {/* duDate */}
          <div className="flex flex-col">
            <p className="text-label font-bold text-slate-medium">Due Date</p>
            <p className="text-label font-medium text-slate-dark">
              {formatDate(task.dueDate as Date)}
            </p>
          </div>
        </div>
        {/* dots icons */}
        <div>
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={4}
            height={16}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
