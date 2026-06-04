'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
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
}

const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Lịch giảng 2026',
    icon: <Calendar className="w-5 h-5" />,
    link: 'https://script.google.com/macros/s/AKfycbyCdMjvkNB53u-tQnbg6YS-RhWYbKyWtSU12cFYtgdtSdvYZ-CGe-4ISoAXiKCAD1m3Ig/exec'
  },
  {
    id: 'stats',
    title: 'Phân tích chất lượng tiết giảng',
    icon: <BarChart3 className="w-5 h-5" />,
    link: // Đang cập nhật
  },
  {
    id: 'progress',
    title: 'Tiến độ biên soạn tài liệu',
    icon: <FileText className="w-5 h-5" />,
    link: // Đang cập nhật
  },
  {
    id: 'classes',
    title: 'Tình hình chiêu sinh',
    icon: <Users className="w-5 h-5" />,
    link: // Đang cập nhật
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
const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const MONTH_NAMES = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']

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
  const [showIframeOverlay, setShowIframeOverlay] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(false)
  const [mainIframeUrl] = useState('https://ambitious-teller-887.notion.site/ebd//d142ba55ef544385b8eb718c11dd40b3') // URL cho iframe chính tại khu vực đen

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
    setShowIframeOverlay(true)
    setMobileSidebarOpen(false)
    
    toast.success(`Đang mở ${item.title}`, {
      description: 'Vui lòng chờ trong giây lát...',
      icon: item.icon,
    })
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false)
  }, [])

  const handleCloseOverlay = useCallback(() => {
    setShowIframeOverlay(false)
    setIframeUrl('')
    setIframeTitle('')
  }, [])

  const handleRefreshIframe = useCallback(() => {
    if (iframeUrl) {
      setIframeLoading(true)
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
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-5 w-5" />)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === month && 
        today.getFullYear() === year
      
      days.push(
        <div
          key={day}
          className={cn(
            "h-5 w-5 flex items-center justify-center rounded-full text-[10px] transition-all",
            isToday 
              ? "bg-white text-emerald-600 font-bold shadow" 
              : "text-white/80 hover:bg-white/10"
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
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl overflow-hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarCollapsed ? "lg:w-20" : "lg:w-72 w-72"
        )}>
          {/* Logo Section */}
          <div className={cn(
            "flex flex-col items-center border-b border-white/10 transition-all duration-300 flex-shrink-0",
            sidebarCollapsed ? "p-3" : "p-4"
          )}>
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
              <div className={cn(
                "relative bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/30 group-hover:border-white/50 transition-all",
                sidebarCollapsed ? "w-12 h-12" : "w-16 h-16"
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
                <h1 className="mt-2 text-sm font-bold text-center">Phòng Đào Tạo</h1>
                <p className="text-emerald-200 text-[10px] text-center">Trường CSC & PTNT</p>
              </>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-2 space-y-1 overflow-y-auto flex-shrink-0">
            {/* Home Button */}
            <button
              onClick={() => {
                setShowIframeOverlay(false)
                setMobileSidebarOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                !showIframeOverlay 
                  ? "bg-white/20 text-white" 
                  : "hover:bg-white/10 text-emerald-100 hover:text-white"
              )}
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Trang chủ</span>}
            </button>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/10 text-emerald-100 hover:text-white"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!sidebarCollapsed && <span className="text-sm">{item.title}</span>}
              </button>
            ))}
          </nav>

          {/* Quick Links */}
          {!sidebarCollapsed && (
            <div className="p-2 border-t border-white/10 flex-shrink-0">
              <p className="text-[10px] text-emerald-200 mb-1 px-2">Liên kết nhanh</p>
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all text-emerald-100 hover:text-white text-xs"
                >
                  {link.icon}
                  <span>{link.title}</span>
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              ))}
            </div>
          )}

          {/* Clock Section - Above Calendar */}
          <div className="flex-shrink-0 border-t border-white/10 p-2">
            {!sidebarCollapsed && (
              <div className="bg-white/10 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-emerald-200" />
                  <span className="text-[10px] text-emerald-200">Đồng hồ</span>
                </div>
                <div className="text-xl font-bold text-center tabular-nums tracking-wider">
                  {formatTime(currentTime)}
                </div>
                <div className="text-[10px] text-emerald-200 text-center mt-1">
                  {formatDate(currentTime)}
                </div>
              </div>
            )}
          </div>

          {/* Calendar Section - Below Clock */}
          <div className="flex-shrink-0 p-2">
            {!sidebarCollapsed && (
              <div className="bg-white/10 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <div className="flex gap-0.5">
                    <button onClick={prevMonth} className="p-0.5 hover:bg-white/10 rounded">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button onClick={nextMonth} className="p-0.5 hover:bg-white/10 rounded">
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-0.5 mb-0.5">
                  {DAY_NAMES.map((day) => (
                    <div 
                      key={day} 
                      className="h-4 w-5 flex items-center justify-center text-[8px] text-emerald-200"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-0.5">
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>

          {/* Collapse Button & Theme Toggle */}
          <div className="mt-auto border-t border-white/10 flex items-center justify-between p-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center p-1.5 hover:bg-white/10 rounded transition-all"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area - Black background for iframe */}
        <main className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* Main Iframe Area */}
          {mainIframeUrl ? (
            <iframe
              src={mainIframeUrl}
              className="w-full h-full border-0"
              title="Nội dung chính"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <Globe className="w-12 h-12 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-600 mb-2">
                  Khu vực hiển thị nội dung
                </h2>
                <p className="text-gray-500 text-sm">
                  Iframe sẽ được cấu hình tại đây
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Iframe Overlay - Fullscreen when clicking menu items */}
      {showIframeOverlay && (
        <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-emerald-600 text-white shadow-lg flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseOverlay}
                className="text-white hover:bg-white/20 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              <div className="h-5 w-px bg-white/30" />
              <h2 className="font-semibold text-sm hidden sm:block">{iframeTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              {iframeLoading && (
                <div className="flex items-center gap-2 text-emerald-100">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm hidden sm:block">Đang mở {iframeTitle}...</span>
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
            <div className="h-0.5 bg-gray-700">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" style={{ width: '60%' }} />
            </div>
          )}
          
          {/* Iframe */}
          <iframe
            src={iframeUrl}
            className="flex-1 w-full border-0"
            onLoad={handleIframeLoad}
            title={iframeTitle}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-2 px-4 flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-500">
              <img src="/prd-logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-400">Phòng Đào Tạo</span>
          </div>
          <p className="text-gray-500 text-center">
            © 2026 Phòng Đào Tạo - Trường Chính sách công và PTNT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
