import MainHeadingSection from '@/app/(main)/project/_components/MainHeadingSection';
import Image from 'next/image';
import SelectViewTasks from './_components/SelectViewTasks';
import BtnNewTask from './_components/BtnNewTask';
import TasksTable from './_components/TasksTable';
import { randomUUID } from 'crypto';
import BoardViewTasks from './_components/BoardViewTasks';
import { prisma } from '@/prisma';
import { groupTasksByStatus } from '@/lib/groupTasksByStatus';
import TaskDetailsDrawer from './_components/TaskDetailsDrawer';

const tasks = [
  {
    id: randomUUID(),
    title: 'task 201',
    status: 'TO DO',
    duDate: '23 Oct 2025',
    assignee: { name: 'Ahmad ali' },
  },
  {
    id: randomUUID(),
    title: 'task 202',
    status: 'IN PROGRESS',
    duDate: '23 Oct 2025',
    assignee: { name: 'Youssef ali' },
  },
  {
    id: randomUUID(),
    title: 'task 203',
    status: 'COMPLETE',
    duDate: '23 Oct 2025',
    assignee: { name: 'John Doe' },
  },
];

const Tasks = async ({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { view?: string };
}) => {
  const { projectId } = await params;
  const { view = 'board' } = await searchParams;

  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
  });

  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <>
      {/* Desktop */}
      <section className={'section  hidden! md:block! '}>
        <div className=" w-full flex items-center">
          {/* BreadCrumb */}
          {/* <BreadcrumbProject /> */}
        </div>
        {/* Heading Section + Search input + select view + filtering + Create epic button */}
        <div className=" w-full flex flex-col gap-5 lg:flex-row mb-8 ">
          {/* Main Heading */}
          <div className="w-full">
            <MainHeadingSection
              heading="Active Workboard"
              desc={
                "Curating Project Alpha's production pipeline and milestones."
              }
            />
          </div>
          <div className="relative md:flex md:justify-between w-full md:items-center md:gap-8">
            {/* search */}
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={10.5}
              height={10.5}
              className="absolute top-1/2 left-2 -translate-y-1/2 "
            />
            <input
              type="text"
              placeholder="Search Tasks"
              className="input-mobile px-7! py-2.5! w-full md:min-w-[300px]! h-[48px]! placeholder:text-body placeholder:font-medium"
            />
            {/* select List or board  */}
            <div>
              <SelectViewTasks projectId={projectId} />
            </div>
            {/* Filter */}
            <div className="flex min-w-[34px] min-h-[28px] rounded-lg p-2 bg-head-table  items-center justify-center cursor-pointer">
              <Image
                src="/assets/icons/filter-tasks.svg"
                alt="filter"
                width={18}
                height={12}
              />
            </div>
          </div>
        </div>

        {view === 'board' ? (
          <BoardViewTasks groupedTasks={groupedTasks} projectId={projectId} />
        ) : (
          <TasksTable tasks={tasks} />
        )}
      </section>

      {/* mobile */}
      <section className="section block! md:hidden!">
        {/* Heading Section + Search input + Create epic button */}
        <div className=" md:hidden w-full flex flex-col gap-5 lg:flex-row mb-8 ">
          {/* Main Heading */}
          <div className="w-full">
            <MainHeadingSection
              heading="Active Workboard"
              desc={
                "Curating Project Alpha's production pipeline and milestones."
              }
            />
          </div>
          <div className="relative md:flex md:justify-between w-full md:items-center md:gap-8">
            {/* search */}
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={10.5}
              height={10.5}
              className="absolute top-1/2 left-2 -translate-y-1/2 "
            />
            <input
              type="text"
              placeholder="Search Tasks"
              className="input-mobile px-7! py-2.5! w-full md:min-w-[300px]! h-[48px]! placeholder:text-body placeholder:font-medium"
            />
          </div>
          {/* btn create task */}
          <div className="w-full md:hidden">
            <BtnNewTask />
          </div>
        </div>

        {/* TASKS LIST */}
          {tasks.map((task) => (
            <TaskDetailsDrawer key={task.id} task={task} />
          ))}
      </section>
    </>
  );
};
export default Tasks;
