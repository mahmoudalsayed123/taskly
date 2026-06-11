import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import InviteMembersSm from './InviteMembersSm';
import Image from 'next/image';

const InviteDrawerSm = () => {
  return (
    <div className="flex flex-wrap gap-2 max-w-[448px]  shadow-[0px_-4px_24px_0px_rgba(4,27,60,0.06)]">
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <InviteMembersSm />
        </DrawerTrigger>
        <DrawerContent className="px-5 pb-10">
          <DrawerHeader>
            <DrawerTitle className="flex flex-col gap-1 pt-5">
              <div className="flex flex-col items-start gap-1">
                <p className="md:hidden text-label font-normal text-slate-medium">
                  Project Name
                </p>
                <p className="text-[24px] font-bold text-slate-dark">
                  Invite Members
                </p>
              </div>
              <p className=" mb-10 text-body font-normal text-start text-slate-medium ">
                Send an invitation to join the Architectural Studio workspace.
              </p>
            </DrawerTitle>
          </DrawerHeader>
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
            <DrawerClose asChild>
              <button className="text-body font-semibold text-primary-container cursor-pointer md:ps-10">
                Cancel
              </button>
            </DrawerClose>
          </div>
          <DrawerClose asChild>
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={14}
              height={14}
              className="absolute top-[30px] right-[30px]"
            />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default InviteDrawerSm;
