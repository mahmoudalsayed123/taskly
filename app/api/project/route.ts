import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Role } from '@/app/generated/prisma/enums';

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie');

    const token = cookie
      ?.split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json('User not found', { status: 404 });
    }

    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json('Missing fields', { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: user.id,
      },
    });
    console.log('newProject', newProject);

    const projectMember = await prisma.project_Member.create({
      data: {
        userId: user.id,
        projectId: newProject.id,
        role: Role.ADMIN,
      },
    });
    console.log('projectMember', projectMember);
    return NextResponse.json(newProject, { status: 200 });
  } catch (error) {
    console.error('CREATE PROJECT ERROR:', error);
    return NextResponse.json('Internal server error', { status: 500 });
  }
}
