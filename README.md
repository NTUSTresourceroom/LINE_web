# NTUST 資源教室活動網站

## 網址
主頁：https://NTUSTresourceroom.github.io/act_TEST

聯絡：https://NTUSTresourceroom.github.io/act_TEST/info.html?page=教師聯絡資訊

位置：https://NTUSTresourceroom.github.io/act_TEST/info.html?page=資源教室所在位置

相關：https://NTUSTresourceroom.github.io/act_TEST/info.html?page=相關資訊


這是一個使用 GitHub Pages 建立的靜態網站，提供以下功能：

- 活動輪播圖與狀態標記（新／報名中／已過期）
- 活動列表清單
- 資源教室聯絡資訊
- 資源教室位置與地圖
- JSON 結構化管理所有內容（方便維護）
- 支援深色主題與 RWD（行動裝置優化）
- 可擴充備份 HackMD 的內容（非同步）

---

## 📁 專案結構

```plaintext
📁 data/
├── contact_info.json        ← 教師聯絡資訊（使用 JSON 結構）
├── other_info.json          ← 資源教室網址、地圖、預約系統等資料

📁 images/.../              ← 活動圖片

📄 index.html                ← 首頁，顯示最新消息輪播與清單
📄 contact_info.html         ← 教師聯絡資訊頁面
📄 other_info.html           ← 其他資訊（網址、地圖、諮詢）
📄 loc_info.html             ← 資源教室地理位置與 Google Maps

📄 events.json               ← 活動資料列表（圖片、連結、狀態）

📄 render.js                 ← 載入活動 JSON 並渲染圖片與清單(首頁用)
📄 render_pages.js           ← 載入其他 info JSON 頁面用(子頁面用)

📄 style.css                 ← 首頁輪播樣式
📄 style_pages.css           ← 各分頁共用樣式

📄 README.md                 ← 此說明檔案
```

---

## 🔧 使用方式

### 1. 編輯活動（`events.json`）

每筆活動資料格式如下：

```json
{
  "title": "活動名稱",
  "image": "./images/113-1/your_image.jpg",
  "link": "https://hackmd.io/your-note", //用hackmd
  "tag": "新"  // 或 "報名中", "已過期"
}
```

### 2. 編輯data資訊（`/data/XXX.json`）

```json
{
  "category": "標題",
  "items": [      // 區塊 (多項目)
    {
      "text": "連結名稱", 
      "link": "網址"
    }
  ]
}
```

---

## 📌 注意事項

- **確保圖片路徑正確**（相對於 HTML 檔案的位置）
- GitHub Pages 靜態網站會自動部署 `index.html`，其他頁面需手動連結
- 所有 `.json`、`.css`、`.js` 請保持路徑與大小寫一致（區分大小寫）

---
