import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Task } from '@/app/generated/prisma/client';
import { prisma } from '@/prisma';
import TaskModal from './TaskModal';

const TasksTable = ({
  tasks,
  projectId,
}: {
  tasks: Task[];
  projectId: string;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-[54px] grid! grid-cols-6! ">
          <TableHead className=" col-span-1 ">
            <p className="rounded-tl-lg! h-[54px]! text-label! font-bold! text-muted-body! flex! justify-start! items-center! px-4!">
              TASK ID
            </p>
          </TableHead>
          <TableHead className="text-left col-span-1">
            <p className="h-[54px]! text-label! font-bold! text-muted-body! flex! justify-start! items-center!">
              TITLE
            </p>
          </TableHead>
          <TableHead className="text-left col-span-1 ">
            <p className="h-[54px]! text-label! font-bold! text-muted-body! flex! justify-center! items-center!">
              STATUS
            </p>
          </TableHead>
          <TableHead className="text-left col-span-1 ">
            <p className="h-[54px]! text-label! font-bold! text-muted-body! flex! justify-center! items-center!">
              DUE DATE
            </p>
          </TableHead>
          <TableHead className="text-left col-span-1 ">
            <p className="h-[54px]! text-label! font-bold! text-muted-body! flex! justify-center! items-center!">
              ASSIGNEE
            </p>
          </TableHead>
          <TableHead className="rounded-tr-lg! text-right col-span-1 flex! justify-end! items-center!"></TableHead>
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
            <TaskModal
              key={task.id}
              projectId={projectId}
              task={task}
              view={'list'}
              assigneeName={assigneeName || 'Unassigned'}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
