import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'お問い合わせ | FROM CREATE',
    description: 'お問い合わせフォーム準備中',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
