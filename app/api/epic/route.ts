import { prisma } from '@/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const epic = await prisma.epic.create({
      data: body,
    });
    return Response.json({ epic, message: 'Epic created successfully' });
  } catch (error) {
    console.log(error);
    return Response.json({ message: (error as Error).message });
  }
}
