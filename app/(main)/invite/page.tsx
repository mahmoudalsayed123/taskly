import Logo from '@/components/LogoDashboard';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import { getInvitation } from '@/lib/getInvitation';
import BtnAcceptInvite from './_components/BtnAcceptInvite';

const AcceptInvite = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const invitation = await getInvitation({ token });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-screen">
      <Logo />

      <div className="p-10 rounded-lg border-t-4 border-t-primary-container bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-head-table mb-6 w-fit mx-auto">
          <Image
            src="/assets/icons/accept-invite.svg"
            alt="invitation accept"
            width={12}
            height={10}
          />

          <p className="text-label text-muted-body font-bold">
            New Project Invitation
          </p>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-slate-dark text-[30px] font-bold leading-10 tracking-[-0.3px] text-center">
          You&apos;ve been invited to join the <br />
          <span className="font-bold text-primary-container">
            {invitation.projectName}
          </span>
        </h2>

        {/* Inviter */}
        <div className="flex items-center justify-between gap-4 mb-10 rounded-lg w-fit px-5 py-4 mx-auto bg-resend-container">
          <div className="rounded-lg bg-surface-highest px-5 py-3">
            <span className="text-primary-container font-bold text-title">
              {invitation.invitedBy
                .split(' ')
                .map((n: string) => n[0].toUpperCase())
                .join('')}
            </span>
          </div>

          <h3 className="text-body font-medium text-slate-dark">
            {invitation.invitedBy}
          </h3>

          <span className="rounded-xs px-[2.5px] py-2 text-label font-medium bg-surface-highest">
            Invited By
          </span>
        </div>

        {/* Accept Button */}
        <BtnAcceptInvite token={token} status={invitation.status} invitatoin={invitation} />
      </div>
    </section>
  );
};

export default AcceptInvite;
