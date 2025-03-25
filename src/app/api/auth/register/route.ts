import { NextResponse } from 'next/server';
import * as z from 'zod';
import validator from 'validator';
import { hash } from 'bcrypt';

import validation from '@/lib/validation';
import prisma from '@/lib/prisma';

const RegisterSchema = z.object({
  username: z
    .string()
    .max(25)
    .refine((value) => !validator.isEmpty(value), 'Name is required!'),
  phone: z.string().refine((value) => !validator.isEmpty(value), 'Phone Number is required!'),

  password: z
    .string()
    .refine((value) => !validator.isEmpty(value), 'Password is required!')
    .refine(validator.isStrongPassword, 'Enter a strong password!'),
});

type body = {
  username: string;
  phone: string;
  password: string;
};

export async function POST(req: Request) {
  const body: body = await req.json();

  const validationResult = validation(RegisterSchema, body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.message, { status: 400 });
  }

  const { username, phone, password } = body;

  const exists = await prisma.user.findUnique({
    where: {
      phone: body.phone,
    },
  });

  if (exists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        username,
        phone,

        hashedPassword: await hash(password, 10),
      },
    });

    return NextResponse.json(user);
  }
}
