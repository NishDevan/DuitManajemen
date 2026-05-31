'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function registerUser(formData) {
    try {
        const name = formData.name;
        const email = formData.email;
        const password = formData.password;

        if (!name || !email || !password) {
            return { success: false, error: 'Name, email, and password are required!' };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            return { success: false, error: 'Email is already registered!' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });

        return {
            success: true,
            message: 'Account successfully created'
        };

    } catch (error) {
        console.error("Error when registering account: ", error);
        return {
            success: false,
            error: "Something went wrong when creating account."
        }
    }
} 