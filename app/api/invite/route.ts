import { transporter } from '@/lib/mail';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { prisma } from '@/prisma';
import { Role } from '@/app/generated/prisma/enums';

// send invitation
export async function POST(req: Request) {
  try {
    // check if user are admin
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error: 'You are not logged in',
        },
        { status: 401 },
      );
    }

    const { email, projectId }: { email: string; projectId: string } =
      await req.json();

    // check email and projectId are exist
    if (!email || !projectId) {
      return NextResponse.json(
        {
          error: 'Email is required',
        },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    // const isMember = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });
    // if (isMember) {
    //   return NextResponse.json(
    //     {
    //       error: 'This user is already a member of this project',
    //     },
    //     { status: 400 },
    //   );
    // }

    // check if user is already invited to the project
    const isInvited = await prisma.invitation.findUnique({
      where: {
        email_projectId: {
          email: email,
          projectId: projectId,
        },
      },
      select: {
        acceptedAt: true,
      },
    });

    if (isInvited && isInvited.acceptedAt === null) {
      return NextResponse.json(
        {
          error: 'The user has already been invited to this project',
        },
        { status: 409 },
      );
    }

    const members = await prisma.user.findMany({
      where: {
        projectMembers: { some: { projectId: projectId } },
      },
    });

    const memberRole = await prisma.project_Member.findMany({
      where: {
        projectId: projectId,
        userId: {
          in: members.map((member) => member.id),
        },
      },
      select: {
        userId: true,
        role: true,
      },
    });

    const isUserMember = members.find((member) => member.email === email);
    if (isUserMember) {
      return NextResponse.json(
        {
          error: 'This user is already member of this project',
        },
        { status: 400 },
      );
    }

    const { role: currentUserRole } = memberRole.find(
      (member) => member.userId === currentUser?.id,
    ) || {
      role: '',
    };

    if (currentUserRole !== Role.ADMIN) {
      return NextResponse.json(
        {
          error: 'You are not authorized to invite members',
        },
        { status: 403 },
      );
    }

    // generate invite token
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

    // insert invitation to database
    if (!isInvited) {
      await prisma.invitation.create({
        data: {
          email,
          projectId,
          token: inviteToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          invitedById: currentUser.id,
        },
      });
    }

    // get project name
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    // send invite email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER!,

      to: email,

      subject: `Invitation to join to ${project?.name}`,

      html: `   
<button>
      <a
        href="http://localhost:3000/invite?token=${inviteToken}"
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

    return NextResponse.json(
      {
        message: 'Invitation sent',
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
