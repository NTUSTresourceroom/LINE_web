# NTUST 資源教室活動網站

## 網址
主頁：https://NTUSTresourceroom.github.io/LINE_web

聯絡：https://NTUSTresourceroom.github.io/LINE_web/info.html?page=教師聯絡資訊

位置：https://NTUSTresourceroom.github.io/LINE_web/info.html?page=資源教室所在位置

相關：https://NTUSTresourceroom.github.io/LINE_web/info.html?page=相關資訊


# 資料更新與上傳流程

本專案使用 Excel 表單 (`START.xlsm`) 編輯活動與公告資料，並透過 GitHub Desktop 上傳更新。請依照以下步驟操作。

---

## 一、使用 `START.xlsm` 匯出 JSON 資料

1. 開啟專案中的 `START.xlsm` 檔案。
2. 填寫或修改工作表中的活動、公告、詳細資料。
3. **請特別注意：所有日期欄位需使用下列格式填寫：**


- `yy`：西元後兩碼（例如 2025 年填寫為 `25`）
- `mm`：月份（補零，例如一月為 `01`）
- `dd`：日期（補零）
- `HH`：24 小時制的小時（補零）
- `MM`：分鐘（補零）

✅ 範例：`25/07/15/14:30` 表示 2025 年 7 月 15 日 下午 2 點半

4. 按下表單中提供的【匯出 JSON】按鈕。
5. Excel 會自動產生或覆蓋 `data/` 資料夾內的對應 JSON 檔案：
- `announcements.json`
- `events.json`
- `info.json`

✅ 請確認匯出的 JSON 檔案正確無誤後再進行下一步。

---

## 二、使用 GitHub Desktop Pull/Push

1. 開啟 [GitHub Desktop](https://desktop.github.com/)。
2. 左上角選擇本專案的儲存庫。
3. 點擊右上角 `Fetch origin` → 然後 `Pull` 拉取最新遠端版本。
4. 確認左側變更清單包含剛剛匯出的 `.json` 檔案。
5. 在下方輸入簡短的 Commit 訊息（例如：`更新活動與公告`），然後點擊 `Commit to main`。
6. 接著點擊 `Push origin` 將更新推送到 GitHub。

---

## 三、注意事項

- 請避免多人同時修改資料，可能會導致版本衝突。
- 匯出 JSON 後，可使用本地瀏覽器開啟：
- `index.html`（活動頁面）
- `info.html`（活動詳情）
- `detail.html`（公告與一般資訊）
- 如遇問題，請聯繫專案管理員協助處理。
- **確保圖片路徑正確**（相對於 HTML 檔案的位置）
- GitHub Pages 靜態網站會自動部署 `index.html`，其他頁面需手動連結
- 所有 `.json`、`.css`、`.js` 請保持路徑與大小寫一致（區分大小寫）

---
