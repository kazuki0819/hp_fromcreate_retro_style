import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');

    const where: Record<string, unknown> = {};
    if (category && category !== 'all') where.category = category;
    if (published !== 'all') where.published = true;

    const works = await prisma.work.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(works);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const work = await prisma.work.create({ data: body });
        return NextResponse.json(work);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...data } = body;
        const work = await prisma.work.update({ where: { id }, data });
        return NextResponse.json(work);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id') || '');
        await prisma.work.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}
