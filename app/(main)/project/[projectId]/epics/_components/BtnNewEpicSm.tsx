'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const BtnNewEpicSm = () => {
  const params = useParams();
  const { projectId } = params as { projectId: string };
  return (
    <Link href={`/project/${projectId}/epics/new`}>
      <button className="md:hidden w-fit p-4 flex items-center justify-center absolute bottom-[20px] right-5 text-white bg-primary-container rounded-[12px] cursor-pointer">
        <Image
          src="/assets/icons/plus.svg"
          alt="invite"
          width={15}
          height={15}
        />
      </button>
    </Link>
  );
};

export default BtnNewEpicSm;
