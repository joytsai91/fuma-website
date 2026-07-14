/* 天麗行館 LINE OA 智能客服 — 互動 DEMO */
(function () {
  const BOOK = 'https://www.booking-owlnest.com/monohostel';

  const scenarios = [
    {
      tag: '情境 1', title: '離峰時段自動接單',
      userTime: '02:47', botTime: '02:47',
      user: '6/17 到 6/19，一個人，有空房嗎？',
      bot: `有的！6/17–6/19 單人入住，推薦『雙床房（有浴缸）』<b>NT$1,800/晚（含早餐）</b>，目前還有空房。要直接訂的話點這裡就幫您把日期帶好了（人數再麻煩您於頁面選擇）
      <a class="book-link" href="${BOOK}?start=2026-06-17&end=2026-06-19" target="_blank" rel="noopener">立即訂房</a>
      <span class="note">採浮動房價，房況與最終金額以結帳頁為準，截至 6/11 23:11</span>`,
      caption: '深夜無人顧櫃檯，機器人照樣即時回覆並附上帶好日期的訂房連結，把當下的詢問留住。'
    },
    {
      tag: '情境 2', title: '模糊需求引導成交',
      userTime: '11:20', botTime: '11:20',
      user: '這週末兩個人想住一晚。',
      bot: `這週末是 6/13（六）入住、6/14（日）退對嗎？兩位推薦『雙床房（有浴缸）』週末價 <b>NT$2,400/晚（含早）</b>，已幫您把日期帶好了，點這直接訂
      <a class="book-link" href="${BOOK}?start=2026-06-13&end=2026-06-14" target="_blank" rel="noopener">立即訂房</a>
      若想週五先到，6/12（五）那晚同為 NT$2,400
      <a class="book-link" href="${BOOK}?start=2026-06-12&end=2026-06-14" target="_blank" rel="noopener">改訂 6/12–6/14</a>`,
      caption: '「這週末」這類模糊說法，機器人主動換算出明確日期並備好方案，減少來回確認。'
    },
    {
      tag: '情境 3', title: '彈性日期主動推薦',
      userTime: '15:03', botTime: '15:03',
      user: '6 月下旬想找兩晚，哪幾天還有房？',
      bot: `6 月下旬幫您掃了一輪，這幾段『雙床房（有浴缸）』兩晚都還有房、而且是這陣子最划算的平日價 <b>NT$1,800/晚</b>：
      <ul>
        <li>6/22–6/24 <a class="book-link" href="${BOOK}?start=2026-06-22&end=2026-06-24" target="_blank" rel="noopener">訂這段</a></li>
        <li>6/24–6/26 <a class="book-link" href="${BOOK}?start=2026-06-24&end=2026-06-26" target="_blank" rel="noopener">訂這段</a></li>
        <li>6/28–6/30 <a class="book-link" href="${BOOK}?start=2026-06-28&end=2026-06-30" target="_blank" rel="noopener">訂這段</a></li>
      </ul>
      <span class="note">提醒：6/26–6/28 那兩晚因為是熱門日，約 NT$2,400/晚，會比上面幾段貴一些喔。</span>`,
      caption: '客人日期有彈性時，機器人主動把仍有空房、想優先去化的日期整段推送過去。'
    },
    {
      tag: '情境 4', title: '方案比較與加購引導',
      userTime: '19:44', botTime: '19:44',
      user: '6/20 入住，住 2 晚或 3 晚都可以，哪個划算？',
      bot: `兩個方案都有房（雙床房（有浴缸））： 2 晚（6/20–6/22）NT$4,200；3 晚（6/20–6/23）NT$6,000。
      多住的那晚只要 NT$1,800，等於把平均拉低到每晚約 <b>NT$2,000</b>、比 2 晚方案每晚省約 NT$100。多住一晚更划算喔
      <a class="book-link" href="${BOOK}?start=2026-06-20&end=2026-06-23" target="_blank" rel="noopener">訂 3 晚</a>
      <a class="book-link" href="${BOOK}?start=2026-06-20&end=2026-06-22" target="_blank" rel="noopener">訂 2 晚</a>`,
      caption: '在不施加壓力的前提下比較方案，自然引導多住一晚，拉高客單價又保留選擇權。'
    },
    {
      tag: '情境 5', title: '團體訂單的處理與轉接',
      userTime: '09:12', botTime: '09:12',
      user: '我們 6 個人，6/24–6/26。',
      bot: `6 位入住 6/24–6/26 沒問題！可以用『家庭四人房（有浴缸）＋雙床房（有浴缸）』湊滿 6 人，兩晚合計約 <b>NT$5,500</b>。已幫您把訂房頁帶好日期（6 人配房再由我們協助）
      <a class="book-link" href="${BOOK}?start=2026-06-24&end=2026-06-26" target="_blank" rel="noopener">立即訂房</a>
      團體想談優惠或需協助配房，可直接幫您轉接櫃台，留個電話即可 📞`,
      caption: '高金額、配房複雜的團體訂單，機器人先收集好資訊，再轉真人接手，避免訂錯。'
    },
    {
      tag: '情境 6', title: '指定房型售完時的替代方案',
      userTime: '13:26', botTime: '13:26',
      user: '6/17–6/19 兩位，想訂『雙床房（無浴缸）』，要三間。',
      bot: `不好意思，『雙床房（無浴缸）』這幾天只剩 2 間、第 3 間剛好額滿 😥 不過同日期同樣兩人房、還很多空房的選擇有：
      <ul>
        <li>雙床房（有浴缸） NT$1,800/晚（多了浴缸更舒適）<a class="book-link" href="${BOOK}?start=2026-06-17&end=2026-06-19" target="_blank" rel="noopener">訂這段</a></li>
        <li>一大床雙人房（有浴缸） NT$2,000/晚 <a class="book-link" href="${BOOK}?start=2026-06-17&end=2026-06-19" target="_blank" rel="noopener">訂這段</a></li>
      </ul>
      要不要先看看這兩個？我可以直接幫您把 6/17–6/19、兩人帶好。`,
      caption: '指定房型剛好售完時不只回「沒有了」，而是主動推薦同日期的替代房型，留住客人。'
    },
    {
      tag: '情境 7', title: '多語自動接待',
      userTime: '22:05', botTime: '22:05',
      user: 'Any beds for 2 people, June 17 to 19?',
      bot: `<span class="note" style="margin-top:0;display:block;">（自動偵測為英文，切換語言回覆）</span>
      Yes! For Jun 17–19 we have a Twin Room (with bathtub) at <b>NT$1,800/night</b> (breakfast included), and it's available. Book here
      <a class="book-link" href="${BOOK}?start=2026-06-17&end=2026-06-19&lang=en" target="_blank" rel="noopener">Reserve</a>
      <span class="note">Price is dynamic; final rate shown at checkout, as of Jun 11.</span>`,
      caption: '外籍旅客詢問時自動切換英文回覆，訂房連結也同步切到對應語系，延伸多語櫃台量能。'
    },
  ];

  const listEl = document.getElementById('scenarioList');
  const bodyEl = document.getElementById('lineBody');
  const captionEl = document.getElementById('scenarioCaption');
  const replayBtn = document.getElementById('replayBtn');

  let current = 0;
  let playToken = 0;

  scenarios.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'scenario-btn';
    btn.innerHTML = `<div class="s-tag">${s.tag}</div><div class="s-title">${s.title}</div>`;
    btn.addEventListener('click', () => selectScenario(i));
    listEl.appendChild(btn);
  });

  function selectScenario(i) {
    current = i;
    [...listEl.children].forEach((b, idx) => b.classList.toggle('active', idx === i));
    play(i);
  }

  function play(i) {
    const token = ++playToken;
    const s = scenarios[i];
    bodyEl.innerHTML = '';
    captionEl.innerHTML = `<div class="cap-title">${s.tag}｜${s.title}</div><div class="cap-desc">${s.caption}</div>`;

    // user bubble
    const userRow = document.createElement('div');
    userRow.className = 'bubble-row user';
    userRow.innerHTML = `<div class="bubble">${s.user}</div>`;
    bodyEl.appendChild(userRow);
    bodyEl.scrollTop = bodyEl.scrollHeight;

    // typing indicator
    setTimeout(() => {
      if (token !== playToken) return;
      const typingRow = document.createElement('div');
      typingRow.className = 'typing-row';
      typingRow.id = 'typingRow';
      typingRow.innerHTML = `<div class="avatar-sm">天</div><div class="typing-dots"><span></span><span></span><span></span></div>`;
      bodyEl.appendChild(typingRow);
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }, 500);

    // bot bubble
    setTimeout(() => {
      if (token !== playToken) return;
      const typingRow = document.getElementById('typingRow');
      if (typingRow) typingRow.remove();
      const botRow = document.createElement('div');
      botRow.className = 'bubble-row bot';
      botRow.innerHTML = `<div class="avatar-sm">天</div><div class="bubble">${s.bot}</div>`;
      bodyEl.appendChild(botRow);
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }, 1650);
  }

  replayBtn.addEventListener('click', () => play(current));

  selectScenario(0);
})();
