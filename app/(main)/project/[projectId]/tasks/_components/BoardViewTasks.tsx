import { GroupedTasks } from '@/lib/groupTasksByStatus';
import StatusColumn from './StatusColumn';
import { TaskStatus } from '@/app/generated/prisma/enums';
import { TaskStatusValues } from '@/app/_constant';

const BoardViewTasks = async ({
  groupedTasks,
  projectId,
}: {
  groupedTasks: GroupedTasks;
  projectId: string;
}) => {
  return (
    <div className="board-scroll overflow-x-auto w-full h-fit ">
      <div className="flex items-start gap-6 min-w-max">
        {TaskStatusValues.map((status) => (
          <StatusColumn
            key={status}
            status={status}
            tasks={groupedTasks[status as TaskStatus]}
            projectId={projectId}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardViewTasks;
