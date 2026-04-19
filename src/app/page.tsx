'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { toast } from 'sonner'

// Menu items for navigation
interface MenuItem {
  id: string
  title: string
  icon: React.ReactNode
  link: string
}

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
    link: '' // Đang cập nhật
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

// Quick links
const quickLinks = [
  {
    title: 'Liên kết website',
    url: 'https://www.prd.edu.vn',
    icon: <Globe className="w-5 h-5" />
  },
  {
    title: 'Thư viện',
    url: 'https://drive.google.com/drive/folders/13uW92umKil18ncS3m8JkF4iGEyXT-4mw?usp=sharing',
    icon: <FolderOpen className="w-5 h-5" />
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(true)

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
    
    setIframeUrl(item.link)
    setIframeTitle(item.title)
    setIframeLoading(true)
    setShowIframe(true)
    setMobileMenuOpen(false)
    
    toast.success(`Đang mở ${item.title}`, {
      description: 'Vui lòng chờ trong giây lát...',
      icon: item.icon,
    })
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false)
  }, [])

  const handleCloseIframe = useCallback(() => {
    setShowIframe(false)
    setIframeUrl('')
    setIframeTitle('')
  }, [])

  const handleRefreshIframe = useCallback(() => {
    setIframeLoading(true)
    // Force iframe reload by appending timestamp
    if (iframeUrl) {
      const separator = iframeUrl.includes('?') ? '&' : '?'
      setIframeUrl(prev => prev.split('?')[0] + separator + 't=' + Date.now())
    }
    toast.success('Đang làm mới...', {
      icon: <RefreshCw className="w-4 h-4" />,
    })
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
      days.push(<div key={`empty-${i}`} className="h-8" />)
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
            "h-8 w-8 flex items-center justify-center rounded-full text-sm transition-all cursor-default",
            isToday 
              ? "bg-emerald-500 text-white font-bold shadow-lg" 
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
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                <img 
                  src="/prd-logo.png" 
                  alt="Logo PRD" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900 dark:text-white">Phòng Đào Tạo</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Trường Chính sách công và PTNT</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleMenuClick(item)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleMenuClick(item)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg justify-start transition-all",
                      "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                    )}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </Button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Iframe Overlay - Full Screen */}
        {showIframe && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-emerald-600 dark:bg-emerald-700 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseIframe}
                  className="text-white hover:bg-white/20 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </Button>
                <h2 className="font-semibold hidden sm:block">{iframeTitle}</h2>
              </div>
              <div className="flex items-center gap-2">
                {iframeLoading && (
                  <div className="flex items-center gap-2 text-emerald-100">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Đang mở {iframeTitle}...</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefreshIframe}
                  className="text-white hover:bg-white/20"
                >
                  <RefreshCw className={cn("w-4 h-4", iframeLoading && "animate-spin")} />
                </Button>
              </div>
            </div>
            
            {/* Loading Progress Bar */}
            {iframeLoading && (
              <div className="h-1 bg-gray-200 dark:bg-gray-700">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" style={{ width: '60%' }} />
              </div>
            )}
            
            {/* Iframe - 100% remaining space */}
            <iframe
              src={iframeUrl}
              className="flex-1 w-full border-0"
              onLoad={handleIframeLoad}
              title={iframeTitle}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        )}

        {/* Homepage Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Iframe Area */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] lg:h-[600px] overflow-hidden shadow-xl border-0 bg-white dark:bg-gray-800">
              <CardContent className="p-0 h-full">
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800 dark:to-teal-700 flex items-center justify-center">
                      <Globe className="w-12 h-12 text-emerald-600 dark:text-emerald-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                      Khu vực hiển thị nội dung
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Iframe sẽ được cấu hình sau
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Links, Calendar, Clock */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-emerald-500" />
                  Liên kết nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {link.title}
                    </span>
                    <ExternalLink className="w-4 h-4 ml-auto text-gray-400 group-hover:text-emerald-500" />
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    Lịch
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
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
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAY_NAMES.map((day) => (
                    <div 
                      key={day} 
                      className={cn(
                        "h-8 w-8 flex items-center justify-center text-xs font-semibold",
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
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium text-emerald-100">Đồng hồ</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-wider tabular-nums mb-3">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-emerald-100">
                  {formatDate(currentTime)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500">
                <img src="/prd-logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phòng Đào Tạo
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2026 Phòng Đào Tạo - Trường Chính sách công và PTNT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
