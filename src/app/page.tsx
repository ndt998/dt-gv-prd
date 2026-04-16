'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts'
import { 
  Calendar, 
  BarChart3, 
  FileText, 
  Users, 
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Clock,
  TrendingUp,
  TrendingDown,
  Menu,
  X,
  Home,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Plus,
  RefreshCw,
  Download,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Award,
  BookOpen,
  Building2,
  Zap,
  ExternalLink,
  MoreVertical,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Printer,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Activity,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  Database,
  Server,
  Cpu,
  HardDrive,
  MessageSquare,
  Star,
  MessageCircle,
  Megaphone,
  Briefcase,
  Heart,
  Send,
  Rocket,
  Shield,
  Globe,
  Maximize2,
  Minimize2,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Thermometer,
  FolderOpen,
  FileCheck,
  Clock3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { toast } from 'sonner'

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, end, duration])

  return { count, ref }
}

// Animated Stat Card Component
function AnimatedStatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''))
  const { count, ref } = useAnimatedCounter(numericValue, 2000)
  const suffix = stat.value.includes('%') ? '%' : stat.value.includes(',') ? '' : ''
  
  return (
    <Card 
      ref={ref}
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden glass-card animate-in slide-in-from-bottom"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            {stat.icon}
          </div>
          <div className="flex items-center gap-1">
            {stat.trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            ) : stat.trend === 'down' ? (
              <ArrowDownRight className="w-3 h-3 text-red-500" />
            ) : (
              <Minus className="w-3 h-3 text-gray-500" />
            )}
            <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-0 font-semibold">
              {stat.change}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 tabular-nums">
          {count.toLocaleString()}{suffix}
        </p>
        <div className="relative mt-3">
          <Progress value={stat.progress} className="h-2" />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{stat.description}</p>
      </CardContent>
    </Card>
  )
}

// Chart configurations
const chartConfig = {
  classes: { label: 'Lớp học', color: '#10b981' },
  teachers: { label: 'Giảng viên', color: '#3b82f6' },
  hours: { label: 'Giờ giảng', color: '#f59e0b' },
  efficiency: { label: 'Hiệu suất', color: '#06b6d4' },
  hours: { label: 'Giờ giảng', color: '#8b5cf6' },
} satisfies ChartConfig

// Monthly data for charts
const monthlyData = [
  { month: 'T1', classes: 120, teachers: 75, hours: 980 },
  { month: 'T2', classes: 132, teachers: 78, hours: 1050 },
  { month: 'T3', classes: 145, teachers: 82, hours: 1120 },
  { month: 'T4', classes: 138, teachers: 80, hours: 1080 },
  { month: 'T5', classes: 142, teachers: 83, hours: 1100 },
  { month: 'T6', classes: 150, teachers: 85, hours: 1150 },
  { month: 'T7', classes: 148, teachers: 86, hours: 1180 },
  { month: 'T8', classes: 152, teachers: 87, hours: 1200 },
  { month: 'T9', classes: 155, teachers: 88, hours: 1220 },
  { month: 'T10', classes: 154, teachers: 89, hours: 1230 },
  { month: 'T11', classes: 156, teachers: 89, hours: 1240 },
  { month: 'T12', classes: 158, teachers: 90, hours: 1250 },
]

// Weekly hours data
const weeklyHoursData = [
  { day: 'T2', hours: 185 },
  { day: 'T3', hours: 195 },
  { day: 'T4', hours: 178 },
  { day: 'T5', hours: 202 },
  { day: 'T6', hours: 188 },
  { day: 'T7', hours: 145 },
  { day: 'CN', hours: 42 },
]

// Department distribution data
const departmentData = [
  { name: 'CNTT', value: 35, color: '#10b981' },
  { name: 'Kinh tế', value: 25, color: '#06b6d4' },
  { name: 'Kỹ thuật', value: 20, color: '#8b5cf6' },
  { name: 'Ngoại ngữ', value: 12, color: '#f59e0b' },
  { name: 'Khác', value: 8, color: '#ec4899' },
]

// Performance radial data
const performanceData = [
  { name: 'Hiệu suất', value: 94, fill: '#10b981' },
]

// Class table data
const classData = [
  { id: 'LH001', name: 'Lập trình Web nâng cao', department: 'CNTT', teacher: 'Nguyễn Văn A', students: 45, status: 'active', schedule: 'T2, T4 (7:00-9:00)' },
  { id: 'LH002', name: 'Cơ sở dữ liệu', department: 'CNTT', teacher: 'Trần Thị B', students: 38, status: 'active', schedule: 'T3, T5 (9:30-11:30)' },
  { id: 'LH003', name: 'Kinh tế vi mô', department: 'Kinh tế', teacher: 'Lê Văn C', students: 52, status: 'active', schedule: 'T2, T6 (13:00-15:00)' },
  { id: 'LH004', name: 'Tiếng Anh B2', department: 'Ngoại ngữ', teacher: 'Phạm Thị D', students: 30, status: 'pending', schedule: 'T3, T5 (15:30-17:30)' },
  { id: 'LH005', name: 'Cơ học kết cấu', department: 'Kỹ thuật', teacher: 'Hoàng Văn E', students: 42, status: 'active', schedule: 'T4, T6 (7:00-9:00)' },
  { id: 'LH006', name: 'Machine Learning', department: 'CNTT', teacher: 'Nguyễn Văn A', students: 35, status: 'active', schedule: 'T3, T5 (7:00-9:00)' },
  { id: 'LH007', name: 'Marketing số', department: 'Kinh tế', teacher: 'Vũ Thị F', students: 48, status: 'completed', schedule: 'Đã kết thúc' },
  { id: 'LH008', name: 'An toàn thông tin', department: 'CNTT', teacher: 'Trần Thị B', students: 40, status: 'active', schedule: 'T2, T4 (15:30-17:30)' },
]

