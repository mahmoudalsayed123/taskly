import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { Role } from '@/app/generated/prisma/enums';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      projectId: string;
    };

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (decoded.email !== currentUser.email) {
      return NextResponse.json(
        { error: 'This invite belongs to another account' },
        { status: 403 },
      );
    }

    const existingMember = await prisma.project_Member.findFirst({
      where: {
        userId: currentUser.id,
        projectId: decoded.projectId,
      },
    });

    if (existingMember) {
      return NextResponse.json({
        message: 'Already a member',
      });
    }

    await prisma.project_Member.create({
      data: {
        projectId: decoded.projectId,
        userId: currentUser.id,
        role: Role.MEMBER,
      },
    });

    return NextResponse.json({
      success: true,
      projectId: decoded.projectId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
