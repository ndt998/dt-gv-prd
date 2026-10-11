## Tóm tắt thay đổi

### 1. Chèn logo PRD thật vào bộ công cụ tạo mã QR (`upload/QR_generator_prd.html`)
- Trước đây đội dev cũ chỉ **vẽ chữ "PRD" bằng canvas** (gradient + text), chưa dùng ảnh logo thật.
- Bổ sung `loadBrandLogo()`: tải `prd-logo.png`, giữ tỷ lệ, cắt tròn bằng `ctx.clip()` + `drawImage` (chế độ cover).
- `drawCenterLogo()` ưu tiên vẽ logo PNG; nếu ảnh lỗi/chưa tải xong → fallback về chữ PRD như cũ.
- Render lại preview ngay khi logo tải xong.

### 2. Tích hợp "PRD QRcode" vào cổng thông tin PRD (`src/app/page.tsx`)
- Copy bộ công cụ đã sửa thành `public/prd-qrcode.html` (static export phục vụ tại `/prd-qrcode.html`).
- Thêm mục **"PRD QRcode"** trong phần **Liên kết nhanh**, ngay dưới "Thư viện số", icon `QrCode`.
- Click mở **iframe overlay toàn màn hình** (dùng chung cơ chế với menu Google Apps Script: nút Quay lại / Làm mới / progress bar).
- Sửa `handleRefreshIframe` để giữ đúng path tương đối khi thêm tham số chống cache.

### 3. Nhật ký làm việc
- Tạo `log.txt` (chi tiết buổi làm việc) và `log_qwen_qcoder.txt` (log chung Qwen/qcoder, kèm tóm tắt bộ sản phẩm & quy ước ghi log).

## Kiểm chứng
- ✅ Mock test jsdom: vòng render cuối vẽ `drawImage('prd-logo.png')` căn giữa tâm canvas.
- ✅ `npm run build` (static export) thành công; `out/index.html` chứa "PRD QRcode"; `out/prd-qrcode.html` và `out/prd-logo.png` trả HTTP 200.

## Commits
- `f7b952c` Chèn logo PRD thật vào QR generator + thêm PRD QRcode vào Liên kết nhanh
- `77cf79f` Cập nhật package-lock.json
- `403b926` Add work log files: log.txt and log_qwen_qcoder.txt
