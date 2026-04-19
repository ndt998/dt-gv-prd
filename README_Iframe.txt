# HƯỚNG DẪN CẤU HÌNH IFRAME VÀ LIÊN KẾT

## 📁 Vị trí file cần chỉnh sửa

File chính: `src/app/page.tsx`

---

## 1. IFRAME CHÍNH TẠI KHU VỰC TRANG CHỦ (NỀN ĐEN)

### Vị trí trong code:
Tìm biến `mainIframeUrl` ở đầu component (khoảng dòng 70):

```typescript
const [mainIframeUrl] = useState('') // URL cho iframe chính tại khu vực đen
```

### Cách chèn link:
```typescript
const [mainIframeUrl] = useState('https://YOUR_LINK_HERE')
```

### Ví dụ:
```typescript
const [mainIframeUrl] = useState('https://script.google.com/macros/s/AKfycb.../exec')
```

Khi có link, iframe sẽ hiển thị tại khu vực chính (nền đen) trên trang chủ.

---

## 2. CẤU HÌNH CÁC NÚT ĐIỀU HƯỚNG (Sidebar Menu)

### Vị trí trong code:
Tìm đoạn code bắt đầu bằng `const menuItems: MenuItem[] = [`

### Cấu trúc mỗi mục:
```typescript
{
  id: 'gantt',                    // ID duy nhất (không trùng lặp)
  title: 'Gantt Chart TKB',       // Tiêu đề hiển thị
  icon: <Calendar className="w-5 h-5" />,  // Icon (xem bảng icon bên dưới)
  link: 'https://YOUR_LINK_HERE'  // URL của Google Apps Script
}
```

### Ví dụ - Thêm một mục mới:
```typescript
{
  id: 'new-report',
  title: 'Báo cáo mới',
  icon: <FileText className="w-5 h-5" />,
  link: 'https://script.google.com/macros/s/AKfycb.../exec'
}
```

### Cách đổi link:
Chỉ cần thay đổi giá trị `link`:

```typescript
link: 'https://script.google.com/macros/s/AKfycbwBAGPYifJbBpITeTV05H3y7mcf3ysU8KYIA5aRLB41lOfJT03jJU_1qBFKK1rotYkd/exec'
```

### Để trống link (hiện thông báo "Đang cập nhật"):
```typescript
link: ''
```

---

## 3. CÁC ICON KHẢ DỤNG

| Icon | Component | Dùng cho |
|------|-----------|----------|
| 📅 | `<Calendar className="w-5 h-5" />` | Lịch, TKB |
| 📊 | `<BarChart3 className="w-5 h-5" />` | Thống kê |
| 📄 | `<FileText className="w-5 h-5" />` | Báo cáo |
| 👥 | `<Users className="w-5 h-5" />` | Người dùng, lớp học |
| 🏠 | `<Home className="w-5 h-5" />` | Trang chủ |
| 🌐 | `<Globe className="w-5 h-5" />` | Website |
| 📁 | `<FolderOpen className="w-5 h-5" />` | Thư mục, thư viện |
| ⚙️ | `<Settings className="w-5 h-5" />` | Cài đặt |
| 📈 | `<TrendingUp className="w-5 h-5" />` | Xu hướng |
| 🔔 | `<Bell className="w-5 h-5" />` | Thông báo |

### Cách thêm icon mới:
1. Import icon ở đầu file:
```typescript
import { Calendar, BarChart3, FileText, Users, Settings } from 'lucide-react'
```

2. Sử dụng:
```typescript
icon: <Settings className="w-5 h-5" />
```

---

## 4. CẤU HÌNH LIÊN KẾT NHANH (Quick Links)

### Vị trí trong code:
Tìm đoạn code bắt đầu bằng `const quickLinks = [`

### Cấu trúc:
```typescript
{
  title: 'Website trường',
  url: 'https://www.prd.edu.vn',
  icon: <Globe className="w-4 h-4" />
}
```

### Ví dụ - Thêm liên kết mới:
```typescript
{
  title: 'Hệ thống đăng ký',
  url: 'https://dangky.prd.edu.vn',
  icon: <ExternalLink className="w-4 h-4" />
}
```

---

## 5. CẤU HÌNH GOOGLE APPS SCRIPT ĐỂ EMBED

### Bước 1: Deploy Google Apps Script
1. Mở Google Apps Script project
2. Nhấn **Deploy** → **Test deployments** hoặc **New deployment**
3. Chọn loại **Web app**
4. Thiết lập:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Nhấn **Deploy** và copy URL

### Bước 2: Thêm URL vào code
```typescript
link: 'https://script.google.com/macros/s/AKfycb.../exec'
```

### Lưu ý quan trọng:
- URL phải kết thúc bằng `/exec`
- Phải có quyền truy cập **Anyone** mới có thể embed
- Một số Google Apps Script có thể chặn iframe (X-Frame-Options)

---

## 6. TÓM TẮT NHANH

| Tác vụ | Vị trí | Biến cần đổi |
|--------|--------|--------------|
| Iframe chính trang chủ | `mainIframeUrl` | `useState('URL')` |
| Đổi link menu | `menuItems` | `link: 'URL'` |
| Đổi tên menu | `menuItems` | `title: 'Tên mới'` |
| Đổi icon menu | `menuItems` | `icon: <Icon />` |
| Thêm menu mới | `menuItems` | Thêm object mới vào array |
| Đổi link nhanh | `quickLinks` | `url: 'URL'` |

---

## 7. VÍ DỤ HOÀN CHỈNH

```typescript
// Iframe chính tại trang chủ
const [mainIframeUrl] = useState('https://script.google.com/macros/s/AKfycb.../exec')

// Các nút menu trong sidebar
const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Gantt Chart TKB',
    icon: <Calendar className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycbwBAGPYifJbBpITeTV05H3y7mcf3ysU8KYIA5aRLB41lOfJT03jJU_1qBFKK1rotYkd/exec'
  },
  {
    id: 'stats',
    title: 'Thống kê giờ giảng',
    icon: <BarChart3 className="w-5 h-5" />,
    link: '' // Để trống = "Đang cập nhật"
  },
  {
    id: 'progress',
    title: 'Báo cáo tiến độ',
    icon: <FileText className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycby8vKr9lT4nj-EAkBFJxx5WW8GHqRFQM3jG5plty9zzxItwkv9r0X-WZsxr3XPrQxug/exec'
  },
  {
    id: 'classes',
    title: 'Tình hình mở lớp',
    icon: <Users className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec'
  }
]
```

---

**Cần hỗ trợ thêm?** Liên hệ quản trị viên hệ thống.
