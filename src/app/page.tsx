'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  BarChart3,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  FolderOpen,
  ArrowLeft,
  RefreshCw,
  X,
  Home,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { toast } from 'sonner'

// Menu items for sidebar navigation
interface MenuItem {
  id: string
  title: string
  icon: React.ReactNode
  link: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Gantt Chart TKB',
    icon: <Calendar className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycbwBAGPYifJbBpITeTV05H3y7mcf3ysU8KYIA5aRLB41lOfJT03jJU_1qBFKK1rotYkd/exec',
    description: 'Xem thời khóa biểu dạng Gantt'
  },
  {
    id: 'stats',
    title: 'Thống kê giờ giảng',
    icon: <BarChart3 className="w-5 h-5" />,
    link: '', // Đang cập nhật
    description: 'Báo cáo giờ giảng giảng viên'
  },
  {
    id: 'progress',
    title: 'Báo cáo tiến độ',
    icon: <FileText className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycby8vKr9lT4nj-EAkBFJxx5WW8GHqRFQM3jG5plty9zzxItwkv9r0X-WZsxr3XPrQxug/exec',
    description: 'Theo dõi tiến độ công việc'
  },
  {
    id: 'classes',
    title: 'Tình hình mở lớp',
    icon: <Users className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec',
    description: 'Quản lý tình trạng lớp học'
  }
]

// Quick links
const quickLinks = [
  {
    title: 'Website trường',
    url: 'https://www.prd.edu.vn',
    icon: <Globe className="w-4 h-4" />
  },
  {
    title: 'Thư viện số',
    url: 'https://drive.google.com/drive/folders/13uW92umKil18ncS3m8JkF4iGEyXT-4mw?usp=sharing',
    icon: <FolderOpen className="w-4 h-4" />
  }
]

