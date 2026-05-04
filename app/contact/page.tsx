'use client';

import Link from 'next/link';

export default function ContactComingSoonPage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                padding: '2rem',
                textAlign: 'center',
                fontFamily: 'var(--font)',
            }}
        >
            <h1
                style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    color: 'var(--accent)',
                    letterSpacing: '0.3em',
                    textShadow: '0 0 8px var(--accent-glow), 0 0 16px var(--accent-glow)',
                    margin: 0,
                }}
            >
                FROM CREATE
            </h1>

            <div
                style={{
                    width: '80%',
                    maxWidth: '400px',
                    height: '2px',
                    background: 'var(--accent)',
                    boxShadow: '0 0 6px var(--accent-glow)',
                    margin: '1.5rem 0',
                }}
            />

            <p
                style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.2em',
                    margin: 0,
                }}
            >
                CONTACT FORM
            </p>

            <p
                style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: 'var(--accent2)',
                    letterSpacing: '0.25em',
                    textShadow: '0 0 8px var(--accent2-glow)',
                    marginTop: '2.5rem',
                }}
            >
                COMING SOON
            </p>

            <Link
                href="/"
                style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    letterSpacing: '0.15em',
                    marginTop: '3rem',
                    padding: '0.5rem 1rem',
                    transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--bg)';
                    e.currentTarget.style.background = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                {'> RETURN TO TITLE '}
                <span
                    style={{
                        animation: 'cursorBlink 1s steps(1) infinite',
                    }}
                >
                    _
                </span>
            </Link>

            <style>{`
                @keyframes cursorBlink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
