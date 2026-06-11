import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DropdownMenuComponent from '../../../_components/DropdownMenu';
import { Task } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';
import { prisma } from '@/prisma';
import { statusBackgroundColors } from '@/app/_constant';

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Table>
      <TableHeader className="h-[54px]">
        <TableRow>
          <TableHead className="rounded-tl-[12px]">
            <p className="text-label! font-bold! text-muted-body!">TASK ID</p>
          </TableHead>
          <TableHead className="text-left ps-[60px]">
            <p className="w-full h-full flex items-center text-label! font-bold! text-muted-body!">
              TITLE
            </p>
          </TableHead>
          <TableHead className="text-left">
            <p className="text-label! font-bold! text-muted-body!">STATUS</p>
          </TableHead>
          <TableHead className="text-left">
            <p className="text-label! font-bold! text-muted-body!">DUE DATE</p>
          </TableHead>
          <TableHead className="text-left">
            <p className="text-label! font-bold! text-muted-body!">ASSIGNEE</p>
          </TableHead>
          <TableHead className="text-right rounded-tr-[12px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map(async (task) => {
          const assigneeName = task.assigneeId
            ? (
                await prisma.user.findUnique({
                  where: { id: task.assigneeId },
                  select: { name: true },
                })
              )?.name
            : null;
          return (
            <TableRow key={task.id} className="bg-white h-[90px]">
              {/* TASK ID */}
              <TableCell>
                <h4 className="text-label text-primary-container font-semibold text-center">
                  {`Task-${task.id.slice(0, 3).toUpperCase()}`}
                </h4>
              </TableCell>
              {/* TITLE */}
              <TableCell>
                <div className="hidden md:block ps-[60px]">
                  <h5 className="text-body text-slate-dark font-semibold">
                    {task.title}
                  </h5>
                </div>
              </TableCell>
              {/* STATUS */}
              <TableCell>
                <p
                  className={` ${statusBackgroundColors[task.status as keyof typeof statusBackgroundColors]} flex items-center justify-center gap-2  rounded-[2px] px-2 py-1 w-[91px] h-[21px] text-slate-dark text-label font-bold`}
                >
                  {task.status}
                </p>
              </TableCell>
              {/* DUE DATE */}
              <TableCell>
                <div className="hidden md:block">
                  <p className="text-body font-normal text-slate-medium">
                    {formatDate(task.dueDate)}
                  </p>
                </div>
              </TableCell>
              {/* ASSIGNEE */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <p className="flex items-center justify-center gap-2 bg-resend-container rounded-full  w-[30px] h-[30px] text-slate-dark text-label font-bold">
                    {assigneeName?.slice(0, 2).toUpperCase()}
                  </p>
                  <span className="text-body font-normal text-slate-dark">
                    {assigneeName}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right ms-10">
                <DropdownMenuComponent />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
