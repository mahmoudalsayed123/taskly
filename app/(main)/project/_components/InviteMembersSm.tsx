import Image from 'next/image';

const InviteMembersSm = () => {
  return (
    <button className="md:hidden w-fit p-4 flex items-center justify-center absolute bottom-[20px] right-0 text-white bg-primary-container rounded-[12px] cursor-pointer">
      <Image src="/assets/icons/user.svg" alt="invite" width={16} height={16} />
    </button>
  );
};

export default InviteMembersSm;
