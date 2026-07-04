import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function GET(
request: NextRequest,
{ params }: { params: Promise<{ token: string }> },
) {
try {
  const { token } = await params;
  console.log(token, 'token from api route');

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
    return NextResponse.json(
      { message: 'Invitation not found.' },
      { status: 404 },
    );
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
          userId: currentUser?.id,
          projectId: invitation.project.id,
        },
      },
      select: {
        id: true,
      },
    });

    isMember = !!member;
  }

  return NextResponse.json({
    projectId: invitation.project.id,
    projectName: invitation.project.name,
    invitedBy: invitation.invitedBy.name,
    expiresAt: invitation.expiresAt,
    status,
  });
} catch (error) {
  console.error(error);

  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 },
  );
}
}
