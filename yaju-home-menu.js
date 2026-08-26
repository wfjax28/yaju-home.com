/* ============================================================
   野獣邸.com グローバルナビゲーションメニュー（単一ソース）
   ============================================================
   ・このファイルだけで全ページ共通のメニューを一元管理する。
   ・各HTMLのヘッダー直後に <div id="site-menu-root"></div> を置き、
     ここで生成した <nav> を挿入する。
   ・メニューの項目を変更するときは、下の `MENU_SECTIONS` を編集するだけで
     全てのページに反映される。
   ※ このファイルは HTML内で yaju-home-com.js より先に読み込むこと。
      (メニュー開閉ロジックが後続の yaju-home-com.js にあるため)
   ============================================================ */
(function () {
  'use strict';

  // 挿入先コンテナ（無ければ何もしない）
  const rootEl = document.getElementById('site-menu-root');
  if (!rootEl) return;

  // ---- ここがメニュー項目の単一ソース ---- ※複数ページ共通 #disabled は無効項目ゾ！
   // 本サイト実装時は https://yaju-home.com/ のリンクに書き換えてクレメンス
  const MENU_SECTIONS = [
    { label: 'ホーム',   href: 'https://wfjax28.github.io/yaju-home.com/',   icon: './picture/are.webp' },
    { label: 'はじめに',   href: 'https://wfjax28.github.io/yaju-home.com/welcome/',   icon: './picture/yajuthink.webp' },
    { label: '今日の婬夢',   href: 'https://wfjax28.github.io/yaju-home.com/todays/todays.html',   icon: './picture/medikara.webp' },
    { label: 'イベント',   href: 'https://wfjax28.github.io/yaju-home.com/events',   icon: './picture/yajuhappy.webp' },
    { label: 'ホモの歴史',   href: 'https://wfjax28.github.io/yaju-home.com/history/',   icon: './picture/inmukun.webp' },
    { label: '投票して♡',   href: 'https://wfjax28.github.io/yaju-home.com/votes/',   icon: './picture/are.webp'},

    { label: '野獣邸に参加',  href: 'https://discord.gg/yjsnpi', target: '_blank', rel: 'noopener noreferrer', icon: '/picture/favicon.webp' },
  ];

  // 項目のHTML組み立て（href='#disabled' は無効項目として描画）
  // ※ 元の静的なメニューHTMLをそのまま再現する。
  const itemsHtml = MENU_SECTIONS.map((item) => {
    if (item.href === '#disabled') {
      return (
        '<li class="menu__item"><a class="menu__link" href="javascript:void(0)" aria-disabled="true">' +
        '<img class="menu__icon" src="' + item.icon + '" alt="" aria-hidden="true">' + item.label + '</a></li>'
      );
    }
    const targetAttr = item.target ? ' target="' + item.target + '"' : '';
    const relAttr = item.rel ? ' rel="' + item.rel + '"' : '';
    return (
      '<li class="menu__item"><a class="menu__link" href="' + item.href + '"' + targetAttr + relAttr + '>' +
      '<img class="menu__icon" src="' + item.icon + '" alt="" aria-hidden="true">' + item.label + '</a></li>'
    );
  }).join('');

  // ---- ※ここから追記 ----
  const hidden = '/meinpe-gi.html';
  const moments = [[11, 45], [19, 19], [8, 10]];
  let hiddenAdded = false;
  const hd = (href) =>
    '<li class="menu__item"><a class="menu__link" href="' + href + '">' +
    '<img class="menu__icon" src="/picture/favicon.webp" alt="" aria-hidden="true">ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？</a></li>';

  const now = new Date();
  const isMoment = moments.some(([hh, mm]) => now.getHours() === hh && now.getMinutes() === mm);
  const extra = isMoment ? hd(hidden) : '';
  hiddenAdded = isMoment;
  // ---- ※追記ここまで ----

  rootEl.innerHTML =
    '<button class="menu-btn" aria-label="メニューを開く" aria-expanded="false" aria-controls="site-menu" aria-haspopup="true">' +
      '<span class="menu-btn__bar"></span>' +
      '<span class="menu-btn__bar"></span>' +
      '<span class="menu-btn__bar"></span>' +
    '</button>' +
    '<nav class="menu" id="site-menu" aria-label="サイトナビゲーション" aria-hidden="true">' +
      '<div class="menu__inner">' +
        '<ul class="menu__list">' + itemsHtml + extra + '</ul>' +
      '</div>' +
      '<p class="menu__logo" aria-hidden="true">野獣邸</p>' +
    '</nav>' +
    '<button class="menu-backdrop" type="button" tabindex="-1" aria-hidden="true"></button>';

  // ---- ※追記 ----
  window.addEventListener('keydown', function (e) {
    if (e.shiftKey && e.code === 'Enter' && !hiddenAdded) {
      hiddenAdded = true;
      const list = rootEl.querySelector('.menu__list');
      if (list) list.insertAdjacentHTML('beforeend', hd(hidden));
    }
  }, true);
  // ---- ※追記ここまで ----
})();
