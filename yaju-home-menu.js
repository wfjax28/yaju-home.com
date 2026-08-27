/* ============================================================
   野獣邸.com グローバルナビゲーションメニュー（単一ソース）
   ============================================================ */
(function () {
  'use strict';

  // 挿入先コンテナ（無ければ何もしない）
  const rootEl = document.getElementById('site-menu-root');
  if (!rootEl) return;

  // ------------------------------------------------------------
  // 【自動ルートパス解決】
  // JSファイルの場所からプロジェクトのルートURLを自動判定します
  // ------------------------------------------------------------
  const currentScriptSrc = document.currentScript ? document.currentScript.src : location.href;
  const scriptUrl = new URL(currentScriptSrc);
  
  // JSがルート直下に配置されている前提（./）
  const BASE_URL = new URL('./', scriptUrl).href;

  // 動的パス変換関数
  function resolveUrl(path) {
    if (!path || /^(https?:)?\/\//.test(path)) return path;
    const cleanPath = path.replace(/^(\.\/|\/)+/, '');
    return new URL(cleanPath, BASE_URL).href;
  }

  // ---- メニュー項目の単一ソース ----
  // ドメイン名（https://...）は入れず、ルートからの相対指定に修正済み
  const MENU_SECTIONS = [
    { label: 'ホーム',       href: 'index.html',                   icon: 'picture/are.webp' },
    { label: 'はじめに',     href: 'welcome/',           icon: 'picture/yajuthink.webp' },
    { label: '今日の淫夢',   href: 'todays/', icon: 'picture/medikara.webp' },
    { label: 'イベント',     href: 'events/',            icon: 'picture/yajuhappy.webp' },
    { label: 'ホモの歴史',   href: 'history/',           icon: 'picture/inmukun.webp' },
    { label: '投票して♡',   href: 'votes/',             icon: 'picture/dokatasuit.webp' },

    { label: '野獣邸に参加', href: 'https://discord.gg/yjsnpi', target: '_blank', rel: 'noopener noreferrer', icon: 'picture/favicon.webp' },
  ];

  // 項目のHTML組み立て
  const itemsHtml = MENU_SECTIONS.map((item) => {
    const finalHref = resolveUrl(item.href);
    const finalIcon = resolveUrl(item.icon);

    if (item.href === '#disabled') {
      return (
        '<li class="menu__item"><a class="menu__link" href="javascript:void(0)" aria-disabled="true">' +
        '<img class="menu__icon" src="' + finalIcon + '" alt="" aria-hidden="true">' + item.label + '</a></li>'
      );
    }
    const targetAttr = item.target ? ' target="' + item.target + '"' : '';
    const relAttr = item.rel ? ' rel="' + item.rel + '"' : '';
    return (
      '<li class="menu__item"><a class="menu__link" href="' + finalHref + '"' + targetAttr + relAttr + '>' +
      '<img class="menu__icon" src="' + finalIcon + '" alt="" aria-hidden="true">' + item.label + '</a></li>'
    );
  }).join('');

  // ---- メニュー制御 ----
  const hidden = resolveUrl('meinpe-gi.html');
  const hiddenIcon = resolveUrl('picture/favicon.webp');
  const moments = [[11, 45], [19, 19], [8, 10]];
  let hiddenAdded = false;

  const hd = (href) =>
    '<li class="menu__item"><a class="menu__link" href="' + href + '">' +
    '<img class="menu__icon" src="' + hiddenIcon + '" alt="" aria-hidden="true">ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？ハギャぎ！？</a></li>';

  const now = new Date();
  const isMoment = moments.some(([hh, mm]) => now.getHours() === hh && now.getMinutes() === mm);
  const extra = isMoment ? hd(hidden) : '';
  hiddenAdded = isMoment;

  // DOM生成
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

  // キーショートカット処理
  window.addEventListener('keydown', function (e) {
    if (e.shiftKey && e.code === 'Enter' && !hiddenAdded) {
      hiddenAdded = true;
      const list = rootEl.querySelector('.menu__list');
      if (list) list.insertAdjacentHTML('beforeend', hd(hidden));
    }
  }, true);


})();