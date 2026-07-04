import { prisma } from '@/prisma';
import { getCurrentUser } from './getCurrentUser';
import { notFound } from 'next/navigation';

export async function getInvitation({ token }: { token: string }) {
  const invitation = await prisma.invitation.findUnique({
    where: {
      token,
    },
    select: {
      email: true,
      expiresAt: true,
      acceptedAt: true,
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      invitedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!invitation) {
    notFound();
  }

  let status: 'PENDING' | 'EXPIRED' | 'ACCEPTED' = 'PENDING';

  if (invitation.acceptedAt) {
    status = 'ACCEPTED';
  } else if (invitation.expiresAt < new Date()) {
    status = 'EXPIRED';
  }

  const currentUser = await getCurrentUser();

  let isMember = false;

  if (currentUser) {
    const member = await prisma.project_Member.findUnique({
      where: {
        userId_projectId: {
          userId: currentUser.id,
          projectId: invitation.project.id,
        },
      },
      select: {
        id: true,
      },
    });

    isMember = !!member;
  }

  return {
    projectId: invitation.project.id,
    projectName: invitation.project.name,
    invitedBy: invitation.invitedBy.name,
    expiresAt: invitation.expiresAt,
    status,
    isMember,
  };
}
