import MainHeadingSection from '@/app/(main)/project/_components/MainHeadingSection';
import Image from 'next/image';
import SelectViewTasks from './_components/SelectViewTasks';
import BtnNewTask from './_components/BtnNewTask';
import TasksTable from './_components/TasksTable';
import BoardViewTasks from './_components/BoardViewTasks';
import { prisma } from '@/prisma';
import { groupTasksByStatus } from '@/lib/groupTasksByStatus';
import TaskDetailsDrawer from './_components/TaskDetailsDrawer';
import Pagination from '../../_components/Pagination';
import { pagination } from '@/lib/pagination';
import Search from '../../_components/Search';

const Tasks = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ view?: string; search?: string; page: string }>;
}) => {
  const { projectId } = await params;
  const { view = 'board', search, page } = await searchParams;

  const tasksBoardView = await prisma.task.findMany({
    where: {
      projectId: projectId,
      title: { contains: search || '', mode: 'insensitive' },
    },
    orderBy: { createdAt: 'asc' },
  });

  let { currentPage, limit, skip } = await pagination(page);

  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
      title: { contains: search || '', mode: 'insensitive' },
    },
    take: limit,
    skip,
    orderBy: { createdAt: 'asc' },
  });

  const groupedTasks = groupTasksByStatus(tasksBoardView);

  const totalTasks = await prisma.task.count({
    where: {
      projectId,
      title: {
        contains: search || '',
        mode: 'insensitive',
      },
    },
  });

  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <>
      {/* Desktop */}
      <section className={'section  hidden! md:block! '}>
        <div className=" w-full flex items-center">
          {/* BreadCrumb */}
          {/* <BreadcrumbProject /> */}
        </div>
        {/* Heading Section + Search input + select view + btn create new task  */}
        <div className=" w-full flex flex-col gap-5 lg:flex-row mb-8 ">
          {/* Main Heading */}
          <div className="w-full md:w-fit">
            <MainHeadingSection
              heading="Active Workboard"
              desc={
                "Curating Project Alpha's production pipeline and milestones."
              }
            />
          </div>
          <div
            className="relative md:flex md:flex-col md:gap-3 md:justify-between w-full md:flex-1 xl:flex-row xl:justify-between
           xl:items-center xl:gap-4 xl:ps-6"
          >
            {/* search */}
            <Search projectId={projectId} pageName={'tasks'} view={view} />
            <div className="md:w-full xl:w-fit md:flex md:flex-1 md:items-center md:justify-start lg:justify-between xl:justify-end md:gap-4 xl:gap-4 xl:flex-none">
              {/* select List or board  */}
              <div className="lg:flex-1 xl:flex-none">
                <SelectViewTasks projectId={projectId} />
              </div>
              {/* Filter */}
              <div className="lg:flex-1 xl:flex-none">
                <BtnNewTask />
              </div>
            </div>
          </div>
        </div>

        {view === 'board' ? (
          <BoardViewTasks groupedTasks={groupedTasks} projectId={projectId} />
        ) : (
          <TasksTable tasks={tasks} projectId={projectId} />
        )}

        {view === 'list' && (
          <div className="mt-12">
            <Pagination
              pageName="tasks"
              path={`/project/${projectId}/tasks`}
              totalPages={totalPages}
              currentPage={currentPage}
              totalItems={totalTasks}
              limit={limit}
              search={search || ''}
              view={view}
            />
          </div>
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
