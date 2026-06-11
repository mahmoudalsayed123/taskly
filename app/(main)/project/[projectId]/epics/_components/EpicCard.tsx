import Image from 'next/image';
import { Epic } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';

const EpicCard = ({ epic }: { epic: Epic }) => {
  return (
    <div className="flex flex-col items-center gap-3 bg-white shadow-xl px-4 py-3 rounded-sm border-s-4 border-s-success-text cursor-pointer">
      <div className="flex items-center justify-between w-full">
        <span className="rounded-xs py-1 px-2 bg-surface-highest text-label font-bold uppercase text-primary-container">
          {`epic-${epic.id.slice(0, 3).toUpperCase()}`}
        </span>
        <Image src="/assets/icons/dots.svg" alt="dots" width={3} height={10} />
      </div>
      <h3 className="text-title font-semibold">{epic.title}</h3>
      <div className="flex items-center justify-between w-full mt-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-primary-container rounded-[12px] p-2 text-white text-label font-bold">
            MA
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-label font-medium text-slate-dark line-clamp-1">
              Mahmoud Sayed
            </p>
            <p className="text-[10px] font-normal text-slate-light line-clamp-1">
              Assignee
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] font-normal text-slate-light line-clamp-1">
            Deadline
          </p>
          <p className="text-label font-medium text-slate-dark line-clamp-1">
            Oct 24, 2023
          </p>
        </div>
      </div>

      {/* hidden in mobile screen */}
      <div className="hidden md:flex items-center justify-between w-full border-t border-slate-light py-3">
        <div className="flex items-center gap-1">
          <Image
            src="/assets/icons/user-dark.svg"
            alt="user"
            width={10.5}
            height={12}
          />
          <p className="flex items-center gap-1 mt-0.5">
            <span className="text-label font-medium text-slate-light">
              Created by{' '}
            </span>
            <span className="text-[10px] font-bold text-slate-medium">
              {epic.assigneeId}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/assets/icons/date.svg"
            alt="date"
            width={10.5}
            height={12}
          />
          <span className="text-label text-slate-medium font-normal mt-0.5">
            {formatDate(epic.deadline)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpicCard;
