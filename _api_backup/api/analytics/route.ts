import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path, userAgent, referer } = body;
        await prisma.pageView.create({ data: { path, userAgent, referer } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get('days') || '30');
        const since = new Date();
        since.setDate(since.getDate() - days);

        const views = await prisma.pageView.findMany({
            where: { createdAt: { gte: since } },
            orderBy: { createdAt: 'desc' },
        });

        // Aggregate by date
        const byDate: Record<string, number> = {};
        const byPage: Record<string, number> = {};
        const byReferer: Record<string, number> = {};

        views.forEach((v) => {
            const date = v.createdAt.toISOString().split('T')[0];
            byDate[date] = (byDate[date] || 0) + 1;
            byPage[v.path] = (byPage[v.path] || 0) + 1;
            if (v.referer) byReferer[v.referer] = (byReferer[v.referer] || 0) + 1;
        });

        return NextResponse.json({
            total: views.length,
            byDate,
            byPage,
            byReferer,
        });
    } catch {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
