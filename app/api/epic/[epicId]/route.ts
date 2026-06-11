import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ epicId: string }> },
) {
  const body = await req.json();
  const { title, description, deadline, assigneeId } = body;
  const epicId = (await params).epicId;

  try {
    const updateEpic = await prisma.epic.update({
      where: {
        id: epicId,
      },
      data: {
        title,
        description,
        deadline,
        assigneeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Epic updated successfully',
      data: updateEpic,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update epic',
    });
  }
}
