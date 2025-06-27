// 取得網址參數
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 轉換日期格式
function formatDateTime(str) {
  const [yy, mm, dd, hm] = str.split('/');
  return `20${yy}年${mm}月${dd}日 ${hm}`;
}

// 建立翻轉卡片 + QR Code
function setupFlipCard(event) {
  const container = document.createElement('div');
  container.className = 'flip-card';

  const inner = document.createElement('div');
  inner.className = 'flip-inner';

  const front = document.createElement('div');
  front.className = 'flip-front';

  const back = document.createElement('div');
  back.className = 'flip-back';

  const img = document.createElement('img');
  img.src = event.cover;
  img.alt = event.title;
  front.appendChild(img);

  const qrcode = document.createElement('div');
  qrcode.id = 'qrcode';
  qrcode.style.width = '200px';
  qrcode.style.height = '200px';
  back.appendChild(qrcode);

  inner.appendChild(front);
  inner.appendChild(back);
  container.appendChild(inner);

  document.getElementById('detail-container').appendChild(container);

  // 建立 QRCode 的函數
  function generateQRCode() {
    container.classList.add('flipped');
    qrcode.innerHTML = '';
    new QRCode(qrcode, {
      text: window.location.href,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // === 單擊圖片觸發翻轉 ===
  img.addEventListener('click', generateQRCode);

  // 點擊 QR code 翻回圖片
  back.addEventListener('click', () => {
    container.classList.remove('flipped');
  });
}

// 讀取資料並顯示
const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
fetch(`${basePath}/data/events.json`)
  .then(res => res.json())
  .then(data => {
    const id = getQueryParam('id');
    const event = data.find(e => e.id === id);

    if (!event) {
      document.getElementById('detail-container').innerHTML = '<p>找不到活動資料。</p>';
      return;
    }

    document.title = event.title;

    const html = `
      <h1>${event.title}</h1>
      <table>
        <tr><th>活動標籤</th><td>${event.label}</td></tr>
        <tr><th>活動開始</th><td>${formatDateTime(event.start)}</td></tr>
        <tr><th>活動結束</th><td>${formatDateTime(event.end)}</td></tr>
        <tr><th>截止時間</th><td>${formatDateTime(event.deadline)}</td></tr>
        <tr><th>活動地點</th><td>${event.location}</td></tr>
        <tr><th>負責講師</th><td>${event.speaker}</td></tr>
        <tr><th>承辦人員</th><td>${event.host}</td></tr>
        <tr><th>聯絡信箱</th><td><a href="mailto:${event.email}">${event.email}</a></td></tr>
        <tr><th>聯絡電話</th><td><a href="tel:${event.phone}">${event.phone}</a></td></tr>
        <tr><th>參與對象</th><td>${event.target}</td></tr>
        <tr><th>活動說明</th><td>${event.description.replace(/\n/g, '<br>')}</td></tr>
        <tr><th>報名連結</th><td><a href="${event.link}" target="_blank">${event.link}</a></td></tr>
      </table>
    `;

    document.getElementById('detail-container').innerHTML = html;

    // 插入圖片卡片並啟用翻面功能
    setupFlipCard(event);
  })
  .catch(error => {
    console.error('載入活動資料失敗:', error);
    document.getElementById('detail-container').innerHTML = '<p>資料載入失敗。</p>';
  });
