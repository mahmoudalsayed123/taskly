import { Task } from '@/app/generated/prisma/client';
import { TaskStatus } from '@/app/generated/prisma/enums';

export type GroupedTasks = {
  [key in TaskStatus]: Task[];
};

export function groupTasksByStatus(tasks: Task[]) {
  const grouped: GroupedTasks = {
    TO_DO: [],
    IN_PROGRESS: [],
    BLOCKED: [],
    IN_REVIEW: [],
    READY_FOR_QA: [],
    REOPENED: [],
    READY_FOR_PRODUCTION: [],
    DONE: [],
  };

  tasks.forEach((task: Task) => {
    grouped[task.status as TaskStatus].push(task);
  });

  return grouped;
}
