import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return new NextResponse(
        JSON.stringify({ message: 'Invalid credentials' }),
        {
          status: 401,
        },
      );

    const token = await signToken({
      userId: user.id,
      email: user.email,
    });

    const response = NextResponse.json({
      message: 'Login successful',
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
