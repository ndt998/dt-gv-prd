# HƯỚNG DẪN SỬ DỤNG CHI TIẾT
## Hệ Thống Phòng Đào Tạo - Static Site

---

## MỤC LỤC

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục)
3. [Chạy dự án local](#3-chạy-dự-án-local)
4. [Build và Deploy](#4-build-và-deploy)
5. [Đổi Logo](#5-đổi-logo)
6. [Đổi tên hệ thống](#6-đổi-tên-hệ-thống)
7. [Đổi màu sắc](#7-đổi-màu-sắc)
8. [Cấu hình iframe và liên kết](#8-cấu-hình-iframe-và-liên-kết)
9. [Deploy lên GitHub Pages](#9-deploy-lên-github-pages)
10. [Xử lý lỗi thường gặp](#10-xử-lỗi-thường-gặp)

---

## 1. TỔNG QUAN HỆ THỐNG

### Công nghệ sử dụng:
- **Next.js 16** - Framework React
- **TypeScript** - Ngôn ngữ lập trình
- **Tailwind CSS** - Styling
- **Static Export** - Xuất file tĩnh

### Tính năng chính:
- ✅ Sidebar điều hướng có thể thu nhỏ/mở rộng
- ✅ Iframe nhúng Google Apps Script
- ✅ Lịch theo tháng
- ✅ Đồng hồ thời gian thực
- ✅ Chế độ sáng/tối (Dark/Light mode)
- ✅ Responsive (tương thích mobile)

---

## 2. CẤU TRÚC THƯ MỤC

```
my-project/
├── public/                    # File tĩnh (logo, favicon)
│   └── prd-logo.png          # Logo hệ thống ⭐
├── src/
│   ├── app/
│   │   ├── page.tsx          # Trang chính ⭐ (quan trọng nhất)
│   │   ├── layout.tsx        # Layout chung
│   │   └── globals.css       # CSS toàn cục
│   └── components/           # Các component UI
├── next.config.ts            # Cấu hình Next.js
├── package.json              # Dependencies
├── README_Iframe.txt         # Hướng dẫn iframe
└── README_HDSD_chitiet.txt   # File này
```

### File quan trọng cần biết:
| File | Mục đích |
|------|----------|
| `src/app/page.tsx` | Toàn bộ giao diện và logic |
| `public/prd-logo.png` | Logo hiển thị |
| `next.config.ts` | Cấu hình static export |

---

## 3. CHẠY DỰ ÁN LOCAL

### Yêu cầu:
- Node.js 18+ hoặc Bun
- Git (tùy chọn)

### Cài đặt và chạy:

```bash
# Di chuyển vào thư mục dự án
cd /home/z/my-project

# Cài đặt dependencies (nếu chưa có)
bun install

# Chạy development server
bun run dev

# Mở trình duyệt tại: http://localhost:3000
```

### Các lệnh hữu ích:

```bash
# Kiểm tra lỗi code
bun run lint

# Build static site
bun run build

# Xuất file tĩnh (sau build, file ở thư mục /out)
```

---

## 4. BUILD VÀ DEPLOY

### Build Static Site:

```bash
# Build dự án
bun run build
```

Sau khi build xong, file tĩnh sẽ nằm trong thư mục `out/`

### Cấu trúc thư mục `out/`:
```
out/
├── index.html           # Trang chủ
├── _next/               # CSS, JS, images
└── prd-logo.png         # Logo
```

---

## 5. ĐỔI LOGO

### Cách 1: Thay thế file (Khuyên dùng)

1. Chuẩn bị logo mới:
   - Định dạng: PNG (khuyên dùng) hoặc JPG
   - Kích thước: Vuông (ví dụ: 200x200px)
   - Nền: Trong suốt (transparent) hoặc trắng

2. Đổi tên file thành `prd-logo.png`

3. Thay thế file tại: `public/prd-logo.png`

4. Refresh trình duyệt (Ctrl+F5)

### Cách 2: Dùng tên file khác

1. Đặt logo mới vào thư mục `public/` (ví dụ: `public/new-logo.png`)

2. Mở file `src/app/page.tsx`

3. Tìm tất cả `src="/prd-logo.png"` và thay bằng `src="/new-logo.png"`

```typescript
// Trước
<img src="/prd-logo.png" alt="Logo PRD" />

// Sau
<img src="/new-logo.png" alt="Logo PRD" />
```

### Vị trí logo trong code:
- Sidebar: Khoảng dòng 180-200
- Footer: Khoảng dòng 550

---

## 6. ĐỔI TÊN HỆ THỐNG

### Tìm và thay đổi trong `src/app/page.tsx`:

```typescript
// Tên trong sidebar (khoảng dòng 195)
<h1 className="mt-4 text-lg font-bold text-center">Phòng Đào Tạo</h1>
<p className="text-emerald-200 text-xs mt-1 text-center">Trường Chính sách công và PTNT</p>

// Tiêu đề trang (khoảng dòng 285)
<h1 className="text-lg font-semibold text-gray-900 dark:text-white">
  Hệ Thống Phòng Đào Tạo
</h1>

// Footer (khoảng dòng 560)
<span className="text-gray-600 dark:text-gray-400">Phòng Đào Tạo</span>
// và
© 2026 Phòng Đào Tạo - Trường Chính sách công và PTNT. All rights reserved.
```

### Đổi tiêu đề tab trình duyệt:

Mở `src/app/layout.tsx` và tìm:

```typescript
export const metadata: Metadata = {
  title: "Hệ Thống Phòng Đào Tạo - PRD",
  description: "Hệ thống cập nhật tự động các công việc Phòng Đào tạo...",
  // ...
};
```

---

## 7. ĐỔI MÀU SẮC

### Màu chủ đạo hiện tại: **Emerald (Xanh ngọc)**

### Các class màu chính trong code:

| Class | Màu | Vị trí |
|-------|-----|--------|
| `emerald-500` | Xanh ngọc đậm | Button, icon |
| `emerald-600` | Xanh ngọc | Sidebar gradient |
| `emerald-700` | Xanh ngọc tối | Sidebar gradient |
| `teal-500` | Xanh teal | Gradient |
| `teal-600` | Xanh teal tối | Gradient |

### Cách đổi màu:

Tìm và thay thế trong `src/app/page.tsx`:

```typescript
// Ví dụ: Đổi từ emerald sang blue
// Tìm: emerald-500 → Thay bằng: blue-500
// Tìm: emerald-600 → Thay bằng: blue-600
// Tìm: emerald-700 → Thay bằng: blue-700
```

### Bảng màu thay thế:

| Màu | Class |
|-----|-------|
| Xanh dương | `blue-500`, `blue-600`, `blue-700` |
| Xanh lá | `green-500`, `green-600`, `green-700` |
| Tím | `purple-500`, `purple-600`, `purple-700` |
| Cam | `orange-500`, `orange-600`, `orange-700` |
| Đỏ | `red-500`, `red-600`, `red-700` |
| Hồng | `pink-500`, `pink-600`, `pink-700` |

---

## 8. CẤU HÌNH IFRAME VÀ LIÊN KẾT

**Xem chi tiết tại:** `README_Iframe.txt`

### Tóm tắt nhanh:

1. Mở file `src/app/page.tsx`

2. Tìm `const menuItems: MenuItem[] = [`

3. Chỉnh sửa các mục:
```typescript
{
  id: 'gantt',
  title: 'Gantt Chart TKB',
  icon: <Calendar className="w-5 h-5" />,
  link: 'https://YOUR_LINK_HERE',  // ← Đổi link ở đây
  description: 'Mô tả ngắn'
}
```

---

## 9. DEPLOY LÊN GITHUB PAGES

### Bước 1: Tạo repository trên GitHub

1. Đăng nhập GitHub
2. Tạo repository mới (ví dụ: `phong-daotao`)
3. KHÔNG tick "Add a README file"

### Bước 2: Push code lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit"

# Thêm remote
git remote add origin https://github.com/YOUR_USERNAME/phong-daotao.git

# Push
git push -u origin main
```

### Bước 3: Cấu hình GitHub Actions

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Build
        run: bun run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Bước 4: Bật GitHub Pages

1. Vào **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Chờ deploy hoàn tất
4. Truy cập: `https://YOUR_USERNAME.github.io/phong-daotao/`

---

## 10. XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: "Module not found"

```bash
# Cài đặt lại dependencies
rm -rf node_modules
bun install
```

### Lỗi: "Port 3000 is already in use"

```bash
# Tìm và kill process
lsof -i :3000
kill -9 <PID>
```

### Lỗi: Iframe không hiển thị

**Nguyên nhân:** Google Apps Script chặn iframe

**Giải pháp:**
1. Mở Google Apps Script
2. Deploy lại với quyền "Anyone"
3. Hoặc mở link trong tab mới thay vì iframe

### Lỗi: Logo không hiển thị

1. Kiểm tra file tồn tại: `public/prd-logo.png`
2. Kiểm tra đường dẫn trong code
3. Refresh trình duyệt (Ctrl+F5)

### Lỗi: Build thất bại

```bash
# Kiểm tra lỗi
bun run lint

# Xóa cache
rm -rf .next
bun run build
```

---

## THÔNG TIN LIÊN HỆ

- **Phòng Đào Tạo**
- **Trường Chính sách công và PTNT**
- **Website:** https://www.prd.edu.vn

---

*Cập nhật: Tháng 4/2026*
