'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const BtnNewTask = () => {
  const params = useParams();
  const { projectId } = params as { projectId: string };
  return (
    <Link href={`/project/${projectId}/tasks/new`}>
      <button className="w-full h-[36px] px-6 py-3 flex md:flex-1 items-center justify-center gap-1 rounded-sm bg-primary-container text-white font-bold cursor-pointer ">
        <Image
          src="/assets/icons/plus.svg"
          alt="plus"
          width={10.5}
          height={10.5}
        />
        <span className="lg:text-body md:text-body font-medium">New Task</span>
      </button>
    </Link>
  );
};

export default BtnNewTask;
