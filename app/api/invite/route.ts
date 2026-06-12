import { transporter } from '@/lib/mail';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, projectId } = await req.json();
    const inviteToken = jwt.sign(
      {
        email,
        projectId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      },
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,

      to: email,

      subject: `Invitation to join our Project`,

      html: `   
<button>
      <a
        href="https://taskly-theta-eight.vercel.app/invite?token=${inviteToken}"
        style="
          display:inline-block;
          background:#4f46e5;
          color:#ffffff;
          text-decoration:none;
          padding:14px 24px;
          border-radius:10px;
          font-size:16px;
          font-weight:600;
        "
      >
        Accept Invitation
      </a>
</button>
      `,
    });

    return NextResponse.json({
      message: 'Invitation sent',
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
