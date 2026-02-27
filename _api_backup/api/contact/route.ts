import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, company, type, deadline, budget, message } = body;

        if (!name || !email || !type || !message) {
            return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 });
        }

        const contact = await prisma.contact.create({
            data: { name, email, company, type, deadline, budget, message },
        });

        // In production, send email notification here
        console.log('📩 New contact submission:', contact.id);

        return NextResponse.json({ success: true, id: contact.id });
    } catch {
        return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(contacts);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;
        const contact = await prisma.contact.update({
            where: { id },
            data: { status },
        });
        return NextResponse.json(contact);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}
