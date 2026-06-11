import Image from 'next/image';

const InviteMembersLg = () => {
  return (
    <button
      className={`hidden md:flex w-[160px] h-[50px] items-center justify-center gap-2 rounded-[4px] bg-primary-container text-white font-bold cursor-pointer`}
    >
      <Image src="/assets/icons/user.svg" alt="" width={17} height={14} />
      <span className="lg:text-body md:text-body font-bold">
        Invite Members
      </span>
    </button>
  );
};

export default InviteMembersLg;
