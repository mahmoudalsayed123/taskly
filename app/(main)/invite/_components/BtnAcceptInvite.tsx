'use client';

import { useRouter } from 'next/navigation';

const BtnAcceptInvite = ({ token }: { token: string }) => {
  const router = useRouter();

  const handleAcceptInvite = async () => {
    const res = await fetch('/api/invite/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push(`/project/${data.projectId}/epics`);
  };

  return (
    <button
      className="btn-primary w-full py-4! px-6! text-body font-semibold rounded-xs"
      onClick={handleAcceptInvite}
    >
      Accept Invitation
    </button>
  );
};

export default BtnAcceptInvite;
