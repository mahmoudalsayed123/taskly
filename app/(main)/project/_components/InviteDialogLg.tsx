import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InviteMembersLg from './InviteMembersLg';
import BtnInviteMember from '../[projectId]/members/_components/BtnInviteMember';

const InviteDialogLg = ({ projectId }: { projectId: string }) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <InviteMembersLg />
      </DialogTrigger>
      <DialogContent className="max-w-[448px] rounded-[8px] px-6 py-8">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-resend-container rounded-[12px] min-w-10 min-h-10 flex items-center justify-center text-white">
                <Image
                  src="/assets/icons/invite-user.svg"
                  alt="add-member"
                  width={20}
                  height={20}
                />
              </div>
              <p className="text-[24px] font-bold text-slate-dark">
                Invite Members
              </p>
            </div>
            <p className=" mb-10 text-body font-normal text-slate-medium mt-2">
              Send an invitation to join the Architectural Studio workspace.
            </p>
          </DialogTitle>
        </DialogHeader>
        <BtnInviteMember projectId={projectId} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialogLg;
