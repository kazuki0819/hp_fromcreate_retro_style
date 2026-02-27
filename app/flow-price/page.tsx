import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Flow & Price | FROM CREATE' };

export default function FlowPricePage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="fade-up is-visible">Flow &amp; Price</h1>
                    <p className="fade-up is-visible">制作の流れと料金の考え方</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <header className="section-header fade-up is-visible">
                        <h2>制作フロー</h2>
                        <p>ヒアリングから納品まで、5つのステップで進行します</p>
                    </header>
                    <div className="flow-steps">
                        {[
                            { num: '1', title: 'ヒアリング', desc: '課題・目的・ターゲット・活用シーンをお伺いします。オンラインまたは対面でのミーティングを実施。この段階で概算のお見積もりをご提示することも可能です。' },
                            { num: '2', title: '企画・構成', desc: 'ヒアリング内容をもとに、映像の構成案（シナリオ・絵コンテ）を作成します。この段階でお見積もりを確定し、正式にご発注いただきます。' },
                            { num: '3', title: '撮影準備・ロケハン', desc: '撮影日程の調整、出演者のアサイン、撮影場所の下見（ロケハン）を行います。必要に応じてスタジオの手配やキャスティングも対応可能です。' },
                            { num: '4', title: '撮影・編集', desc: '撮影を実施し、編集作業に入ります。初稿をお見せした後、2〜3回の修正対応を経て完成形に仕上げます。' },
                            { num: '5', title: '納品・運用サポート', desc: '完成した映像データを納品します。納品形式（MP4・MOV・各種SNS最適化版など）はご要望に応じて対応。運用にあたってのアドバイスも可能です。' },
                        ].map((step) => (
                            <div key={step.num} className="flow-step fade-up is-visible">
                                <div className="flow-number">{step.num}</div>
                                <div className="flow-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--bg-elevated)' }}>
                <div className="container">
                    <header className="section-header fade-up is-visible">
                        <h2>料金の考え方</h2>
                        <p>尺ではなく「要素」で価格が決まります</p>
                    </header>
                    <div className="fade-up is-visible" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            映像の料金は「尺（長さ）」だけで決まるものではありません。撮影日数、ロケーション数、出演者の有無、アニメーション・モーショングラフィックスの量など、さまざまな要素で構成されます。
                        </p>
                        <table className="price-table">
                            <thead>
                                <tr><th>サービス</th><th>目安レンジ（税別）</th><th>含まれる内容例</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Shorts / SNS動画</td><td>15万円〜50万円</td><td>企画・撮影1日・編集・縦型最適化</td></tr>
                                <tr><td>VP（企業映像）</td><td>50万円〜150万円</td><td>企画・構成・撮影2日・編集・ナレーション</td></tr>
                                <tr><td>Recruit（採用映像）</td><td>80万円〜200万円</td><td>企画・密着取材・社員インタビュー・編集</td></tr>
                                <tr><td>MV（ミュージックビデオ）</td><td>50万円〜300万円</td><td>企画・ロケ撮影・アーティスト写真・編集</td></tr>
                                <tr><td>Event（イベント撮影）</td><td>30万円〜100万円</td><td>マルチカメラ収録・ダイジェスト編集</td></tr>
                            </tbody>
                        </table>
                        <div className="price-note fade-up is-visible">
                            <h3>料金に影響する要素</h3>
                            <ul>
                                <li><strong>撮影日数</strong>：ロケーション数や出演者スケジュールにより変動</li>
                                <li><strong>出演者</strong>：キャスティング費用、社員出演の場合は別途調整</li>
                                <li><strong>ナレーション</strong>：プロナレーターの起用有無</li>
                                <li><strong>アニメーション</strong>：モーショングラフィックスの量と複雑さ</li>
                                <li><strong>納品形式</strong>：複数バージョン・複数フォーマットの要否</li>
                                <li><strong>修正回数</strong>：標準は2回、追加修正は別途</li>
                            </ul>
                        </div>
                    </div>
                    <div className="price-caution fade-up is-visible">
                        <h4>▸ 取引条件に関するご注意</h4>
                        <ol>
                            <li>① 表示価格は目安であり、正式金額は要件確定後の見積で確定します。</li>
                            <li>② 撮影場所・機材・出演者手配等で追加費用が発生する場合があります。</li>
                            <li>③ 修正回数・納期・キャンセル条件は契約時に書面で確定します。</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container fade-up is-visible">
                    <h2>まずはお気軽にご相談ください</h2>
                    <p>予算感や納期のご相談もお気軽にどうぞ。<br />課題に合わせて最適なプランをご提案します。</p>
                    <Link href="/contact" className="btn btn-primary">制作相談をする</Link>
                </div>
            </section>
        </>
    );
}