interface MenuItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  link: string
  badge?: string
  gradient: string
  shortcut?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Gantt Chart TKB',
    description: 'Xem và quản lý thời khóa biểu theo biểu đồ Gantt',
    icon: <Calendar className="w-6 h-6" />,
    link: 'LINK_GAS_GANTT_CHART',
    badge: 'Phổ biến',
    gradient: 'from-emerald-500 to-teal-600',
    shortcut: 'Ctrl+1'
  },
  {
    id: 'stats',
    title: 'Thống kê giờ giảng',
    description: 'Báo cáo chi tiết về giờ giảng của giảng viên',
    icon: <BarChart3 className="w-6 h-6" />,
    link: 'LINK_GAS_THONG_KE_GIO_GIANG',
    gradient: 'from-cyan-500 to-blue-600',
    shortcut: 'Ctrl+2'
  },
  {
    id: 'progress',
    title: 'Báo cáo tiến độ',
    description: 'Theo dõi tiến độ công việc và kế hoạch đào tạo',
    icon: <FileText className="w-6 h-6" />,
    link: 'LINK_GAS_BAO_CAO_TIEN_DO',
    badge: 'Mới',
    gradient: 'from-amber-500 to-orange-600',
    shortcut: 'Ctrl+3'
  },
  {
    id: 'classes',
    title: 'Tình hình mở lớp',
    description: 'Quản lý và theo dõi tình trạng các lớp học',
    icon: <Users className="w-6 h-6" />,
    link: 'LINK_GAS_TINH_HINH_MO_LOP',
    gradient: 'from-purple-500 to-pink-600',
    shortcut: 'Ctrl+4'
  }
]

const stats = [
  { 
    label: 'Lớp đang hoạt động', 
    value: '156', 
    icon: <GraduationCap className="w-5 h-5" />, 
    change: '+12',
    changeType: 'positive',
    progress: 78,
    description: 'trên tổng số 200 lớp',
    trend: 'up'
  },
  { 
    label: 'Giảng viên', 
    value: '89', 
    icon: <Users className="w-5 h-5" />, 
    change: '+3',
    changeType: 'positive',
    progress: 95,
    description: 'đang giảng dạy',
    trend: 'up'
  },
  { 
    label: 'Giờ giảng/tuần', 
    value: '1,234', 
    icon: <Clock className="w-5 h-5" />, 
    change: '+45',
    changeType: 'positive',
    progress: 82,
    description: 'tăng so với tuần trước',
    trend: 'up'
  },
  { 
    label: 'Hiệu suất', 
    value: '94%', 
    icon: <TrendingUp className="w-5 h-5" />, 
    change: '+2%',
    changeType: 'positive',
    progress: 94,
    description: 'vượt mục tiêu',
    trend: 'up'
  }
]

const quickActions = [
  { label: 'Thêm lớp mới', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: 'Xuất báo cáo', icon: <Download className="w-4 h-4" />, color: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'Làm mới dữ liệu', icon: <RefreshCw className="w-4 h-4" />, color: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'Bộ lọc nâng cao', icon: <Filter className="w-4 h-4" />, color: 'bg-amber-500 hover:bg-amber-600' }
]

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Cập nhật hệ thống Gantt Chart',
    description: 'Đã thêm tính năng lọc theo khoa và giảng viên',
    time: '2 giờ trước',
    icon: <CheckCircle2 className="w-4 h-4" />
  },
  {
    id: 2,
    type: 'warning',
    title: 'Nhắc nhở: Báo cáo tháng 11',
    description: 'Hạn chót nộp báo cáo: 30/11/2024',
    time: 'Hôm qua',
    icon: <AlertCircle className="w-4 h-4" />
  },
  {
    id: 3,
    type: 'info',
    title: 'Hội thảo đào tạo',
    description: 'Cuộc họp vào 10:00 sáng thứ Sáu',
    time: '2 ngày trước',
    icon: <Info className="w-4 h-4" />
  }
]

const recentActivities = [
  { action: 'Cập nhật TKB Khoa CNTT', user: 'Nguyễn Văn A', time: '5 phút trước', type: 'update' },
  { action: 'Thêm lớp học mới', user: 'Trần Thị B', time: '15 phút trước', type: 'create' },
  { action: 'Xuất báo cáo tuần', user: 'Lê Văn C', time: '1 giờ trước', type: 'export' },
  { action: 'Duyệt đề xuất mở lớp', user: 'Phạm Thị D', time: '2 giờ trước', type: 'approve' }
]

const systemMetrics = [
  { label: 'CPU', value: '42%', icon: <Cpu className="w-4 h-4" />, color: 'text-emerald-500' },
  { label: 'RAM', value: '68%', icon: <Server className="w-4 h-4" />, color: 'text-amber-500' },
  { label: 'Storage', value: '35%', icon: <HardDrive className="w-4 h-4" />, color: 'text-blue-500' },
  { label: 'Network', value: '12 MB/s', icon: <Activity className="w-4 h-4" />, color: 'text-purple-500' }
]

// Teacher directory data
const teacherData = [
  { id: 'GV001', name: 'Nguyễn Văn A', email: 'nguyenvana@prd.edu.vn', phone: '0901234567', department: 'CNTT', position: 'Trưởng khoa', classes: 4, rating: 4.8, avatar: 'NA' },
  { id: 'GV002', name: 'Trần Thị B', email: 'tranthib@prd.edu.vn', phone: '0902345678', department: 'CNTT', position: 'Giảng viên', classes: 3, rating: 4.6, avatar: 'TB' },
  { id: 'GV003', name: 'Lê Văn C', email: 'levanc@prd.edu.vn', phone: '0903456789', department: 'Kinh tế', position: 'Phó khoa', classes: 2, rating: 4.9, avatar: 'LC' },
  { id: 'GV004', name: 'Phạm Thị D', email: 'phamthid@prd.edu.vn', phone: '0904567890', department: 'Ngoại ngữ', position: 'Giảng viên', classes: 3, rating: 4.7, avatar: 'PD' },
  { id: 'GV005', name: 'Hoàng Văn E', email: 'hoangvane@prd.edu.vn', phone: '0905678901', department: 'Kỹ thuật', position: 'Giảng viên', classes: 2, rating: 4.5, avatar: 'HE' },
  { id: 'GV006', name: 'Vũ Thị F', email: 'vuthif@prd.edu.vn', phone: '0906789012', department: 'Kinh tế', position: 'Giảng viên', classes: 2, rating: 4.8, avatar: 'VF' },
]

