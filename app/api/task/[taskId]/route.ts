import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const body = await req.json();
  const { title, description, dueDate, assigneeId, status, epicId } = body;
  const taskId = (await params).taskId;

  try {
    const updateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        assigneeId,
        dueDate,
        epicId,
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      data: updateTask,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update task',
    });
  }
}
