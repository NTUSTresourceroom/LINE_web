function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || ''; // 預防 null
}

async function loadData() {
  try {
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    fetch(`${basePath}/data/info.json`)
    const response = await fetch(`${basePath}/data/info.json`);
    const jsonData = await response.json();
    
    const fallbackPage = '教師聯絡資訊'; // 可改為你想要的預設頁面
    let pageParam = getQueryParam('page');

    if (!pageParam) {
      pageParam = fallbackPage;
      history.replaceState(null, '', `?page=${encodeURIComponent(pageParam)}`);
    }

    const matchedPage = jsonData.find(p => p.page_name === pageParam);

    const titleEl = document.getElementById('pageTitle');
    const container = document.getElementById('contentContainer');
    container.innerHTML = '';

    if (!matchedPage) {
      titleEl.textContent = '找不到對應的頁面';
      container.innerHTML = `<p>請確認網址中的 <code>?page=</code> 參數是否正確。</p>`;
      return;
    }

    titleEl.textContent = matchedPage.page_name;

    matchedPage.content.forEach(section => {
      const div = document.createElement('div');
      div.classList.add('section');

      const title = document.createElement('h3');
      title.textContent = section.title;
      div.appendChild(title);

      section.items.forEach(item => {
        if (section.type === 'contact' || section.type === 'hotline' || section.type === 'text') {
          const p = document.createElement('p');
          if (item.link) {
            const a = document.createElement('a');
            a.href = item.link;
            a.textContent = item.text;
            a.target = '_blank';
            p.appendChild(a);
          } else {
            p.textContent = item.text;
          }
          div.appendChild(p);
        }

        else if (section.type === 'link') {
          const a = document.createElement('a');
          a.href = item.link || '#';
          a.textContent = item.text || item.alt || '連結';
          a.target = '_blank';
          div.appendChild(a);
        }

        else if (section.type === 'image') {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt || '';
          img.loading = 'lazy';
          img.classList.add('responsive-image');
          div.appendChild(img);
        }

        else if (section.type === 'iframe') {
          const iframe = document.createElement('iframe');
          iframe.src = item.src;
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('loading', 'lazy');
          iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
          iframe.classList.add('responsive-iframe');
          div.appendChild(iframe);
        }
      });

      container.appendChild(div);
    });

  } catch (err) {
    document.getElementById('pageTitle').textContent = '資料載入失敗';
    console.error(err);
  }
}

loadData();
