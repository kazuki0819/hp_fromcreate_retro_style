import Link from 'next/link';
import { staticWorks, staticBlogPosts } from '@/lib/static-data';
import WorkCard from '@/components/WorkCard';
import RetroEffects from '@/components/RetroEffects';

export default function HomePage() {
  const works = staticWorks.slice(0, 6);
  const latestPosts = staticBlogPosts.filter(p => p.published);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <RetroEffects />
        <div className="hero-content fade-up is-visible">
          <p className="hero-kicker">
            STAGE 1 / START SCREEN
          </p>
          <h1>
            レトロゲームの世界観で魅せる、映像・SNS・コミュニティ運営。
          </h1>
          <p style={{ marginTop: '1rem', color: 'var(--text-dim)' }}>
            映像制作からSNS運用、オンラインコミュニティ運営まで、<br />
            「遊び心」を軸にした発信をサポートします。<br />
            ポートフォリオ感覚で気軽に見てください。
          </p>
          <div className="hero-cta">
            <Link href="#works" className="btn btn-primary">
              PRESS START
            </Link>
            <Link href="/about" className="btn btn-secondary">
              VIEW PROFILE
            </Link>
            <Link href="/service" className="btn btn-ghost">
              サービス詳細 →
            </Link>
          </div>
        </div>
      </section>
      {/* Service */}
      <section className="section">
        <div className="container">
          <header className="section-header fade-up is-visible">
            <p className="section-kicker">STAGE 2 / SERVICE</p>
            <h2>Service</h2>
            <p>映像・SNS・コミュニティを通して、人と企業の可能性を最大化します</p>
          </header>
          <div className="cards-grid">
            <article className="card service-card fade-up is-visible">
              <div className="service-icon">🎬</div>
              <h3>映像制作</h3>
              <p>PR動画・アニメーション・YouTube・SNS縦型動画・MV・広告動画など、目的・ターゲット・活用シーンを踏まえた提案型の映像制作。</p>
            </article>
            <article className="card service-card fade-up is-visible">
              <div className="service-icon">📱</div>
              <h3>SNS運用代行</h3>
              <p>企画・台本制作・撮影・編集・投稿代行・分析まで一貫して対応。成果につながるSNS運用を実現します。</p>
            </article>
            <article className="card service-card fade-up is-visible">
              <div className="service-icon">👥</div>
              <h3>コミュニティ &amp; スクール</h3>
              <p>動画編集者向けコミュニティ運営とAfter Effectsスクール。案件獲得・スキルアップ・横のつながりを提供します。</p>
            </article>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }} className="fade-up is-visible">
            <Link href="/service" className="btn btn-secondary">すべてのサービスを見る →</Link>
          </div>
        </div>
      </section>
      {/* Works */}
      <section id="works" className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container">
          <header className="section-header fade-up is-visible">
            <p className="section-kicker">STAGE 3 / WORKS</p>
            <h2>Works</h2>
            <p>これまで手がけた映像制作の一部をご紹介します</p>
          </header>
          <div className="works-grid">
            {works.map((work) => (
              <WorkCard key={work.id} {...work} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }} className="fade-up is-visible">
            <Link href="/works" className="btn btn-secondary">すべての実績を見る →</Link>
          </div>
        </div>
      </section>

      {/* Strength */}
      <section className="section">
        <div className="container">
          <header className="section-header fade-up is-visible">
            <h2>Strength</h2>
            <p>FR0M CREATEの3つの強み</p>
          </header>
          <div className="strength-list">
            <div className="strength-item fade-up is-visible">
              <h3>実務に強い映像制作チーム</h3>
              <p>単なる「綺麗な動画」ではなく、目的・ターゲット・活用シーンを踏まえた提案型の制作。YouTube、Instagram、TikTok、広告動画、企業PR、MV、アニメーションなど実績多数。</p>
            </div>
            <div className="strength-item fade-up is-visible">
              <h3>大規模フリーランスネットワーク</h3>
              <p>100名以上の動画編集者、カメラマン・アニメーターと連携。案件規模やジャンルに応じて最適なチームを柔軟に編成できる体制があります。</p>
            </div>
            <div className="strength-item fade-up is-visible">
              <h3>クリエイターコミュニティ運営</h3>
              <p>案件獲得・スキルアップ・横のつながりを目的としたコミュニティを運営。教育・仕事・交流を一体化させ、長期的に価値が循環する仕組みを作っています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {latestPosts.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-elevated)' }}>
          <div className="container">
            <header className="section-header fade-up is-visible">
              <p className="section-kicker">STAGE 4 / BLOG</p>
              <h2>Blog</h2>
              <p>最新のお知らせ・ブログ記事</p>
            </header>
            <div className="cards-grid">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card fade-up is-visible" style={{ textDecoration: 'none' }}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <p style={{ fontSize: 'var(--small)', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }} className="fade-up is-visible">
              <Link href="/blog" className="btn btn-secondary">すべての記事を見る →</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="container fade-up is-visible">
          <p className="section-kicker">STAGE 5 / CONTACT</p>
          <h2>まずはお気軽にご相談ください</h2>
          <p>映像で解決したい課題や、制作のイメージをお聞かせください。<br />ヒアリングを通じて最適なプランをご提案します。</p>
          <Link href="/contact" className="btn btn-primary">制作相談をする</Link>
        </div>
      </section>
    </>
  );
}
