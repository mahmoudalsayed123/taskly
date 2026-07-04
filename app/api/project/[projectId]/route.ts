import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const body = await req.json();
  const { name, description } = body;
  const projectId = (await params).projectId;

  try {
    const updateProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updateProject,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update project',
    });
  }
}