// FAQ data
const faqData = [
  { 
    id: 1, 
    question: 'Làm thế nào để đăng ký lớp học mới?', 
    answer: 'Bạn có thể đăng ký lớp học mới bằng cách truy cập menu "Tình hình mở lớp" và nhấn nút "Thêm lớp mới". Điền đầy đủ thông tin và gửi yêu cầu để được phê duyệt.',
    category: 'Đăng ký'
  },
  { 
    id: 2, 
    question: 'Cách xuất báo cáo giờ giảng?', 
    answer: 'Vào mục "Thống kê giờ giảng", chọn khoảng thời gian và nhấn nút "Xuất báo cáo". Bạn có thể chọn định dạng PDF hoặc Excel.',
    category: 'Báo cáo'
  },
  { 
    id: 3, 
    question: 'Làm sao để xem thời khóa biểu?', 
    answer: 'Truy cập "Gantt Chart TKB" để xem thời khóa biểu dạng biểu đồ. Bạn có thể lọc theo khoa, giảng viên hoặc phòng học.',
    category: 'Lịch học'
  },
  { 
    id: 4, 
    question: 'Cách cập nhật thông tin cá nhân?', 
    answer: 'Nhấn vào avatar của bạn ở góc trên bên phải, chọn "Thông tin cá nhân" và cập nhật các thông tin cần thiết.',
    category: 'Tài khoản'
  },
  { 
    id: 5, 
    question: 'Làm thế nào để liên hệ hỗ trợ?', 
    answer: 'Bạn có thể gửi email đến support@prd.edu.vn hoặc gọi hotline 1900-xxxx trong giờ hành chính. Đội ngũ hỗ trợ sẽ phản hồi trong 24h.',
    category: 'Hỗ trợ'
  },
  { 
    id: 6, 
    question: 'Cách đổi mật khẩu đăng nhập?', 
    answer: 'Vào "Cài đặt" > "Bảo mật" > "Đổi mật khẩu". Nhập mật khẩu cũ và mật khẩu mới, sau đó nhấn "Xác nhận".',
    category: 'Tài khoản'
  },
]

// Calendar events data
const calendarEvents = [
  { id: 1, title: 'Hội nghị giảng viên', date: '2026-04-18', time: '09:00', type: 'meeting', color: 'bg-blue-500' },
  { id: 2, title: 'Hạn nộp báo cáo tháng', date: '2026-04-20', time: '17:00', type: 'deadline', color: 'bg-red-500' },
  { id: 3, title: 'Đào tạo hệ thống mới', date: '2026-04-22', time: '14:00', type: 'training', color: 'bg-emerald-500' },
  { id: 4, title: 'Kiểm tra cơ sở vật chất', date: '2026-04-25', time: '08:00', type: 'inspection', color: 'bg-amber-500' },
  { id: 5, title: 'Họp Ban giám hiệu', date: '2026-04-28', time: '10:00', type: 'meeting', color: 'bg-purple-500' },
]

// Announcements data
const announcements = [
  { id: 1, title: 'Cập nhật hệ thống quản lý đào tạo phiên bản 2.0', content: 'Hệ thống đã được nâng cấp với nhiều tính năng mới bao gồm biểu đồ tương tác, bảng dữ liệu nâng cao và giao diện tối.', date: '2026-04-16', priority: 'high' },
  { id: 2, title: 'Lịch nghỉ lễ 30/4 - 1/5', content: 'Thông báo lịch nghỉ lễ Giải phóng và Quốc tế Lao động từ ngày 30/4 đến 1/5. Các lớp học sẽ được bù vào tuần sau.', date: '2026-04-15', priority: 'normal' },
  { id: 3, title: 'Đăng ký đề tài NCKH năm 2026', content: 'Mở đợt đăng ký đề tài nghiên cứu khoa học năm 2026. Hạn chót nộp đề xuất: 15/5/2026.', date: '2026-04-14', priority: 'normal' },
]

// Weather data
const weatherData = {
  current: { temp: 32, condition: 'Nắng', humidity: 65, wind: 12, icon: 'sun' },
  forecast: [
    { day: 'Th 5', temp: 31, icon: 'cloud-sun' },
    { day: 'Th 6', temp: 29, icon: 'cloud-rain' },
    { day: 'Th 7', temp: 30, icon: 'cloud' },
    { day: 'CN', temp: 32, icon: 'sun' },
  ]
}

// Recent documents data
const recentDocuments = [
  { id: 1, name: 'Báo cáo tháng 4_2026.pdf', type: 'pdf', size: '2.4 MB', date: '2026-04-16', status: 'completed' },
  { id: 2, name: 'Danh sách lớp học kỳ 2.xlsx', type: 'excel', size: '856 KB', date: '2026-04-15', status: 'pending' },
  { id: 3, name: 'Kế hoạch đào tạo 2026.docx', type: 'doc', size: '1.2 MB', date: '2026-04-14', status: 'completed' },
  { id: 4, name: 'Thống kê giờ giảng Q1.xlsx', type: 'excel', size: '445 KB', date: '2026-04-13', status: 'completed' },
]

