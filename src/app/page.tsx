'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  link: string
  badge?: string
  gradient: string
}

const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Gantt Chart TKB',
    description: 'Xem và quản lý thời khóa biểu theo biểu đồ Gantt',
    icon: <Calendar className="w-6 h-6" />,
    link: 'LINK_GAS_GANTT_CHART',
    badge: 'Phổ biến',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'stats',
    title: 'Thống kê giờ giảng',
    description: 'Báo cáo chi tiết về giờ giảng của giảng viên',
    icon: <BarChart3 className="w-6 h-6" />,
    link: 'LINK_GAS_THONG_KE_GIO_GIANG',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'progress',
    title: 'Báo cáo tiến độ',
    description: 'Theo dõi tiến độ công việc và kế hoạch đào tạo',
    icon: <FileText className="w-6 h-6" />,
    link: 'LINK_GAS_BAO_CAO_TIEN_DO',
    badge: 'Mới',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'classes',
    title: 'Tình hình mở lớp',
    description: 'Quản lý và theo dõi tình trạng các lớp học',
    icon: <Users className="w-6 h-6" />,
    link: 'LINK_GAS_TINH_HINH_MO_LOP',
    gradient: 'from-purple-500 to-pink-600'
  }
]

const stats = [
  { label: 'Lớp đang hoạt động', value: '156', icon: <GraduationCap className="w-5 h-5" />, change: '+12' },
  { label: 'Giảng viên', value: '89', icon: <Users className="w-5 h-5" />, change: '+3' },
  { label: 'Giờ giảng/tuần', value: '1,234', icon: <Clock className="w-5 h-5" />, change: '+45' },
  { label: 'Hiệu suất', value: '94%', icon: <TrendingUp className="w-5 h-5" />, change: '+2%' }
]

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleMenuClick = (item: MenuItem) => {
    setActiveMenu(item.id)
    setMobileMenuOpen(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 text-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="p-6 flex flex-col items-center border-b border-white/10">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/30">
              <img 
                src="/prd-logo.png" 
                alt="Logo PRD" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="mt-4 text-xl font-bold text-center">Phòng Đào Tạo</h1>
          <p className="text-emerald-200 text-sm mt-1">Hệ thống quản lý đào tạo</p>
        </div>

        {/* Close Button - Mobile Only */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-3">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-4 px-2">
            Chức năng chính
          </div>
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={cn(
                "w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                activeMenu === item.id 
                  ? "bg-white text-emerald-700 shadow-lg transform scale-[1.02]" 
                  : "bg-white/10 hover:bg-white/20 text-white"
              )}
            >
              <div className={cn(
                "flex-shrink-0 p-2 rounded-lg transition-colors",
                activeMenu === item.id ? "bg-emerald-100" : "bg-white/10 group-hover:bg-white/20"
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
                  activeMenu === item.id ? "text-emerald-600" : "text-emerald-200"
                )}>
                  {item.description}
                </p>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform",
                activeMenu === item.id ? "translate-x-1" : "opacity-50"
              )} />
            </button>
          ))}
        </nav>

        {/* Time & Date Section */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold font-mono tracking-wider">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-emerald-200 mt-1">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Home className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Trang chủ</h2>
                  <p className="text-sm text-gray-500">Hệ thống cập nhật tự động các công việc</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hệ thống đang hoạt động
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
                <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                  <CardContent className="p-0">
                    <div className="relative p-8 lg:p-12">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                      
                      <div className="relative z-10">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                          Hệ thống cập nhật tự động các công việc
                          <span className="block text-emerald-200 mt-2">Phòng Đào tạo</span>
                        </h1>
                        <p className="text-emerald-100 text-lg max-w-2xl">
                          Quản lý và theo dõi các hoạt động đào tạo một cách hiệu quả với hệ thống tự động hóa toàn diện.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button 
                            size="lg" 
                            className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
                            onClick={() => setActiveMenu('gantt')}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Xem thời khóa biểu
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="bg-transparent text-white border-white/30 hover:bg-white/10"
                            onClick={() => setActiveMenu('stats')}
                          >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Thống kê
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            <p className="text-sm text-emerald-600 font-semibold mt-1">
                              {stat.change} <span className="text-gray-400 font-normal">tuần này</span>
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-600 group-hover:scale-110 transition-transform">
                            {stat.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Feature Cards */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Chức năng chính</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {menuItems.map((item) => (
                      <Card 
                        key={item.id}
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md overflow-hidden"
                        onClick={() => setActiveMenu(item.id)}
                      >
                        <CardContent className="p-0">
                          <div className={cn(
                            "h-2 bg-gradient-to-r",
                            item.gradient
                          )} />
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className={cn(
                                "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
                                item.gradient
                              )}>
                                {item.icon}
                              </div>
                              {item.badge && (
                                <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 border-0">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center text-emerald-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                              <span>Truy cập</span>
                              <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Info Section */}
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-100">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      Thông báo mới nhất
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Cập nhật hệ thống Gantt Chart</p>
                          <p className="text-sm text-gray-500 mt-1">Đã thêm tính năng lọc theo khoa và giảng viên</p>
                          <p className="text-xs text-gray-400 mt-2">2 giờ trước</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Nhắc nhở: Báo cáo tháng 11</p>
                          <p className="text-sm text-gray-500 mt-1">Hạn chót nộp báo cáo: 30/11/2024</p>
                          <p className="text-xs text-gray-400 mt-2">Hôm qua</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* App Frame View */
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveMenu(null)}
                    className="hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                    Quay lại
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2 rounded-lg bg-gradient-to-br text-white",
                      menuItems.find(m => m.id === activeMenu)?.gradient
                    )}>
                      {menuItems.find(m => m.id === activeMenu)?.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {menuItems.find(m => m.id === activeMenu)?.title}
                    </h2>
                  </div>
                </div>
                
                <Card className="overflow-hidden border-0 shadow-xl">
                  <CardContent className="p-0">
                    <iframe
                      src={menuItems.find(m => m.id === activeMenu)?.link || ''}
                      className="w-full h-[calc(100vh-220px)] min-h-[600px] border-0"
                      title={menuItems.find(m => m.id === activeMenu)?.title}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 bg-white py-4 px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p>&copy; 2024 Phòng Đào tạo. Bản quyền thuộc về trường đại học.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Phiên bản 2.0.0
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
