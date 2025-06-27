// === 取得 base path ===
const basePath = window.location.pathname.split('/').slice(0, -1).join('/');

// === 工具：轉換日期 ===
function formatDateOnly(str) {
  if (!str) return '';
  const parts = str.split('/');
  if (parts.length < 3) return '';
  const [yy, mm, dd] = parts;
  const yyyy = 2000 + parseInt(yy, 10);
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  const weekdayMap = ['日', '一', '二', '三', '四', '五', '六'];
  const wday = weekdayMap[dateObj.getDay()];
  return `${mm}/${dd}（${wday}）`;
}

function getStatusClass(label) {
  if (label === '新') return 'new';
  if (label === '報名中') return 'open';
  if (label === '已過期') return 'expired';
  return '';
}

// === 活動 ===
fetch(`${basePath}/data/events.json`)
  .then(response => response.json())
  .then(data => {
    const slider = document.getElementById('slider');
    const list = document.getElementById('event-list');

    function parseStartTime(str) {
      const parts = str.split('/');
      if (parts.length !== 4) return 0;
      const [yy, mm, dd] = parts;
      const [hh, min] = parts[3].split(':');
      const yyyy = 2000 + parseInt(yy, 10);
      return new Date(`${yyyy}-${mm}-${dd}T${hh}:${min}:00`).getTime();
    }

    data.sort((a, b) => {
      const timeA = parseStartTime(a.start);
      const timeB = parseStartTime(b.start);
      if (timeA !== timeB) return timeB - timeA;
      return String(a.id ?? '').localeCompare(String(b.id ?? ''), 'zh-Hant', { numeric: true });
    });

    data.forEach((event, i) => {
      const eventId = encodeURIComponent(event.id || i);
      const type = 'event';

      // Slide card
      const img = new Image();
      img.src = event.cover;
      img.alt = event.title;

      const slide = document.createElement('div');
      slide.className = `slide ${getStatusClass(event.label)}`;

      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';

      const link = document.createElement('a');
      link.href = `detail.html?id=${eventId}&type=${type}`;
      link.appendChild(img);
      wrapper.appendChild(link);

      const tag = document.createElement('span');
      tag.className = `tag ${getStatusClass(event.label)}`;
      tag.textContent = event.label;

      slide.appendChild(tag);
      slide.appendChild(wrapper);
      slider.appendChild(slide);

      // List row
      const li = document.createElement('li');
      li.className = 'row';

      li.innerHTML = `
        <div class="title">
          <a href="detail.html?id=${eventId}&type=${type}">${event.title}</a>
        </div>
        <div class="date">${formatDateOnly(event.start)}</div>
        <div class="label ${getStatusClass(event.label)}">${event.label}</div>
      `;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('載入活動資料失敗：', error));


// === 公告 ===
fetch(`${basePath}/data/announcements.json`)
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('announcement-list');

    data.sort((a, b) => {
      const toTime = (str) => {
        if (!str) return 0;
        const [yy, mm, dd] = str.split('/');
        const yyyy = 2000 + parseInt(yy, 10);
        return new Date(`${yyyy}-${mm}-${dd}`).getTime();
      };
      return toTime(b.start) - toTime(a.start);
    });

    data.forEach((item, i) => {
      const annId = encodeURIComponent(item.id || i);
      const li = document.createElement('li');
      li.className = 'row';
    
      const labelClass =
        item.label === '校內' ? 'internal' :
        item.label === '校外' ? 'external' : '';
    
      // 統一內頁連結（不分是否有 link）
      const titleHTML = `<a href="detail.html?id=${annId}&type=announcement">${item.title}</a>`;
    
      li.innerHTML = `
        <div class="title">${titleHTML}</div>
        <div class="date">${formatDateOnly(item.start)}</div>
        <div class="label ${labelClass}">${item.label}</div>
      `;
      list.appendChild(li);
    });
    
  })
  .catch(error => console.error('載入公告資料失敗：', error));
