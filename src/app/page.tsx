'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Calendar, 
  BarChart3, 
  FileText, 
  Users, 
  ChevronRight,
  GraduationCap,
  Clock,
  TrendingUp,
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
  Sparkles,
  Target,
  Award,
  BookOpen,
  Building2,
  Zap,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'

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
    description: 'trên tổng số 200 lớp'
  },
  { 
    label: 'Giảng viên', 
    value: '89', 
    icon: <Users className="w-5 h-5" />, 
    change: '+3',
    changeType: 'positive',
    progress: 95,
    description: 'đang giảng dạy'
  },
  { 
    label: 'Giờ giảng/tuần', 
    value: '1,234', 
    icon: <Clock className="w-5 h-5" />, 
    change: '+45',
    changeType: 'positive',
    progress: 82,
    description: 'tăng so với tuần trước'
  },
  { 
    label: 'Hiệu suất', 
    value: '94%', 
    icon: <TrendingUp className="w-5 h-5" />, 
    change: '+2%',
    changeType: 'positive',
    progress: 94,
    description: 'vượt mục tiêu'
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

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
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
      if (e.key === 'Escape') {
        setShowSearch(false)
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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      case 'warning': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      case 'info': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950 text-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
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
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-emerald-200 focus:bg-white/20 focus:border-white/40"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3 px-2">
            Chức năng chính
          </div>
          
          {filteredMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={cn(
                "w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                activeMenu === item.id 
                  ? "bg-white text-emerald-700 shadow-lg transform scale-[1.02] dark:bg-emerald-100" 
                  : "bg-white/10 hover:bg-white/20 text-white dark:text-emerald-100"
              )}
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
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500 text-white border-0">
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

        {/* Quick Stats Mini */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-lg font-bold">156</div>
              <div className="text-xs text-emerald-200">Lớp học</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-lg font-bold">89</div>
              <div className="text-xs text-emerald-200">Giảng viên</div>
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
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
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
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
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
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Trợ giúp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
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
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                      <div className="absolute top-10 right-10 opacity-20">
                        <Sparkles className="w-20 h-20 text-white" />
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
                              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
                              onClick={() => setActiveMenu('gantt')}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Xem thời khóa biểu
                            </Button>
                            <Button 
                              size="default" 
                              variant="outline" 
                              className="bg-transparent text-white border-white/30 hover:bg-white/10"
                              onClick={() => setActiveMenu('stats')}
                            >
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Thống kê
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          {quickActions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              className={cn("text-white shadow-md", action.color)}
                            >
                              {action.icon}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white dark:bg-gray-900">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            {stat.icon}
                          </div>
                          <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-0">
                            {stat.change}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                        <Progress value={stat.progress} className="h-1.5 mt-3" />
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{stat.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
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
                      {menuItems.map((item) => (
                        <Card 
                          key={item.id}
                          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white dark:bg-gray-900"
                          onClick={() => handleMenuClick(item)}
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
                                      "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
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
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-xl border transition-all hover:shadow-sm cursor-pointer",
                              getNotificationColor(notif.type)
                            )}
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
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
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
                  <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
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
                        <button key={index} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                          <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                            {link.icon}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-500" />
                        Thành tựu tháng
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
                          <Target className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Mục tiêu</div>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">45</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Hoàn thành</div>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                          <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                          <div className="text-lg font-bold text-gray-900 dark:text-white">12</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Đề xuất</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Info */}
                  <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
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
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" />
                          Hoạt động
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              /* App Frame View */
              <div className="space-y-4">
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
          <Card className="w-full max-w-xl mx-4 shadow-2xl border-0" onClick={e => e.stopPropagation()}>
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
                  {filteredMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleMenuClick(item)
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
    </div>
  )
}
