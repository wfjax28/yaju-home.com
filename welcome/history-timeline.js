/* ============================================================
   野獣邸.com - ホモの歴史 タイムライン
   ------------------------------------------------------------
   ★ 書き方：
     HISTORY 配列に { year, date, title, text, tag } を
     追記するだけで、自動的にタイムラインへ反映されます。
     ・year : 年（フィルタボタンの生成に使われる）
     ・date : 日付表示（自由文字列）
     ・title: 見出し
     ・text : 説明文
     ・tag  : 分類ラベル（省略可）
   ============================================================ */
(function () {
  'use strict';

    /* ---------- ★ 履歴データ（ここに追記するだけ） ----------
     date は 'YYYY/MM/DD' 形式。月フィルタのキーは YYYY/MM 部分から自動抽出。
     year は補助的に使えるが必須ではない。 */
  const HISTORY = [
    { date: '2024/12/01', title: '野獣邸', text: '11時45分14秒にサーバーが公開。1時間もせずホモの数が100人を突破。ホモはよく群れる', tag: '野獣邸' },
    { date: '2024/12/02', title: 'マイクラ鯖1期開始', text: '野獣邸マイクラ鯖が統合版Realmsで開始。やっぱ好きなんすねぇ', tag: 'マイクラ' },
    { date: '2024/12/05', title: '810人突破', text: 'メンバー数が810人を突破。', tag: '野獣邸' },
    { date: '2025/01/05', title: 'マイクラ鯖2期消滅&3期開始', text: 'マイクラ鯖3期が公開。2期は消滅。', tag: 'マイクラ' },
    { date: '2025/02/12', title: '第1回野獣邸クイズ大会', text: '野獣邸で第1回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2025/02/20', title: '第2回野獣邸クイズ大会', text: '野獣邸で第2回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2025/04/05', title: '第3回野獣邸クイズ大会', text: '野獣邸で第3回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2025/04/14', title: 'マイクラ鯖3期一時停止&4期開始', text: 'マイクラ鯖4期が開始。3期は一時停止。', tag: 'マイクラ' },
    { date: '2025/06/02', title: 'マイクラ鯖3期復活', text: '3期が復活し、4期と並行してプレイできるように。', tag: 'マイクラ' },
    { date: '2025/07/12', title: '第4回野獣邸クイズ大会', text: '野獣邸で第4回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2025/08/10', title: '第5回野獣邸クイズ大会', text: '野獣邸で第5回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2025/10/31', title: 'マイクラ鯖洞窟ワールド開始', text: 'マイクラ鯖期間限定洞窟ワールドが開始。', tag: 'マイクラ' },
    { date: '2025/12/01', title: 'マイクラ鯖洞窟ワールド終了', text: 'マイクラ鯖期間限定洞窟ワールドが終了。', tag: 'マイクラ' },
    { date: '2026/08/10', title: '第6回野獣邸クイズ大会', text: '野獣邸で第6回クイズ大会が開催される。', tag: '野獣邸' },
    { date: '2026/08/10', title: 'yaju-home.com 取得 & ベータ版公開', text: '野獣邸の非公式サイト yaju-home.com を取得。', tag: 'Web' },
  ];

  /* ---------- 描画先・状態 ---------- */
  const root = document.getElementById('timeline-root');
  if (!root) return;

  const filterBar = document.getElementById('timeline-filter');
  let currentKey = 'all';

  /* ---------- 月キーを抽出（古い順・重複なし） ---------- */
  const keys = [...new Set(HISTORY.map((h) => h.date.slice(0, 7)))].sort();

  /* ---------- フィルタボタン生成 ---------- */
  function buildFilterButtons() {
    const labels = [['all', '全て'], ...keys.map((k) => [k, k])];
    filterBar.innerHTML = '';
    labels.forEach(([value, label]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tl-filter__btn' + (value === currentKey ? ' is-active' : '');
      btn.textContent = label;
      btn.dataset.key = value;
      btn.setAttribute('aria-pressed', String(value === currentKey));
      btn.addEventListener('click', () => {
        currentKey = value;
        buildFilterButtons();
        render();
      });
      filterBar.appendChild(btn);
    });
  }

  /* ---------- タイムライン本体の描画 ---------- */
  function render() {
    const items =
      currentKey === 'all'
        ? HISTORY
        : HISTORY.filter((h) => h.date.slice(0, 7) === currentKey);

    root.innerHTML = '';

    items.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = 'tl-item' + (i % 2 ? ' tl-item--right' : '');

      // 年代ドット
      const dot = document.createElement('span');
      dot.className = 'tl-item__dot';
      dot.setAttribute('aria-hidden', 'true');

      // カード
      const card = document.createElement('article');
      card.className = 'tl-card';
      // 交互に少し遅れて動くことで「カスケード」感を出す
      card.style.animationDelay = (i * 60) + 'ms';

      const meta = document.createElement('p');
      meta.className = 'tl-card__meta';
      const time = document.createElement('time');
      time.textContent = item.date;
      meta.appendChild(time);
      if (item.tag) {
        const tag = document.createElement('span');
        tag.className = 'tl-card__tag';
        tag.textContent = item.tag;
        meta.appendChild(tag);
      }

      const title = document.createElement('h3');
      title.className = 'tl-card__title';
      title.textContent = item.title;

      const text = document.createElement('p');
      text.className = 'tl-card__text';
      text.textContent = item.text;

      card.append(meta, title, text);
      li.append(dot, card);
      root.appendChild(li);
    });

    // 描画し直したのでスクロール監視を再登録
    observeItems();
  }

  /* ---------- スクロール連動アニメーション ---------- */
  // ビューポートに入った項目をカスケードでフェードイン。
  // prefers-reduced-motion 環境では共通CSSにより即時表示になる。
  let observer = null;

  function observeItems() {
    const items = root.querySelectorAll('.tl-item:not(.is-visible)');
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
          updateProgressLine();
        },
        { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
      );
    }
    items.forEach((el) => observer.observe(el));
    updateProgressLine();

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function onScroll() {
    if (!onScroll._pending) {
      onScroll._pending = true;
      requestAnimationFrame(() => {
        onScroll._pending = false;
        updateProgressLine();
      });
    }
  }

  // 読み進めた分だけ縦ラインが「バネっと」伸びる（scaleY トランジション）
  function updateProgressLine() {
    const line = document.querySelector('.tl-progress');
    if (!line || !root) return;

    const rect = root.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const ratio = Math.min(1, Math.max(0, (viewportH*0.7-rect.top) / rect.height));
    line.style.transform = 'scaleY(' + ratio + ')';
  }    

  /* ---------- 初期化 ---------- */
  buildFilterButtons();
  render();
})();