// Calendar helper functions
const DAYS_IN_WEEK = 7
const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                     'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [iframeUrl, setIframeUrl] = useState('')
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(false)

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleMenuClick = useCallback((item: MenuItem) => {
    if (!item.link) {
      toast.info('Đang cập nhật', {
        description: `Tính năng "${item.title}" đang được cập nhật. Vui lòng quay lại sau.`,
      })
      return
    }
    
    setActiveItem(item.id)
    setIframeUrl(item.link)
    setIframeTitle(item.title)
    setIframeLoading(true)
    setMobileSidebarOpen(false)
    
    toast.success(`Đang mở ${item.title}`, {
      description: 'Vui lòng chờ trong giây lát...',
      icon: item.icon,
    })
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false)
  }, [])

  const handleHomeClick = useCallback(() => {
    setActiveItem(null)
    setIframeUrl('')
    setIframeTitle('')
  }, [])

  const handleRefreshIframe = useCallback(() => {
    if (iframeUrl) {
      setIframeLoading(true)
      // Force iframe reload
      const separator = iframeUrl.includes('?') ? '&' : '?'
      setIframeUrl(prev => prev.split('?')[0] + separator + 't=' + Date.now())
      toast.success('Đang làm mới...', {
        icon: <RefreshCw className="w-4 h-4" />,
      })
    }
  }, [iframeUrl])

  // Generate calendar days
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = new Date()
    
    const days = []
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-6" />)
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === month && 
        today.getFullYear() === year
      
      days.push(
        <div
          key={day}
          className={cn(
            "h-6 w-6 flex items-center justify-center rounded-full text-xs transition-all cursor-default",
            isToday 
              ? "bg-emerald-500 text-white font-bold shadow-md" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
        >
          {day}
        </div>
      )
    }
    
    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="bg-white dark:bg-gray-800 shadow-lg"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        sidebarCollapsed ? "lg:w-20" : "lg:w-72"
      )}>
        {/* Logo Section */}
        <div className={cn(
          "flex flex-col items-center border-b border-white/10 transition-all duration-300",
          sidebarCollapsed ? "p-3" : "p-6"
        )}>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
            <div className={cn(
              "relative bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all group-hover:scale-105",
              sidebarCollapsed ? "w-12 h-12" : "w-24 h-24"
            )}>
              <img 
                src="/prd-logo.png" 
                alt="Logo PRD" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {!sidebarCollapsed && (
            <>
              <h1 className="mt-4 text-lg font-bold text-center">Phòng Đào Tạo</h1>
              <p className="text-emerald-200 text-xs mt-1 text-center">Trường Chính sách công và PTNT</p>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
              !activeItem 
                ? "bg-white/20 text-white" 
                : "hover:bg-white/10 text-emerald-100 hover:text-white"
            )}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-medium">Trang chủ</span>
            )}
          </button>

          <div className={cn(
            "border-t border-white/10",
            sidebarCollapsed ? "my-2" : "my-3"
          )} />

          {/* Menu Items */}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                activeItem === item.id 
                  ? "bg-white/20 text-white shadow-lg" 
                  : "hover:bg-white/10 text-emerald-100 hover:text-white"
              )}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {!sidebarCollapsed && (
                <div className="text-left overflow-hidden">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-emerald-200 truncate">{item.description}</p>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Links */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-white/10">
            <p className="text-xs text-emerald-200 mb-2 px-2">Liên kết nhanh</p>
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-emerald-100 hover:text-white text-sm"
              >
                {link.icon}
                <span>{link.title}</span>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            ))}
          </div>
        )}

        {/* Collapse Button - Desktop Only */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center p-3 border-t border-white/10 hover:bg-white/10 transition-all"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Theme Toggle */}
        <div className="p-3 border-t border-white/10 flex justify-center">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ml-10 lg:ml-0">
              {activeItem ? (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleHomeClick}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại
                  </Button>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {iframeTitle}
                  </h1>
                </div>
              ) : (
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hệ Thống Phòng Đào Tạo
                </h1>
              )}
            </div>

            {activeItem && (
              <div className="flex items-center gap-3">
                {iframeLoading && (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm hidden sm:block">Đang mở {iframeTitle}...</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshIframe}
                  disabled={iframeLoading}
                  className="gap-2"
                >
                  <RefreshCw className={cn("w-4 h-4", iframeLoading && "animate-spin")} />
                  <span className="hidden sm:block">Làm mới</span>
                </Button>
              </div>
            )}

            {/* Clock Display */}
            {!activeItem && (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(currentTime)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Loading Progress Bar */}
        {iframeLoading && activeItem && (
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" style={{ width: '60%' }} />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeItem ? (
            /* Iframe View - Full Height */
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title={iframeTitle}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            /* Home View */
            <div className="p-4 lg:p-6 h-full overflow-y-auto">
              {/* Main Iframe Placeholder */}
              <Card className="h-[400px] lg:h-[500px] mb-6 shadow-xl border-0 bg-white dark:bg-gray-800 overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800 dark:to-teal-700 flex items-center justify-center">
                        <Globe className="w-10 h-10 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                        Khu vực hiển thị nội dung
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Iframe sẽ được cấu hình tại đây
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Section: Calendar + Clock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        Lịch
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {DAY_NAMES.map((day) => (
                        <div 
                          key={day} 
                          className={cn(
                            "h-6 w-6 flex items-center justify-center text-xs font-semibold",
                            day === 'CN' ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </CardContent>
                </Card>

                {/* Clock */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium text-emerald-100">Đồng hồ</span>
                    </div>
                    <div className="text-4xl font-bold tracking-wider tabular-nums mb-2">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-emerald-100">
                      {formatDate(currentTime)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-500">
              <img src="/prd-logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">Phòng Đào Tạo</span>
          </div>
          <p className="text-gray-500 dark:text-gray-500 text-center">
            © 2026 Phòng Đào Tạo - Trường Chính sách công và PTNT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
