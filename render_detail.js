// 取得網址參數
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 轉換日期格式
function formatDateTime(str) {
  if (!str) return '';
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
  qrcode.style.width = '200px';
  qrcode.style.height = '200px';
  back.appendChild(qrcode);

  inner.appendChild(front);
  inner.appendChild(back);
  container.appendChild(inner);

  // 點擊圖片生成 QRCode
  img.addEventListener('click', () => {
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
  });

  // 點 QRCode 回到圖片
  back.addEventListener('click', () => {
    container.classList.remove('flipped');
  });

  return container;
}

// 主流程
const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
const type = getQueryParam('type') || 'event';
const dataFile = type === 'announcement' ? 'announcements.json' : 'events.json';

fetch(`${basePath}/data/${dataFile}`)
  .then(res => res.json())
  .then(data => {
    const id = getQueryParam('id');
    const item = data.find(e => e.id === id);

    const container = document.getElementById('detail-container');
    if (!item) {
      container.innerHTML = '<p>找不到資料。</p>';
      return;
    }

    document.title = item.title;

    let html = `<h1>~ ${item.title} ~</h1><table>`;

    if (type === 'event') {
      html += `
        <tr><th>活動標籤</th><td>${item.label || ''}</td></tr>
        <tr><th>活動開始</th><td style="color: #66b2ff;">${formatDateTime(item.start)}</td></tr>
        <tr><th>活動結束</th><td style="color:#209751;">${formatDateTime(item.end)}</td></tr>
        <tr><th>截止時間</th><td style="color: #e74c3c;">${formatDateTime(item.deadline)}</td></tr>
        <tr><th>活動地點</th><td>${item.location || ''}</td></tr>
        <tr><th>負責講師</th><td>${item.speaker || ''}</td></tr>
        <tr><th>承辦人員</th><td>${item.host || ''}</td></tr>
        <tr><th>聯絡信箱</th><td>${item.email ? `<a href="mailto:${item.email}">${item.email}</a>` : ''}</td></tr>
        <tr><th>聯絡電話</th><td>${item.phone ? `<a href="tel:${item.phone}">${item.phone}</a>` : ''}</td></tr>
        <tr><th>參與對象</th><td>${item.target || ''}</td></tr>
        <tr><th>活動說明</th><td>${(item.description || '').replace(/\n/g, '<br>')}</td></tr>
        <tr><th>報名連結</th><td>${item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.link}</a>` : ''}</td></tr>
      `;
    } else if (type === 'announcement') {
      html += `
        <tr><th>公告標籤</th><td>${item.label || ''}</td></tr>
        <tr><th>發布對象</th><td>${item.target || ''}</td></tr>
        <tr><th>公告內容</th><td>${(item.description || '').replace(/\n/g, '<br>')}</td></tr>
        <tr><th>備註</th><td>${(item.note || '').replace(/\n/g, '<br>')}</td></tr>
        <tr><th>相關連結</th><td>${item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.link}</a>` : ''}</td></tr>
      `;
    }

    html += '</table>';
    
    html += `
      <div style="text-align:center; font-weight:bold; font-size:18px; margin: 16px 0;">
        點選圖片分享此頁面 QR code
      </div>
    `;
    
    container.innerHTML = html;




    if (type === 'event' && item.cover) {
      const flipCard = setupFlipCard(item);
      container.appendChild(flipCard);
    }
  })
  .catch(error => {
    console.error('載入資料失敗:', error);
    document.getElementById('detail-container').innerHTML = '<p>資料載入失敗。</p>';
  });
