/* ============================================================
   野獣邸.com - 非公式ファンサイト
   インタラクション（スクロール演出 / カード3Dチルト）
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. スクロール連動のリビール ---------- */
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 2. カードの3Dチルト（マウス操作デバイスのみ）←重いから消す ---------- */
const cards = document.querySelectorAll('.card');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!reduceMotion && finePointer.matches && cards.length) {
    cards.forEach((card) => {
      let rafId = null;
      const glow = card.querySelector('.card__glow');

      // ホバー開始時にCSSトランジションをオフ（即座にカーソルへ追従させるため）
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
        if (glow) glow.style.transition = 'none';
      });

      card.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);

        // フレーム同期で描画をスムーズに
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          card.style.transform =
            'perspective(900px) rotateY(' +
            x * 8 +
            'deg) rotateX(' +
            -y * 8 +
            'deg) translateY(-6px)';

          if (glow) {
            glow.style.transform =
              'translate(' + x * 28 + '%, ' + y * 28 + '%)';
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);

        // トランジションを元に戻し、スムーズに初期位置へ復帰
        card.style.transition = '';
        card.style.transform = '';

        if (glow) {
          glow.style.transition = '';
          glow.style.transform = '';
        }
      });
    });
  }
})();
