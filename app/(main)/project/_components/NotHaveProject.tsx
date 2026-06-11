import Image from 'next/image';
import Link from 'next/link';

const NotHaveProject = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-[36px] font-semibold ">No Projects</h1>
      <p className="max-w-[450px] text-[16px] text-center font-normal text-muted-body">
        You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics.
      </p>
      <Link href="/project/new">
        <button className="w-[190px] h-[50px] px-2 items-center justify-center gap-2 rounded-sm bg-primary-container text-white font-bold cursor-pointer flex">
          <Image
            src="/assets/icons/plus.svg"
            alt="plus"
            width={10.5}
            height={10.5}
          />
          <span className="lg:text-body md:text-body font-medium">
            Create New Project
          </span>
        </button>
      </Link>
    </section>
  );
};

export default NotHaveProject;
