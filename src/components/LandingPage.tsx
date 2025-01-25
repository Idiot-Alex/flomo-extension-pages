import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            无需会员，任意网页保存 Flomo 笔记
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Flomo Extension - 让你的想法永不丢失，随时随地记录灵感
          </p>
          <div className="flex justify-center gap-4">
            <Button className="px-8 py-4 text-lg">立即下载</Button>
            <Button variant="outline" className="px-8 py-4 text-lg">
              了解更多
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/95 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">无需会员</h3>
              <p className="text-gray-600">
                无需 Flomo 会员，即可在任意网页保存笔记
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">多端同步</h3>
              <p className="text-gray-600">
                与 Flomo 无缝集成，数据实时同步
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">智能分类</h3>
              <p className="text-gray-600">
                自动标签分类，轻松管理笔记
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">立即开始使用</h2>
          <p className="text-xl text-gray-600 mb-8">
            加入数千名用户，提升你的生产力
          </p>
          <Button className="px-12 py-6 text-xl">免费试用</Button>
        </div>
      </div>
    </div>
  )
}
