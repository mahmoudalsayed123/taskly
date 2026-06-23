import { Task } from '@/app/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import TaskModal from './TaskModal';

function formatStatus(status: string) {
  return status.replaceAll('_', ' ');
}
const StatusColumn = ({
  status,
  tasks,
  projectId,
}: {
  status: string;
  tasks: Task[];
  projectId: string;
}) => {
  return (
    <div className=" p-4 min-w-[250px] h-fit shrink-0">
      {/* Status, Length of tasks, Add New Task Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'TO_DO' && 'bg-slate-medium'
            } ${status === 'IN_PROGRESS' && 'bg-primary-container'} ${
              status === 'BLOCKED' && 'bg-error'
            } ${status === 'IN_REVIEW' && 'bg-muted-body'} ${
              status === 'READY_FOR_QA' && 'bg-slate-medium'
            } ${status === 'REOPENED' && 'bg-slate-medium'} ${
              status === 'READY_FOR_PRODUCTION' && 'bg-slate-medium'
            } ${status === 'DONE' && 'bg-success'}`}
          ></span>
          <span className="font-bold text-label text-slate-medium">
            {formatStatus(status)}
          </span>

          <span className="text-xs">{tasks.length}</span>
        </div>

        <Link
          href={`/project/${projectId}/tasks/new?status=${status}`}
          className="cursor-pointer "
        >
          <Image
            src="/assets/icons/plus-dark.svg"
            alt="add new task"
            width={10.5}
            height={10.5}
          />
        </Link>
      </div>

      {/* Add Task */}

      <Link
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="block"
      >
        <button className="w-full h-[52px] border-2 border-dashed border-slate-light rounded-lg p-4 mb-4 flex items-center gap-2 justify-center cursor-pointer">
          <Image
            src="/assets/icons/plus-with-circle.svg"
            alt="add new task"
            width={15}
            height={15}
          />
          <p className="text-label font-bold text-slate-medium">Add New Task</p>
        </button>
      </Link>

      {/* Tasks */}

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskModal key={task.id} task={task} view={'board'} />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;
