import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { Role } from '@/app/generated/prisma/enums';

export async function POST(req: Request) {
  try {
    //check token is valid and exists
    const { token } = await req.json();
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    //check user is logged in
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Login required' }, { status: 401 });
    }

    // find invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: {
        token,
      },
    });

    if (!invitation)
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 },
      );

    // check invitation is expired
    if (invitation.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 410 },
      );
    }

    //check if invitation is already accepted
    if (invitation.acceptedAt !== null) {
      return NextResponse.json({
        alreadyMember: true,
        projectId: invitation.projectId,
      });
    }

    // check if user already member of this project
    const member = await prisma.project_Member.findUnique({
      where: {
        userId_projectId: {
          userId: currentUser?.id,
          projectId: invitation.projectId,
        },
      },
    });

    if (member) {
      await prisma.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          acceptedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        projectId: invitation.projectId,
      });
    }

    if (currentUser.email !== invitation.email) {
      return NextResponse.json(
        { error: 'This invite belongs to another account' },
        { status: 403 },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.project_Member.create({
        data: {
          userId: currentUser.id,
          projectId: invitation.projectId,
          role: Role.MEMBER,
        },
      });

      await tx.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          acceptedAt: new Date(),
        },
      });
    });

    return NextResponse.json({
      success: true,
      projectId: invitation.projectId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
