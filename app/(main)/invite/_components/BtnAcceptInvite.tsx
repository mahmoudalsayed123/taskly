'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Invitation } from '@/app/generated/prisma/client';

type Props = {
  token: string;
  status: 'PENDING' | 'EXPIRED' | 'ACCEPTED';
  invitatoin: {
    projectId: string;
    expiresAt: Date;
    isMember: boolean;
  };
};

const AcceptInvitationButton = ({ token, status, invitatoin }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (status === 'ACCEPTED') {
    return (
      <button
        onClick={() => router.replace(`/project/${invitatoin.projectId}/epics`)}
        className="btn-primary w-full py-4! px-6! text-body font-semibold rounded-xs"
      >
        Go to Project
      </button>
    );
  }

  if (status === 'EXPIRED') {
    return (
      <button
        disabled={true}
        className="btn-primary w-full py-4! px-6! text-body font-semibold rounded-xs opacity-60 cursor-not-allowed bg-error/40 text-error"
      >
        Invitation Expired
      </button>
    );
  }

  const handleAccept = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/invite/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      // if user is already a member of the project
      if (data.alreadyMember) {
        toast.info('You are already a member of this project');
        setLoading(true);
        router.replace(`/project/${data.projectId}/epics`);
        return;
      }

      if (response.status === 401) {
        router.push(
          `/signup?redirect=${encodeURIComponent(`/invite?token=${token}`)}`,
        );
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Invitation accepted successfully.');

      router.replace(`/project/${data.projectId}/epics`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAccept}
      disabled={loading || status !== 'PENDING'}
      className="btn-primary w-full py-4! px-6! text-body font-semibold rounded-xs"
    >
      {loading ? 'Accepting...' : 'Accept Invitation'}
    </button>
  );
};

export default AcceptInvitationButton;
