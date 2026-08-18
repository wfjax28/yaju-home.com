/* ============================================================
   野獣邸.com - 非公式ファンサイト
   インタラクション（ナビゲーションメニューの開閉）
   ============================================================ */
(function () {
  'use strict';

  /* ---------- ナビゲーションメニューの開閉処理 ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const menuEl = document.getElementById('site-menu');
  const backdropEl = document.querySelector('.menu-backdrop');

  if (menuBtn) {
    // 現在の開閉状態
    const isOpen = () => menuBtn.classList.contains('is-active');

    // 開閉状態をまとめて切り替える（パネル / ぼかしオーバーレイ / bodyロック）
    const setMenuOpen = (open) => {
      menuBtn.classList.toggle('is-active', open);
      menuBtn.setAttribute('aria-expanded', String(open));

      if (menuEl) {
        menuEl.classList.toggle('is-open', open);
        menuEl.setAttribute('aria-hidden', String(!open));
      }
      if (backdropEl) backdropEl.classList.toggle('is-active', open);

      // menu-open 中は背後を静止画として固定（ブラーの再計算を抑止）
      document.body.classList.toggle('menu-open', open);
    };

    // 開閉ボタン
    menuBtn.addEventListener('click', () => setMenuOpen(!isOpen()));

    // 背後クリックで閉じる
    if (backdropEl) {
      backdropEl.addEventListener('click', () => setMenuOpen(false));
    }

    // メニュー内のリンクをクリックしたら閉じる
    if (menuEl) {
      menuEl.addEventListener('click', (e) => {
        if (e.target.closest('.menu__link')) setMenuOpen(false);
      });
    }

    // Esc キーでも閉じられるように
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) setMenuOpen(false);
    });
  }
})();

const icons = document.querySelectorAll('.card__icon img');

icons.forEach((img) => {
  let vibeId = null;

  // 親要素（.card や .card-link）にホバーした時に発動
  const parentCard = img.closest('.card-link') || img.closest('.card');

  parentCard.addEventListener('mouseenter', () => {
    const loop = () => {
      // 0.7 〜 1.3 の範囲で毎フレーム完全にランダムな縦横比を生成
      const scaleX = (0.7 + Math.random() * 0.6).toFixed(2);
      const scaleY = (0.7 + Math.random() * 0.6).toFixed(2);
      // -20deg 〜 20deg のランダムな回転
      const rotate = (-20 + Math.random() * 40).toFixed(2);

      img.style.transform = `scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`;
      vibeId = requestAnimationFrame(loop);
    };
    loop();
  });

  parentCard.addEventListener('mouseleave', () => {
    if (vibeId) cancelAnimationFrame(vibeId);
    img.style.transform = ''; // 元の形状に戻す
  });
});

  /* ---------- 2. カードの3Dチルト（マウス操作デバイスのみ） ---------- */
  const cards = document.querySelectorAll('.card');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!reduceMotion && finePointer.matches && cards.length) {
    cards.forEach((card) => {
      let rafId = null;
      let transitionTimer = null;
      const glow = card.querySelector('.card__glow');

      // カーソルが入った瞬間だけ一時的にトランジションを有効化
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        if (glow) glow.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';

        // 最初のスムーズな移動が終わったらトランジションを外して、以降のmousemove追従をダイレクトにする
        clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
          card.style.transition = 'none';
          if (glow) glow.style.transition = 'none';
        }, 200); // 0.2s（200ms）後に解除
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
        clearTimeout(transitionTimer);

        // マウスが離れたらトランジションを付与して元に戻す
        card.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';

        if (glow) {
          glow.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          glow.style.transform = '';
        }
      });
    });
  }