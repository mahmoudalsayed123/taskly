import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const member = await prisma.project_Member.findFirst({
      where: {
        projectId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json({
      isMember: !!member,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
