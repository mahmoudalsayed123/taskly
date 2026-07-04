import { Epic, Task } from '@/app/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import TaskCardInEpic from './TaskCardInEpic';
import TaskModal from '../../tasks/_components/TaskModal';
import TaskModalInEpic from './TaskModalInEpic';

const TasksList = ({
  tasks,
  tasksCount,
  epic,
}: {
  tasks: Task[];
  tasksCount: number;
  epic: Epic;
}) => {
  return (
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
            <TaskModalInEpic key={task.id} task={task} epic={epic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;
