import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const InviteDialogSm = () => {
  return (
    <Dialog>
      <DialogContent className="max-w-[448px] px-6! pt-[60px]! pb-[50px] -translate-y-[120px]! rounded-t-[35px]!">
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
        <div className="relative w-full ">
          {/* Email Addresses */}
          <label className="label" htmlFor="email">
            Email Addresses
          </label>
          <input
            className="input-mobile h-[45px]!"
            type="text"
            id="email"
            placeholder="Enter email addresses"
            // value={projectName}
            // onChange={(e) => setProjectName(e.target.value)}
          />
          <Image
            src="/assets/icons/email.svg"
            alt="add-email"
            width={16}
            height={16}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row-reverse justify-center md:justify-between mt-5  items-center gap-3">
          <button
            className="w-full! md:w-[150px]! md:h-[45px]! rounded-[2px]! btn-primary text-body font-semibold cursor-pointer shadow-[0px_4px_6px_-4px_#0000001A]"
            type="submit"
          >
            Add Members
          </button>
          <p className="text-body font-semibold text-primary-container cursor-pointer md:ps-10">
            Cancel
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialogSm;
