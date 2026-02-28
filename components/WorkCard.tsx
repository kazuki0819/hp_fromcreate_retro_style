'use client';

interface WorkCardProps {
    id: number;
    category: string;
    title: string;
    thumbnail?: string | null;
    videoUrl?: string | null;
    snsPlatform?: 'instagram' | 'tiktok';
    snsAccount?: string;
}

const categoryLabels: Record<string, string> = {
    'corporate-pr': '企業PR動画',
    'mv': 'MV',
    'live': 'LIVE映像',
    'ad': '広告動画',
    'animation': 'アニメーション動画',
    '3dcg': '3DCG動画',
    'youtube': 'YouTube動画',
    'youtube-mgmt': 'YouTube運用',
    'sns-domestic': 'SNS運用（国内）',
    'sns-global': 'SNS運用（海外）',
};

export default function WorkCard({ category, title, thumbnail, videoUrl, snsPlatform, snsAccount }: WorkCardProps) {
    const label = categoryLabels[category] || category;

    return (
        <article
            className="work-card fade-up is-visible"
            tabIndex={0}
            role="button"
            aria-label={`${title}を再生する`}
            onClick={() => {
                if (videoUrl) window.open(videoUrl, '_blank', 'noopener,noreferrer');
            }}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && videoUrl) {
                    e.preventDefault();
                    window.open(videoUrl, '_blank', 'noopener,noreferrer');
                }
            }}
        >
            <div
                className="work-thumb"
                data-category={category}
                style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
                {snsPlatform && (
                    <div className={`sns-thumb-overlay ${snsPlatform}`}>
                        <span className={`sns-thumb-icon ${snsPlatform}`}>
                            {snsPlatform === 'instagram' ? '📷' : '♪'}
                        </span>
                        {snsAccount && (
                            <span className="sns-thumb-account">{snsAccount}</span>
                        )}
                    </div>
                )}
                <span className="work-category">{label}</span>
                <span className="work-play">▶</span>
            </div>
            <div className="work-info">
                <h3>{title}</h3>
            </div>
        </article>
    );
}