// Activity timeline data
const activityTimeline = [
  { id: 1, action: 'Cập nhật TKB Khoa CNTT', user: 'Nguyễn Văn A', time: '5 phút trước', type: 'update', icon: <RefreshCw className="w-4 h-4" />, color: 'bg-blue-500' },
  { id: 2, action: 'Thêm lớp học mới: Lập trình Web', user: 'Trần Thị B', time: '15 phút trước', type: 'create', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500' },
  { id: 3, action: 'Xuất báo cáo tuần 15', user: 'Lê Văn C', time: '1 giờ trước', type: 'export', icon: <Download className="w-4 h-4" />, color: 'bg-purple-500' },
  { id: 4, action: 'Duyệt đề xuất mở lớp ML', user: 'Phạm Thị D', time: '2 giờ trước', type: 'approve', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-amber-500' },
  { id: 5, action: 'Gửi thông báo đến GV', user: 'Hoàng Văn E', time: '3 giờ trước', type: 'notify', icon: <Bell className="w-4 h-4" />, color: 'bg-pink-500' },
]

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showSearch, setShowSearch] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profileTab, setProfileTab] = useState('info')
  const [showWeather, setShowWeather] = useState(false)
  const [expandedStats, setExpandedStats] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Welcome toast on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast.success('Chào mừng đến với Hệ thống Phòng Đào Tạo!', {
          description: 'Bạn có thể sử dụng Ctrl+K để tìm kiếm nhanh.',
          icon: <Sparkles className="w-4 h-4" />,
          duration: 5000,
        })
        sessionStorage.setItem('hasSeenWelcome', 'true')
      }, 1000)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (menuItems[index]) {
          setActiveMenu(menuItems[index].id)
        }
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'F1' || (e.ctrlKey && e.key === '/')) {
        e.preventDefault()
        setShowShortcuts(true)
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
        setShowShortcuts(false)
        setShowFeedback(false)
        setShowProfile(false)
        setActiveMenu(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMenuClick = useCallback((item: MenuItem) => {
    setIsLoading(true)
    setActiveMenu(item.id)
    setMobileMenuOpen(false)
    toast.info(`Đang mở ${item.title}`, {
      description: item.description,
      icon: item.icon,
    })
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredClassData = classData.filter(item =>
    selectedDepartment === 'all' || item.department === selectedDepartment
  )

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      case 'warning': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      case 'info': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">Đang hoạt động</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">Chờ duyệt</Badge>
      case 'completed': return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">Đã kết thúc</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex relative overflow-hidden">
      {/* Floating Gradient Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl float-animation" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '3s' }} />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse group-hover:animate-none group-hover:bg-white/30 transition-all" />
            <div className="relative w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all group-hover:scale-105">
              <img 
                src="/prd-logo.png" 
                alt="Logo PRD" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="mt-4 text-xl font-bold text-center">Phòng Đào Tạo</h1>
          <p className="text-emerald-200 dark:text-emerald-300 text-sm mt-1">Hệ thống quản lý đào tạo</p>
        </div>

        {/* Close Button - Mobile Only */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search in Sidebar */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-emerald-200 focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3 px-2">
            Chức năng chính
          </div>
          
          {filteredMenuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={cn(
                "w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 animate-in slide-in-from-left",
                activeMenu === item.id 
                  ? "bg-white text-emerald-700 shadow-lg transform scale-[1.02] dark:bg-emerald-100" 
                  : "bg-white/10 hover:bg-white/20 text-white dark:text-emerald-100"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                "flex-shrink-0 p-2 rounded-lg transition-colors",
                activeMenu === item.id ? "bg-emerald-100 dark:bg-emerald-200" : "bg-white/10 group-hover:bg-white/20"
              )}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500 text-white border-0 animate-pulse">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className={cn(
                  "text-xs mt-0.5 line-clamp-1",
                  activeMenu === item.id ? "text-emerald-600 dark:text-emerald-700" : "text-emerald-200"
                )}>
                  {item.description}
                </p>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform",
                activeMenu === item.id ? "translate-x-1" : "opacity-50 group-hover:opacity-100"
              )} />
              {item.shortcut && (
                <span className="absolute right-2 bottom-1 text-[10px] text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Stats Mini with Sparkline */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer group">
              <div className="text-lg font-bold group-hover:scale-110 transition-transform">156</div>
              <div className="text-xs text-emerald-200">Lớp học</div>
              {/* Mini Sparkline */}
              <svg viewBox="0 0 50 15" className="w-full h-3 mt-1">
                <polyline
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  points="0,12 8,8 16,10 24,6 32,8 40,4 48,2"
                />
              </svg>
            </div>
            <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer group">
              <div className="text-lg font-bold group-hover:scale-110 transition-transform">89</div>
              <div className="text-xs text-emerald-200">Giảng viên</div>
              {/* Mini Sparkline */}
              <svg viewBox="0 0 50 15" className="w-full h-3 mt-1">
                <polyline
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  points="0,10 8,8 16,6 24,8 32,4 40,6 48,3"
                />
              </svg>
            </div>
          </div>
          {/* Weekly Overview Mini Chart */}
          <div className="mt-3 bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-200">Tuần này</span>
              <span className="text-xs font-semibold text-white">+12%</span>
            </div>
            <div className="flex items-end gap-1 h-8">
              {[40, 65, 45, 80, 55, 70, 35].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/30 rounded-sm transition-all hover:bg-white/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-[8px] text-emerald-300/70">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
              <span>CN</span>
            </div>
          </div>
        </div>

        {/* Time & Date Section */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold font-mono tracking-wider">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-emerald-200 dark:text-emerald-300 mt-1">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Header with Glassmorphism */}
        <header className="sticky top-0 z-30 glass border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trang chủ</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Hệ thống cập nhật tự động các công việc</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowSearch(true)}
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="font-semibold">Thông báo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex items-start gap-3 p-3 cursor-pointer">
                      <div className={cn("p-1 rounded-full", getNotificationColor(notif.type))}>
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-emerald-600 dark:text-emerald-400 font-medium">
                    Xem tất cả thông báo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Feedback Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowFeedback(true)}
                title="Gửi phản hồi"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>

              {/* Help Button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowShortcuts(true)}
                title="Phím tắt (F1)"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/prd-logo.png" alt="User" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị viên</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>Admin</span>
                      <span className="text-xs text-gray-500 font-normal">admin@prd.edu.vn</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('info'); }}>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('settings'); }}>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('security'); }}>
                    <Shield className="w-4 h-4 mr-2" />
                    Bảo mật
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowShortcuts(true)}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Trợ giúp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => toast.info('Đăng xuất', { description: 'Tính năng đang được phát triển' })}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* System Status */}
              <Badge variant="outline" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hoạt động
              </Badge>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-8">
            {!activeMenu ? (
              <>
                {/* Welcome Banner */}
                <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700">
                  <CardContent className="p-0">
                    <div className="relative p-6 lg:p-10">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                      <div className="absolute top-10 right-10 opacity-20">
                        <Sparkles className="w-20 h-20 text-white animate-spin-slow" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                            Hệ thống cập nhật tự động các công việc
                            <span className="block text-emerald-100 mt-1">Phòng Đào tạo</span>
                          </h1>
                          <p className="text-emerald-100 max-w-xl">
                            Quản lý và theo dõi các hoạt động đào tạo một cách hiệu quả với hệ thống tự động hóa toàn diện.
                          </p>
                          <div className="flex flex-wrap gap-3 mt-5">
                            <Button 
                              size="default" 
                              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg transition-all hover:scale-105"
                              onClick={() => setActiveMenu('gantt')}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Xem thời khóa biểu
                            </Button>
                            <Button 
                              size="default" 
                              variant="outline" 
                              className="bg-transparent text-white border-white/30 hover:bg-white/10 transition-all hover:scale-105"
                              onClick={() => setActiveMenu('stats')}
                            >
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Thống kê
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {quickActions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              className={cn("text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl", action.color)}
                              title={action.label}
                              onClick={() => {
                                toast.success(action.label, {
                                  description: index === 0 ? 'Đang mở form thêm lớp mới...' :
                                               index === 1 ? 'Đang chuẩn bị xuất báo cáo...' :
                                               index === 2 ? 'Đang làm mới dữ liệu hệ thống...' :
                                               'Đang mở bộ lọc nâng cao...',
                                  icon: index === 0 ? <Plus className="w-4 h-4" /> :
                                        index === 1 ? <Download className="w-4 h-4" /> :
                                        index === 2 ? <RefreshCw className="w-4 h-4 animate-spin" /> :
                                        <Filter className="w-4 h-4" />,
                                })
                              }}
                            >
                              {action.icon}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid with Animated Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <AnimatedStatCard key={index} stat={stat} index={index} />
                  ))}
                </div>

                {/* Tabs for different views */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="overview" className="gap-2">
                      <LayoutGrid className="w-4 h-4" />
                      <span className="hidden sm:inline">Tổng quan</span>
                    </TabsTrigger>
                    <TabsTrigger value="charts" className="gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Biểu đồ</span>
                    </TabsTrigger>
                    <TabsTrigger value="classes" className="gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span className="hidden sm:inline">Lớp học</span>
                    </TabsTrigger>
                    <TabsTrigger value="directory" className="gap-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Giảng viên</span>
                    </TabsTrigger>
                    <TabsTrigger value="help" className="gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Trợ giúp</span>
                    </TabsTrigger>
                    <TabsTrigger value="system" className="gap-2">
                      <Server className="w-4 h-4" />
                      <span className="hidden sm:inline">Hệ thống</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-6 space-y-6">
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Feature Cards */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-emerald-500" />
                            Chức năng chính
                          </h2>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={viewMode === 'grid' ? 'default' : 'ghost'}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setViewMode('grid')}
                            >
                              <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={viewMode === 'list' ? 'default' : 'ghost'}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setViewMode('list')}
                            >
                              <List className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "grid gap-4",
                          viewMode === 'grid' ? "sm:grid-cols-2" : "grid-cols-1"
                        )}>
                          {menuItems.map((item, index) => (
                            <Card 
                              key={item.id}
                              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white dark:bg-gray-900 animate-in slide-in-from-left"
                              onClick={() => handleMenuClick(item)}
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <CardContent className="p-0">
                                <div className={cn(
                                  "h-1.5 bg-gradient-to-r",
                                  item.gradient
                                )} />
                                <div className={cn("p-5", viewMode === 'list' && "flex items-center gap-4")}>
                                  {viewMode === 'grid' ? (
                                    <>
                                      <div className="flex items-start justify-between mb-3">
                                        <div className={cn(
                                          "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform",
                                          item.gradient
                                        )}>
                                          {item.icon}
                                        </div>
                                        {item.badge && (
                                          <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
                                            {item.badge}
                                          </Badge>
                                        )}
                                      </div>
                                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                      </h3>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:gap-2 transition-all">
                                          <span>Truy cập</span>
                                          <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        </div>
                                        {item.shortcut && (
                                          <Badge variant="outline" className="text-[10px] text-gray-400 border-gray-200 dark:border-gray-700">
                                            {item.shortcut}
                                          </Badge>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className={cn(
                                        "p-2.5 rounded-lg bg-gradient-to-br text-white shadow-lg flex-shrink-0",
                                        item.gradient
                                      )}>
                                        {item.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {item.title}
                                          </h3>
                                          {item.badge && (
                                            <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
                                              {item.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                                    </>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Notifications */}
                        <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Bell className="w-4 h-4 text-emerald-500" />
                              Thông báo mới nhất
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {notifications.map((notif, index) => (
                              <div 
                                key={notif.id} 
                                className={cn(
                                  "flex items-start gap-3 p-3 rounded-xl border transition-all hover:shadow-sm cursor-pointer animate-in slide-in-from-right",
                                  getNotificationColor(notif.type)
                                )}
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="p-1 rounded-full bg-inherit">
                                  {notif.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{notif.title}</p>
                                  <p className="text-xs opacity-70 mt-0.5 line-clamp-2">{notif.description}</p>
                                  <p className="text-xs opacity-50 mt-1">{notif.time}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-500" />
                              Hoạt động gần đây
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white">{activity.action}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {activity.user} • {activity.time}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Quick Links */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-emerald-500" />
                            Liên kết nhanh
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {[
                            { label: 'Website trường', icon: <Building2 className="w-4 h-4" /> },
                            { label: 'Thư viện số', icon: <BookOpen className="w-4 h-4" /> },
                            { label: 'Hướng dẫn sử dụng', icon: <HelpCircle className="w-4 h-4" /> },
                            { label: 'Liên hệ hỗ trợ', icon: <Users className="w-4 h-4" /> }
                          ].map((link, index) => (
                            <button key={index} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left group">
                              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                                {link.icon}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-emerald-500 transition-colors" />
                            </button>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Achievements */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-500" />
                            Thành tựu tháng
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 hover:scale-105 transition-transform">
                              <Target className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Mục tiêu</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 hover:scale-105 transition-transform">
                              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">45</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Hoàn thành</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 hover:scale-105 transition-transform">
                              <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">12</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Đề xuất</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* System Info */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Settings className="w-4 h-4 text-emerald-500" />
                            Thông tin hệ thống
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Phiên bản</span>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">v2.0.0</Badge>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Cập nhật cuối</span>
                            <span className="text-gray-900 dark:text-white font-medium">16/04/2026</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Trạng thái</span>
                            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                              Hoạt động
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* New Row: Calendar, Weather, Activity Timeline, Documents */}
                    <div className="grid lg:grid-cols-4 gap-6 mt-6">
                      {/* Interactive Calendar Widget */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-emerald-500" />
                            Lịch tháng 4
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                              <div key={day} className="text-gray-400 font-medium py-1">{day}</div>
                            ))}
                            {Array.from({ length: 30 }, (_, i) => {
                              const day = i + 1
                              const isToday = day === 16
                              const hasEvent = [18, 20, 22, 25, 28].includes(day)
                              return (
                                <button
                                  key={day}
                                  className={cn(
                                    "p-1.5 rounded-lg text-sm transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900/30 relative",
                                    isToday && "bg-emerald-500 text-white hover:bg-emerald-600",
                                    hasEvent && !isToday && "font-bold text-emerald-600 dark:text-emerald-400"
                                  )}
                                >
                                  {day}
                                  {hasEvent && !isToday && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                                  )}
                                </button>
                              )
                            })}
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">18/4 - Hội nghị GV</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="text-gray-700 dark:text-gray-300">20/4 - Hạn báo cáo</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Weather Widget */}
                      <Card className="border-0 shadow-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:shadow-lg transition-all lg:col-span-1 overflow-hidden">
                        <CardContent className="p-5 relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                          <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm text-cyan-100">Hà Nội</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Sun className="w-10 h-10 text-yellow-300" />
                                  <span className="text-4xl font-bold">{weatherData.current.temp}°</span>
                                </div>
                                <p className="text-sm text-cyan-100 mt-1">{weatherData.current.condition}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-cyan-100 mb-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="w-4 h-4" />
                                <span>{weatherData.current.humidity}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Wind className="w-4 h-4" />
                                <span>{weatherData.current.wind} km/h</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/20">
                              {weatherData.forecast.map((day, i) => (
                                <div key={i} className="text-center">
                                  <p className="text-xs text-cyan-100">{day.day}</p>
                                  <div className="my-1">
                                    {day.icon === 'sun' && <Sun className="w-4 h-4 mx-auto text-yellow-300" />}
                                    {day.icon === 'cloud-sun' && <CloudSun className="w-4 h-4 mx-auto text-cyan-200" />}
                                    {day.icon === 'cloud-rain' && <CloudRain className="w-4 h-4 mx-auto text-cyan-200" />}
                                    {day.icon === 'cloud' && <Cloud className="w-4 h-4 mx-auto text-cyan-200" />}
                                  </div>
                                  <p className="text-xs font-medium">{day.temp}°</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Activity Timeline */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            Hoạt động
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                            <div className="space-y-4">
                              {activityTimeline.slice(0, 4).map((item, index) => (
                                <div key={item.id} className="relative flex gap-3 pl-6 animate-in slide-in-from-left" style={{ animationDelay: `${index * 100}ms` }}>
                                  <div className={cn(
                                    "absolute left-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white",
                                    item.color
                                  )}>
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.action}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.user} • {item.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Documents */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <FolderOpen className="w-4 h-4 text-emerald-500" />
                            Tài liệu gần đây
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {recentDocuments.map((doc, index) => (
                            <button
                              key={doc.id}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left group animate-in fade-in"
                              style={{ animationDelay: `${index * 50}ms` }}
                              onClick={() => toast.info(`Đang mở ${doc.name}`, { icon: <FileText className="w-4 h-4" /> })}
                            >
                              <div className={cn(
                                "p-2 rounded-lg",
                                doc.type === 'pdf' && "bg-red-100 dark:bg-red-900/30 text-red-600",
                                doc.type === 'excel' && "bg-green-100 dark:bg-green-900/30 text-green-600",
                                doc.type === 'doc' && "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                              )}>
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{doc.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</p>
                              </div>
                              <FileCheck className={cn(
                                "w-4 h-4",
                                doc.status === 'completed' ? "text-emerald-500" : "text-amber-500"
                              )} />
                            </button>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Charts Tab */}
                  <TabsContent value="charts" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Monthly Trend Chart */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Xu hướng theo tháng
                          </CardTitle>
                          <CardDescription>Số lượng lớp học và giảng viên trong năm 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <AreaChart data={monthlyData}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="month" className="text-xs" />
                              <YAxis className="text-xs" />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area type="monotone" dataKey="classes" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                              <Area type="monotone" dataKey="teachers" stackId="2" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                            </AreaChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Weekly Hours Chart */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            Giờ giảng theo tuần
                          </CardTitle>
                          <CardDescription>Phân bố giờ giảng trong tuần hiện tại</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <BarChart data={weeklyHoursData}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="day" className="text-xs" />
                              <YAxis className="text-xs" />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Department Distribution */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-emerald-500" />
                            Phân bố theo khoa
                          </CardTitle>
                          <CardDescription>Tỷ lệ lớp học theo từng khoa</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <PieChart>
                              <Pie
                                data={departmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {departmentData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Legend />
                            </PieChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Performance Gauge */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-500" />
                            Hiệu suất tổng thể
                          </CardTitle>
                          <CardDescription>Đánh giá hiệu suất hoạt động hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="80%" data={performanceData}>
                              <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={10}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </RadialBarChart>
                          </ChartContainer>
                          <div className="text-center mt-4">
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">94%</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Vượt mục tiêu 4%</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Classes Tab */}
                  <TabsContent value="classes" className="mt-6">
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-emerald-500" />
                              Danh sách lớp học
                            </CardTitle>
                            <CardDescription>Quản lý và theo dõi các lớp học trong hệ thống</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Lọc theo khoa" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Tất cả khoa</SelectItem>
                                <SelectItem value="CNTT">CNTT</SelectItem>
                                <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                                <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                                <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" className="gap-2">
                              <Plus className="w-4 h-4" />
                              Thêm lớp
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50 dark:bg-gray-800">
                                <TableHead className="font-semibold">Mã lớp</TableHead>
                                <TableHead className="font-semibold">Tên lớp</TableHead>
                                <TableHead className="font-semibold">Khoa</TableHead>
                                <TableHead className="font-semibold">Giảng viên</TableHead>
                                <TableHead className="font-semibold">Sĩ số</TableHead>
                                <TableHead className="font-semibold">Lịch học</TableHead>
                                <TableHead className="font-semibold">Trạng thái</TableHead>
                                <TableHead className="font-semibold text-right">Thao tác</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredClassData.map((cls, index) => (
                                <TableRow key={cls.id} className="animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                  <TableCell className="font-mono text-sm">{cls.id}</TableCell>
                                  <TableCell className="font-medium">{cls.name}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="text-xs">{cls.department}</Badge>
                                  </TableCell>
                                  <TableCell>{cls.teacher}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Users className="w-3 h-3 text-gray-400" />
                                      {cls.students}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-gray-500">{cls.schedule}</TableCell>
                                  <TableCell>{getStatusBadge(cls.status)}</TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="w-4 h-4 mr-2" />
                                          Xem chi tiết
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="w-4 h-4 mr-2" />
                                          Chỉnh sửa
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Copy className="w-4 h-4 mr-2" />
                                          Sao chép
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Xóa
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* System Tab */}
                  <TabsContent value="system" className="mt-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* System Metrics */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-500" />
                            Tài nguyên hệ thống
                          </CardTitle>
                          <CardDescription>Theo dõi hiệu suất hệ thống theo thời gian thực</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {systemMetrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={metric.color}>{metric.icon}</span>
                                  <span className="text-sm font-medium">{metric.label}</span>
                                </div>
                                <span className="text-sm font-bold">{metric.value}</span>
                              </div>
                              <Progress 
                                value={parseInt(metric.value)} 
                                className={cn(
                                  "h-2",
                                  parseInt(metric.value) > 80 && "[&>div]:bg-red-500",
                                  parseInt(metric.value) > 60 && parseInt(metric.value) <= 80 && "[&>div]:bg-amber-500"
                                )}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Database Info */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-emerald-500" />
                            Cơ sở dữ liệu
                          </CardTitle>
                          <CardDescription>Thông tin kết nối và trạng thái database</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">15.2 GB</div>
                              <div className="text-sm text-gray-500">Dung lượng sử dụng</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">2.3M</div>
                              <div className="text-sm text-gray-500">Số bản ghi</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                              <div className="text-sm text-gray-500">Uptime</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">12ms</div>
                              <div className="text-sm text-gray-500">Latency</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              <span className="font-medium">Kết nối ổn định</span>
                            </div>
                            <span className="text-sm text-gray-500">Last sync: 2 phút trước</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Backups */}
                      <Card className="border-0 shadow-md lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-emerald-500" />
                            Sao lưu gần đây
                          </CardTitle>
                          <CardDescription>Lịch sử sao lưu dữ liệu hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { date: '16/04/2026 08:00', size: '15.2 GB', status: 'success', type: 'Tự động' },
                              { date: '15/04/2026 08:00', size: '15.1 GB', status: 'success', type: 'Tự động' },
                              { date: '14/04/2026 20:00', size: '15.0 GB', status: 'success', type: 'Thủ công' },
                              { date: '14/04/2026 08:00', size: '14.9 GB', status: 'success', type: 'Tự động' },
                            ].map((backup, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                  <div>
                                    <p className="font-medium">{backup.date}</p>
                                    <p className="text-sm text-gray-500">{backup.type}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{backup.size}</p>
                                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">Thành công</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Directory Tab */}
                  <TabsContent value="directory" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Teacher Directory */}
                      <div className="lg:col-span-2">
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <Users className="w-5 h-5 text-emerald-500" />
                                  Danh sách giảng viên
                                </CardTitle>
                                <CardDescription>Thông tin chi tiết các giảng viên trong hệ thống</CardDescription>
                              </div>
                              <Button size="sm" className="gap-2 w-full sm:w-auto">
                                <Plus className="w-4 h-4" />
                                Thêm giảng viên
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="rounded-lg border overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                                    <TableHead className="font-semibold">Giảng viên</TableHead>
                                    <TableHead className="font-semibold">Khoa</TableHead>
                                    <TableHead className="font-semibold">Chức vụ</TableHead>
                                    <TableHead className="font-semibold">Lớp</TableHead>
                                    <TableHead className="font-semibold">Đánh giá</TableHead>
                                    <TableHead className="font-semibold text-right">Thao tác</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {teacherData.map((teacher, index) => (
                                    <TableRow key={teacher.id} className="animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                      <TableCell>
                                        <div className="flex items-center gap-3">
                                          <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                              {teacher.avatar}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <p className="font-medium">{teacher.name}</p>
                                            <p className="text-xs text-gray-500">{teacher.email}</p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className="text-xs">{teacher.department}</Badge>
                                      </TableCell>
                                      <TableCell className="text-sm">{teacher.position}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <GraduationCap className="w-3 h-3 text-gray-400" />
                                          {teacher.classes}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                          <span className="font-medium">{teacher.rating}</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                              <Eye className="w-4 h-4 mr-2" />
                                              Xem chi tiết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Mail className="w-4 h-4 mr-2" />
                                              Gửi email
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Phone className="w-4 h-4 mr-2" />
                                              Gọi điện
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                              <Trash2 className="w-4 h-4 mr-2" />
                                              Xóa
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Calendar Events */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <CalendarDays className="w-5 h-5 text-emerald-500" />
                              Lịch sắp tới
                            </CardTitle>
                            <CardDescription>Các sự kiện và cuộc họp trong tuần</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {calendarEvents.map((event, index) => (
                              <div 
                                key={event.id} 
                                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className={cn("w-2 h-full min-h-[40px] rounded-full", event.color)} />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{event.title}</p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>{event.date}</span>
                                    <span>•</span>
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Announcements */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Megaphone className="w-5 h-5 text-emerald-500" />
                              Thông báo
                            </CardTitle>
                            <CardDescription>Các thông báo quan trọng từ Ban giám hiệu</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {announcements.map((ann, index) => (
                              <div 
                                key={ann.id} 
                                className={cn(
                                  "p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer animate-in fade-in",
                                  ann.priority === 'high' 
                                    ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800" 
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className="flex items-start gap-2">
                                  {ann.priority === 'high' && (
                                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div>
                                    <p className="font-medium text-sm">{ann.title}</p>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                                    <p className="text-xs text-gray-400 mt-2">{ann.date}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Help Tab */}
                  <TabsContent value="help" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* FAQ Section */}
                      <div className="lg:col-span-2">
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MessageCircle className="w-5 h-5 text-emerald-500" />
                              Câu hỏi thường gặp
                            </CardTitle>
                            <CardDescription>Tìm câu trả lời cho các thắc mắc phổ biến</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {faqData.map((faq, index) => (
                              <details 
                                key={faq.id} 
                                className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                                      {faq.category}
                                    </Badge>
                                    <span className="font-medium text-sm">{faq.question}</span>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                </div>
                              </details>
                            ))}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Quick Help */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-emerald-500" />
                              Hỗ trợ nhanh
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Hướng dẫn sử dụng</p>
                                <p className="text-xs text-gray-500">Xem tài liệu hướng dẫn chi tiết</p>
                              </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Video hướng dẫn</p>
                                <p className="text-xs text-gray-500">Xem các video tutorial</p>
                              </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Diễn đàn hỗ trợ</p>
                                <p className="text-xs text-gray-500">Thảo luận với cộng đồng</p>
                              </div>
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Contact Support */}
                        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Heart className="w-5 h-5" />
                              <span className="font-semibold">Cần hỗ trợ?</span>
                            </div>
                            <p className="text-emerald-100 text-sm mb-4">
                              Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn 24/7
                            </p>
                            <div className="space-y-3">
                              <Button variant="secondary" size="sm" className="w-full gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                                <Mail className="w-4 h-4" />
                                support@prd.edu.vn
                              </Button>
                              <Button variant="secondary" size="sm" className="w-full gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                                <Phone className="w-4 h-4" />
                                1900-xxxx
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Keyboard Shortcuts */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Settings className="w-5 h-5 text-emerald-500" />
                              Phím tắt
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {[
                              { key: 'Ctrl + K', action: 'Mở tìm kiếm' },
                              { key: 'Ctrl + 1-4', action: 'Mở menu nhanh' },
                              { key: 'ESC', action: 'Đóng/Quay lại' },
                            ].map((shortcut, index) => (
                              <div key={index} className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{shortcut.action}</span>
                                <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded font-mono">{shortcut.key}</kbd>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              /* App Frame View */
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveMenu(null)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                      Quay lại
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-2 rounded-lg bg-gradient-to-br text-white",
                        menuItems.find(m => m.id === activeMenu)?.gradient
                      )}>
                        {menuItems.find(m => m.id === activeMenu)?.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {menuItems.find(m => m.id === activeMenu)?.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {menuItems.find(m => m.id === activeMenu)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Làm mới
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Mở mới
                    </Button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-[calc(100vh-220px)] min-h-[600px] w-full rounded-xl" />
                  </div>
                ) : (
                  <Card className="overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-900">
                    <CardContent className="p-0">
                      <iframe
                        src={menuItems.find(m => m.id === activeMenu)?.link || ''}
                        className="w-full h-[calc(100vh-220px)] min-h-[600px] border-0"
                        title={menuItems.find(m => m.id === activeMenu)?.title}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 Phòng Đào tạo. Bản quyền thuộc về trường đại học.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Phiên bản 2.0.0
              </span>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <span className="hidden sm:inline">Lần truy cập cuối: {formatTime(currentTime)}</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSearch(false)}>
          <Card className="w-full max-w-xl mx-4 shadow-2xl border-0 animate-in slide-in-from-top" onClick={e => e.stopPropagation()}>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm chức năng..."
                  className="pl-10 h-12 text-lg"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
              </div>
              {searchQuery && (
                <div className="mt-4 space-y-2">
                  {filteredMenuItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleMenuClick(item)
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-in fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white", item.gradient)}>
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowShortcuts(false)}>
          <Card className="w-full max-w-lg mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  Phím tắt
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowShortcuts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Sử dụng các phím tắt để làm việc nhanh hơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { keys: ['Ctrl', 'K'], action: 'Mở tìm kiếm nhanh', icon: <Search className="w-4 h-4" /> },
                { keys: ['Ctrl', '1'], action: 'Mở Gantt Chart TKB', icon: <Calendar className="w-4 h-4" /> },
                { keys: ['Ctrl', '2'], action: 'Mở Thống kê giờ giảng', icon: <BarChart3 className="w-4 h-4" /> },
                { keys: ['Ctrl', '3'], action: 'Mở Báo cáo tiến độ', icon: <FileText className="w-4 h-4" /> },
                { keys: ['Ctrl', '4'], action: 'Mở Tình hình mở lớp', icon: <Users className="w-4 h-4" /> },
                { keys: ['F1'], action: 'Hiển thị trợ giúp', icon: <HelpCircle className="w-4 h-4" /> },
                { keys: ['ESC'], action: 'Đóng dialog/quay lại', icon: <X className="w-4 h-4" /> },
              ].map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-left" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      {shortcut.icon}
                    </div>
                    <span className="text-sm font-medium">{shortcut.action}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex}>
                        <kbd className="px-2 py-1 text-xs font-semibold bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && <span className="mx-0.5 text-gray-400">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowShortcuts(false)}>
                  Đóng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowFeedback(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  Gửi phản hồi
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFeedback(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Chia sẻ ý kiến của bạn để chúng tôi cải thiện hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Loại phản hồi</label>
                <Select defaultValue="suggestion">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">💡 Đề xuất tính năng</SelectItem>
                    <SelectItem value="bug">🐛 Báo cáo lỗi</SelectItem>
                    <SelectItem value="question">❓ Câu hỏi</SelectItem>
                    <SelectItem value="other">📝 Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nội dung</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Nhập nội dung phản hồi của bạn..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFeedback(false)}>
                  Hủy
                </Button>
                <Button 
                  size="sm" 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    toast.success('Cảm ơn phản hồi của bạn!', {
                      description: 'Chúng tôi sẽ xem xét và phản hồi sớm nhất.',
                      icon: <Heart className="w-4 h-4" />,
                    })
                    setShowFeedback(false)
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profile Settings Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowProfile(false)}>
          <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  Cài đặt tài khoản
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowProfile(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={profileTab} onValueChange={setProfileTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="info" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Thông tin</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Cài đặt</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Bảo mật</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 animate-in fade-in">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/prd-logo.png" alt="User" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">AD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Đổi ảnh đại diện</Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Họ và tên</label>
                        <Input defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue="admin@prd.edu.vn" type="email" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Số điện thoại</label>
                        <Input defaultValue="0901234567" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chức vụ</label>
                        <Input defaultValue="Quản trị viên" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Khoa/Phòng ban</label>
                      <Select defaultValue="admin">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Ban quản trị</SelectItem>
                          <SelectItem value="cntt">Khoa CNTT</SelectItem>
                          <SelectItem value="kinhte">Khoa Kinh tế</SelectItem>
                          <SelectItem value="kythuat">Khoa Kỹ thuật</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 animate-in fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Thông báo email</p>
                          <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Ngôn ngữ</p>
                          <p className="text-sm text-gray-500">Chọn ngôn ngữ hiển thị</p>
                        </div>
                      </div>
                      <Select defaultValue="vi">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Định dạng ngày</p>
                          <p className="text-sm text-gray-500">Chọn định dạng hiển thị ngày</p>
                        </div>
                      </div>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 animate-in fade-in">
                  <div className="space-y-4">
                    <Card className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Đổi mật khẩu</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mật khẩu hiện tại</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mật khẩu mới</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">Cập nhật mật khẩu</Button>
                      </CardContent>
                    </Card>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Xác thực hai yếu tố</p>
                          <p className="text-sm text-gray-500">Bảo vệ tài khoản với 2FA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Bật</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Lịch sử đăng nhập</p>
                          <p className="text-sm text-gray-500">Xem các phiên đăng nhập gần đây</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Xem</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="pt-4 mt-4 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowProfile(false)}>Hủy</Button>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    toast.success('Đã lưu thay đổi!', { icon: <CheckCircle2 className="w-4 h-4" /> })
                    setShowProfile(false)
                  }}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
