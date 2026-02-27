import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    const where: Record<string, unknown> = {};
    if (published !== 'all') where.published = true;

    const posts = await prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const post = await prisma.blogPost.create({ data: body });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...data } = body;
        const post = await prisma.blogPost.update({ where: { id }, data });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id') || '');
        await prisma.blogPost.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
    }
}
