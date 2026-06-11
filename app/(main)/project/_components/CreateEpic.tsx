'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// hidden => hidden in mobile screen
const CreateEpic = ({ hidden }: { hidden: boolean }) => {
  const params = useParams();
  const { projectId } = params as { projectId: string };
  return (
    <Link href={`/project/${projectId}/epics/new`}>
      <button
        className={`w-[139px] h-[48px] px-6 py-3 items-center justify-center gap-2 rounded-sm bg-primary-container text-white font-bold cursor-pointer ${hidden ? 'hidden md:flex' : 'flex md:hidden'}`}
      >
        <Image
          src="/assets/icons/plus.svg"
          alt="plus"
          width={10.5}
          height={10.5}
        />
        <span className="lg:text-body md:text-body font-medium">New Epic</span>
      </button>
    </Link>
  );
};

export default CreateEpic;
