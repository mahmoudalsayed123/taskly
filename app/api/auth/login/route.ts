import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return new Response('Missing required fields', { status: 400 });
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return new Response('User not found', { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return new Response('Invalid credentials', { status: 401 });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    const response = NextResponse.json({
      message: 'Login successful',
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
