import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DropdownMenuComponent from './DropdownMenu';
import { User } from '@/app/generated/prisma/client';
import { formatDate } from '@/lib/help';
import { Prisma } from '@/app/generated/prisma/client';

const MemberTable = ({
  members,
  memberRole,
}: {
  members: User[];
  memberRole: Prisma.Project_MemberGetPayload<{
    select: {
      role: true;
      userId: true;
    };
  }>[];
}) => {
  return (
    <Table>
      <TableHeader className="h-[54px]">
        <TableRow>
          <TableHead className="rounded-tl-[12px]">
            <span className="ps-8 w-full h-full flex items-center">Member</span>
          </TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right rounded-tr-[12px]">
            <span className="flex items-center justify-end me-3">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id} className="bg-white h-[90px]">
            <TableCell>
              {/* user image and name and role */}
              <div className="flex items-center gap-4 ms-5">
                <div className="flex items-center justify-center gap-2 bg-resend-container rounded-[12px] min-w-10 min-h-10 text-primary-container text-[16px] font-bold">
                  {member.name
                    .split(' ')
                    .map((n: string) => n[0].toUpperCase())}
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
            </TableCell>
            <TableCell>
              <div className="hidden md:block">
                <p className="text-body font-normal text-slate-medium">
                  {formatDate(member.createdAt)}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <p className="flex items-center justify-center gap-2 bg-resend-container rounded-[2px] px-0.5 py-2 w-[57px] h-[24px] text-slate-dark text-label font-bold">
                {memberRole?.find((role) => role.userId === member.id)?.role}
              </p>
            </TableCell>
            <TableCell className="text-right ms-10">
              <DropdownMenuComponent />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberTable;
