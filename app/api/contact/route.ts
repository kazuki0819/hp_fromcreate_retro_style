import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not configured');
        return NextResponse.json({ error: 'サーバー設定エラー' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'リクエストの形式が正しくありません' }, { status: 400 });
    }

    const { name, email, company, type, deadline, budget, message } = body as {
        name?: string;
        email?: string;
        company?: string;
        type?: string;
        deadline?: string;
        budget?: string;
        message?: string;
    };

    if (!name || !email || !type || !message) {
        return NextResponse.json({ error: '必須項目を入力してください' }, { status: 400 });
    }

    if (!email.includes('@')) {
        return NextResponse.json({ error: 'メールアドレスの形式が正しくありません' }, { status: 400 });
    }

    const TYPE_LABELS: Record<string, string> = {
        corporate: '企業映像（Corporate Video）',
        recruit: '採用映像（Recruit Video）',
        shorts: 'SNS動画（Shorts）',
        event: 'イベント撮影（Event）',
        mv: 'ミュージックビデオ（MV）',
        other: 'その他',
    };

    const BUDGET_LABELS: Record<string, string> = {
        under50: '50万円未満',
        '50-100': '50〜100万円',
        '100-200': '100〜200万円',
        '200-500': '200〜500万円',
        over500: '500万円以上',
        undecided: '未定・相談したい',
    };

    const typeLabel = TYPE_LABELS[type] || type;
    const budgetLabel = budget ? (BUDGET_LABELS[budget] || budget) : '(未入力)';

    try {
        await resend.emails.send({
            from: 'FROM CREATE HP <noreply@fromcreate.com>',
            to: 'fr0m.create2024@gmail.com',
            replyTo: email,
            subject: `【HP問い合わせ】${name}様より（${typeLabel}）`,
            text: `
FROM CREATE HP のお問い合わせフォームから新しい問い合わせがありました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${name}

■ メールアドレス
${email}

■ 会社名
${company || '(未入力)'}

■ 問い合わせ種別
${typeLabel}

■ 希望納期
${deadline || '(未入力)'}

■ 予算
${budgetLabel}

■ お問い合わせ内容
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
このメールは FROM CREATE HP のお問い合わせフォームから自動送信されています。
返信される場合は、そのまま「返信」を押すと送信者のメールアドレスに返信できます。`.trim(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Resend email send failed:', error);
        return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
    }
}
