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
  const MENU_SECTIONS = [
    { label: 'ホーム',        href: './index.html',                          icon: 'picture/are.webp' },
    { label: 'はじめに',      href: 'about.html',                             icon: 'picture/yajuthink.webp' },
    { label: '今日の婬夢',    href: '#disabled',                             icon: 'picture/medikara.webp' },
    { label: 'イベント',      href: '#disabled',                             icon: 'picture/yajuhappy.webp' },
    { label: 'ホモの歴史',    href: '#disabled',                             icon: 'picture/inmukun.webp' },
    { label: 'GO is ????', href:'gois.html', icon:'picture/goface.webp'},
    { label: '拓也の射精 投票円', href:'takusha.html', icon:'picture/takuyahoukou.webp'},

    { label: '野獣邸に参加',  href: 'https://discord.gg/yjsnpi', target: '_blank', rel: 'noopener noreferrer', icon: 'picture/favicon.webp' },
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

  rootEl.innerHTML =
    '<button class="menu-btn" aria-label="メニューを開く" aria-expanded="false" aria-controls="site-menu" aria-haspopup="true">' +
      '<span class="menu-btn__bar"></span>' +
      '<span class="menu-btn__bar"></span>' +
      '<span class="menu-btn__bar"></span>' +
    '</button>' +
    '<nav class="menu" id="site-menu" aria-label="サイトナビゲーション" aria-hidden="true">' +
      '<div class="menu__inner">' +
        '<ul class="menu__list">' + itemsHtml + '</ul>' +
      '</div>' +
      '<p class="menu__logo" aria-hidden="true">野獣邸</p>' +
    '</nav>' +
    '<button class="menu-backdrop" type="button" tabindex="-1" aria-hidden="true"></button>';
})();