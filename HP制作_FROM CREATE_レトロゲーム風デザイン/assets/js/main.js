/**
 * FROM CREATE - Main JavaScript
 */
(function () {
    'use strict';

    // ============================================
    // DOM Ready
    // ============================================
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupNavigation();
        setupCurrentPage();
        setupFadeUp();
        setupWorks();
        setupFilters();
        setupModal();
        setupContactForm();
        setupRetroTyping();
        setupStarCanvas();
    }

    // ============================================
    // Retro Typing Logo Animation
    // ============================================
    function setupRetroTyping() {
        var logo = document.querySelector('.logo');
        if (!logo) return;

        var text = logo.textContent;
        logo.textContent = '';
        logo.style.minWidth = '10ch';

        var i = 0;
        var cursor = document.createElement('span');
        cursor.textContent = '█';
        cursor.style.animation = 'blink 0.5s steps(2) infinite';
        logo.appendChild(cursor);

        function typeChar() {
            if (i < text.length) {
                cursor.before(text.charAt(i));
                i++;
                setTimeout(typeChar, 80 + Math.random() * 60);
            } else {
                // Keep cursor blinking at end
                setTimeout(function() {
                    cursor.style.opacity = '0';
                }, 2000);
            }
        }

        setTimeout(typeChar, 500);
    }

    // ============================================
    // Star Canvas Background (Hero)
    // ============================================
    function setupStarCanvas() {
        var hero = document.querySelector('.hero');
        if (!hero) return;

        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-3';
        canvas.style.pointerEvents = 'none';
        hero.insertBefore(canvas, hero.firstChild);

        var ctx = canvas.getContext('2d');
        var stars = [];
        var STAR_COUNT = 120;
        var colors = ['#00ff41', '#00e5ff', '#ff0090', '#e0e0e0'];

        function resize() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createStars() {
            stars = [];
            for (var s = 0; s < STAR_COUNT; s++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() < 0.8 ? 1 : 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: 0.1 + Math.random() * 0.3,
                    blinkPhase: Math.random() * Math.PI * 2
                });
            }
        }

        function draw(time) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < stars.length; i++) {
                var star = stars[i];
                var alpha = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.001 * star.speed + star.blinkPhase));
                ctx.fillStyle = star.color;
                ctx.globalAlpha = alpha;
                ctx.fillRect(
                    Math.floor(star.x),
                    Math.floor(star.y),
                    star.size,
                    star.size
                );
            }
            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        }

        resize();
        createStars();
        requestAnimationFrame(draw);

        window.addEventListener('resize', function() {
            resize();
            createStars();
        });
    }

    // ============================================
    // Navigation
    // ============================================
    function setupNavigation() {
        const toggle = document.getElementById('navToggle');
        const nav = document.querySelector('.nav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    // ============================================
    // Current Page Indicator
    // ============================================
    function setupCurrentPage() {
        const page = document.body.dataset.page;
        if (!page) return;

        const links = document.querySelectorAll('.nav a, .footer-links a');
        links.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === page + '.html' || (page === 'index' && href === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // ============================================
    // Fade Up Animation
    // ============================================
    function setupFadeUp() {
        const elements = document.querySelectorAll('.fade-up');
        if (!elements.length) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ============================================
    // Works Rendering
    // ============================================
    function setupWorks() {
        const mounts = document.querySelectorAll('[data-works-mount]');
        if (!mounts.length || !window.FROMCREATE_WORKS) return;

        mounts.forEach(function (mount) {
            mountWorks(mount);
        });
    }

    function mountWorks(container, filter) {
        const limit = parseInt(container.dataset.worksLimit) || 0;
        let works = window.FROMCREATE_WORKS || [];

        // Apply filter
        if (filter && filter !== 'all') {
            works = works.filter(function (w) {
                return w.category === filter;
            });
        }

        // Apply limit
        if (limit > 0) {
            works = works.slice(0, limit);
        }

        // Render cards
        container.innerHTML = works.map(function (work) {
            return createWorkCard(work);
        }).join('');

        // Setup card interactions - open video link in new tab
        container.querySelectorAll('.work-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var url = card.dataset.videoUrl;
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var url = card.dataset.videoUrl;
                    if (url) {
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }
                }
            });
        });
    }

    var categoryLabels = {
        'corporate-pr': '企業PR動画',
        'mv': 'MV',
        'live': 'LIVE映像',
        'ad': '広告動画',
        'animation': 'アニメーション動画',
        '3dcg': '3DCG動画',
        'youtube': 'YouTube動画',
        'youtube-mgmt': 'YouTube運用',
        'sns-domestic': 'SNS運用（国内）',
        'sns-global': 'SNS運用（海外）'
    };

    function createWorkCard(work) {
        var label = categoryLabels[work.category] || work.category;
        var thumbStyle = work.thumbnail ? ' style="background-image: url(' + work.thumbnail + '); background-size: cover; background-position: center;"' : '';
        return '<article class="work-card fade-up" data-work-id="' + work.id + '" data-video-url="' + (work.videoUrl || '') + '" tabindex="0" role="button" aria-label="' + work.title + 'を再生する">' +
            '<div class="work-thumb" data-category="' + work.category + '"' + thumbStyle + '>' +
            '<span class="work-category">' + label + '</span>' +
            '<span class="work-play">▶</span>' +
            '</div>' +
            '<div class="work-info">' +
            '<h3>' + work.title + '</h3>' +
            '</div>' +
            '</article>';
    }

    // ============================================
    // Filters
    // ============================================
    function setupFilters() {
        const filterMount = document.querySelector('[data-filters-mount]');
        const worksMount = document.querySelector('[data-works-mount]');

        if (!filterMount || !worksMount) return;

        const categories = ['all', 'corporate-pr', 'mv', 'live', 'ad', 'animation', '3dcg', 'youtube', 'youtube-mgmt', 'sns-domestic', 'sns-global'];
        const labels = {
            'all': 'すべて',
            'corporate-pr': '企業PR動画',
            'mv': 'MV',
            'live': 'LIVE映像',
            'ad': '広告動画',
            'animation': 'アニメーション動画',
            '3dcg': '3DCG動画',
            'youtube': 'YouTube動画',
            'youtube-mgmt': 'YouTube運用',
            'sns-domestic': 'SNS運用（国内）',
            'sns-global': 'SNS運用（海外）'
        };

        // Render filter chips
        filterMount.innerHTML = categories.map(function (cat) {
            const isActive = cat === 'all' ? ' active' : '';
            return '<button class="chip' + isActive + '" data-filter="' + cat + '">' + labels[cat] + '</button>';
        }).join('');

        // Setup filter interactions
        filterMount.querySelectorAll('.chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                // Update active state
                filterMount.querySelectorAll('.chip').forEach(function (c) {
                    c.classList.remove('active');
                });
                chip.classList.add('active');

                // Re-render works
                mountWorks(worksMount, chip.dataset.filter);

                // Re-init fade animation
                setupFadeUp();
            });
        });
    }

    // ============================================
    // Modal
    // ============================================
    function setupModal() {
        const modal = document.getElementById('workModal');
        if (!modal) return;

        const backdrop = modal.querySelector('.modal-backdrop');
        const closeBtn = modal.querySelector('.modal-close');

        // Close on backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        // Close on button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }

    function openWorkModal(workId) {
        const modal = document.getElementById('workModal');
        const titleEl = document.getElementById('modalTitle');
        const bodyEl = document.getElementById('modalBody');

        if (!modal || !titleEl || !bodyEl) return;

        const work = (window.FROMCREATE_WORKS || []).find(function (w) {
            return w.id === parseInt(workId);
        });

        if (!work) return;

        // Populate modal
        titleEl.textContent = work.title;
        bodyEl.innerHTML =
            '<dl>' +
            '<dt>クライアント</dt>' +
            '<dd>' + work.client + '</dd>' +
            '<dt>期間</dt>' +
            '<dd>' + work.period + '</dd>' +
            '<dt>成果物</dt>' +
            '<dd>' + work.deliverable + '</dd>' +
            '<dt>概要</dt>' +
            '<dd>' + work.description + '</dd>' +
            '<dt>工夫した点</dt>' +
            '<dd><ul>' + work.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul></dd>' +
            '</dl>' +
            '<div class="modal-note">※ この実績はサンプル（架空）です。実際のクライアント・プロジェクトではありません。</div>';

        // Show modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Focus management
        modal.querySelector('.modal-close').focus();
    }

    function closeModal() {
        const modal = document.getElementById('workModal');
        if (!modal) return;

        modal.classList.remove('open');
        document.body.style.overflow = '';

        // Return focus to trigger (simplified)
        const activeCard = document.querySelector('.work-card:focus, .work-card[data-work-id]');
        if (activeCard) {
            activeCard.focus();
        }
    }

    // ============================================
    // Contact Form (Demo)
    // ============================================
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show success message
            const successEl = document.createElement('div');
            successEl.className = 'form-success';
            successEl.innerHTML =
                '<h3>送信完了（デモ）</h3>' +
                '<p>これはデモサイトのため、実際には送信されていません。<br>本番環境ではフォームサービスやAPIへ接続してください。</p>';

            form.reset();
            form.parentNode.insertBefore(successEl, form.nextSibling);

            // Hide form
            form.style.display = 'none';

            // Scroll to success message
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

})();
