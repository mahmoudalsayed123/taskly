import Image from 'next/image';
import Link from 'next/link';

const CreateProject = ({ hidden }: { hidden: boolean }) => {
  return (
    <Link href="/project/new">
      <button
        className={`w-[190px] h-[50px] px-2 items-center justify-center gap-2 rounded-sm bg-primary-container text-white font-bold cursor-pointer ${hidden ? 'hidden md:flex' : 'flex md:hidden'}`}
      >
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
  );
};

export default CreateProject;
