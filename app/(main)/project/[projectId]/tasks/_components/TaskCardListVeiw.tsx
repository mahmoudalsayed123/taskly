import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/help';

import DropdownMenuComponent from '../../../_components/DropdownMenu';
import { Task } from '@/app/generated/prisma/client';
import { statusBackgroundColors } from '@/app/_constant';

const TaskCardListVeiw = ({
  task,
  assigneeName,
}: {
  task: Task;
  assigneeName?: string;
}) => {
  return (
    <TableRow
      key={task.id}
      className="bg-white w-full! h-[80px]! absolute top-0 left-0 grid grid-cols-6!"
    >
      {/* TASK ID */}
      <TableCell className="col-span-1 flex! justify-start! items-center! px-4!">
        <h4 className="text-label text-primary-container font-semibold text-center">
          {`Task-${task.id.slice(0, 3).toUpperCase()}`}
        </h4>
      </TableCell>
      {/* TITLE */}
      <TableCell className="col-span-1 flex! justify-start! items-center!">
        <div className="hidden md:block">
          <h5 className="text-body text-slate-dark font-semibold text-left!">
            {task.title}
          </h5>
        </div>
      </TableCell>
      {/* STATUS */}
      <TableCell className="col-span-1 flex! justify-center! items-center!">
        <p
          className={` ${statusBackgroundColors[task.status as keyof typeof statusBackgroundColors]} flex items-center justify-center gap-2  rounded-[2px] px-2 py-1 w-[91px] h-[21px] text-slate-dark text-label font-bold`}
        >
          {task.status}
        </p>
      </TableCell>
      {/* DUE DATE */}
      <TableCell className="col-span-1 flex! justify-center! items-center!">
        <div className="hidden md:block">
          <p className="text-body font-normal text-slate-medium">
            {formatDate(task.dueDate)}
          </p>
        </div>
      </TableCell>
      {/* ASSIGNEE */}
      <TableCell className="col-span-1 flex! justify-center! items-center!">
        <div className="flex items-center gap-2">
          <p className="flex items-center justify-center gap-2 bg-resend-container rounded-full  w-[30px] h-[30px] text-slate-dark text-label font-bold">
            {assigneeName?.slice(0, 2).toUpperCase()}
          </p>
          <span className="text-body font-normal text-slate-dark">
            {assigneeName}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-end col-span-1  flex! justify-end! items-center!">
        <DropdownMenuComponent />
      </TableCell>
    </TableRow>
  );
};

export default TaskCardListVeiw;
