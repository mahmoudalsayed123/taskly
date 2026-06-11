import Image from 'next/image';
import DropdownMenuComponent from './DropdownMenu';
import { User, Prisma } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';

const MemberBox = ({
  member,
  memberRole,
}: {
  member: User;
  memberRole: Prisma.Project_MemberGetPayload<{
    select: {
      role: true;
    };
  }>[];
}) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4 flex items-center justify-between w-full">
      {/* user image and name and role */}
      <div className="flex items-center gap-4 ">
        <div className="flex items-center justify-center gap-2 bg-resend-container rounded-[12px] min-w-10 min-h-10 text-primary-container text-[16px] font-bold">
          {member.name.split(' ').map((n: string) => n[0].toUpperCase())}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-body font-semibold text-slate-dark">
            {member.name}
          </h3>
          <p className="text-label font-normal text-slate-medium">
            {member.jobTitle}
          </p>
        </div>
      </div>
      {/* Joined At */}
      <div className="hidden md:block">
        <p className="text-body font-normal text-slate-medium">
          {formatDate(member.createdAt)}
        </p>
      </div>
      {/* Role + action buttons */}
      <div className="flex flex-col md:flex-row md:justify-between items-end  gap-2 ">
        <p className="flex items-center justify-center gap-2 bg-resend-container rounded-[2px] px-0.5 py-2 w-[57px] h-[24px] text-slate-dark text-label font-bold">
          {memberRole[0]?.role}
        </p>
        <DropdownMenuComponent />
      </div>
    </div>
  );
};

export default MemberBox;
