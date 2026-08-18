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
