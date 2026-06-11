import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, jobTitle, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        jobTitle,
        password: hashPassword,
      },
    });

    return NextResponse.json({
      message: 'User created',
      userId: user.id,
    });
  } catch (error) {
    console.error('SIGNUP ERROR:', error);

    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
