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
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
          'perspective(900px) rotateY(' +
          x * 8 +
          'deg) rotateX(' +
          -y * 8 +
          'deg) translateY(-6px)';

        const glow = card.querySelector('.card__glow');
        if (glow) {
          glow.style.transform =
            'translate(' + x * 28 + '%, ' + y * 28 + '%)';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const glow = card.querySelector('.card__glow');
        if (glow) glow.style.transform = '';
      });
    });
  }
})();

