import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { useRef, useState, useEffect } from 'react'

export function Guide() {
  {/* 新增 metadata 设置 */}
  useEffect(() => {
    document.title = 'Flomo Extension 使用指南 - 浏览器插件安装使用教程'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Flomo浏览器扩展完整使用指南，包含插件安装教程、常见问题解答、售后服务说明以及功能演示。帮助您快速掌握Flomo插件的使用方法，提升笔记效率。')
    }
  }, [])
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('instruction')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('.content-section')
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0.5
      }
    )

    sections.forEach(section => {
      observerRef.current?.observe(section)
    })

    return () => {
      sections.forEach(section => {
        observerRef.current?.unobserve(section)
      })
    }
  }, [])

  const onAction = (action: string) => {
    const path = `#${action}`
    navigate(path)
    setActiveSection(action)
    const section = document.getElementById(action)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onDownload = () => {
    window.open(FLOMO_EXTENSION_FILE_URL)
  }
  const onWebStore = () => {
    window.open(FLOMO_EXTENSION_WEB_STORE_URL)
  }

  const showImages = () => {
    const imgList = [
      '/flomo-extension-shot1.png',
      '/flomo-extension-shot2.png',
      '/flomo-extension-shot3.png',
    ]
   
    return (
      <div className="space-y-8">
        {imgList.map((img, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img 
              src={img} 
              alt="flomo extension image" 
              className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="container">
          <div className="flex flex-col items-center text-center py-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Flomo Extension 使用指南
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              全面了解如何使用 Flomo 浏览器扩展，提升您的笔记效率
            </p>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            {/* Navigation */}
            <aside className="hidden md:block">
              <nav className="sticky top-20 space-y-4">
                <div className="space-y-1">
                  <a
                    onClick={() => onAction('instruction')}
                    className={`${activeSection === 'instruction' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
                  >
                    Flomo Extension 介绍
                  </a>
                  <a
                    onClick={() => onAction('install')}
                    className={`${activeSection === 'install' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
                  >
                    安装使用说明
                  </a>
                  <a
                    onClick={() => onAction('sale')}
                    className={`${activeSection === 'sale' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
                  >
                    售后服务
                  </a>
                  <a
                    onClick={() => onAction('faq')}
                    className={`${activeSection === 'faq' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
                  >
                    常见问题
                  </a>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={onDownload}
                    className="w-full"
                  >
                    立即下载插件
                  </Button>
                  <Button 
                    onClick={onWebStore}
                    className="w-full"
                    variant="outline"
                  >
                    浏览器扩展商店安装
                  </Button>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-8">
              {/* Overview Section */}
              <section id="instruction" className="content-section space-y-6">
                <h2 className="text-2xl font-bold">Flomo Extension 是什么？</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-lg">
                    <a href="https://help.flomoapp.com">flomo 浮墨笔记</a>
                    ，是一款全平台的卡片笔记，聚焦帮你记录更多想法与灵感，以及更好回顾过往记录。
                  </p>
                  <div className="mt-6 p-6 bg-muted/50 rounded-lg">
                    <p>本插件是为了方便在浏览器上使用时可以随时同步到 flomo 平台而生，简而言之，Flomo Extension 是一个在浏览器上记录 flomo 笔记的插件。</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold">功能演示</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">插件运行截图</h3>
                    {showImages()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">快速记录演示</h3>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <video className="w-full" controls autoPlay muted playsInline>
                        <source src="/flomo-extension-usage-1.mp4"></source>
                      </video>
                    </div>
                  </div>
                </div>
              </section>

              {/* Install Section */}
              <section id="install" className="content-section space-y-6">
                <h2 className="text-2xl font-bold">如何安装 Flomo Extension</h2>
                <div className="space-y-6">
                  <div className="grid gap-3 p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-lg font-semibold">离线安装</h3>
                    <div className="grid gap-3">
                      <p>离线安装步骤：</p>
                      <p>1. 点击左侧【立即下载插件】按钮下载插件的安装文件 zip，下载完成后自行解压</p>
                      <p>2. 打开 Chrome 浏览器，进入 chrome://extensions/</p>
                      <p>3. 开启页面右上角的 “开发者模式”</p>
                      <p>4. 点击 “加载已解压的扩展程序” 并选择解压的文件夹</p>
                      <p>5. 在浏览器的工具栏中点击该插件，即可正常使用</p>
                    </div>
                  </div>
                  <div className="grid gap-3 p-4 bg-muted/50 rounded-lg">
                    <h3 className="text-lg font-semibold">浏览器应用商店安装</h3>
                    <div className="grid gap-3">
                      <p>在线安装步骤：</p>
                      <p>1. 点击左侧【浏览器扩展商店安装】按钮跳转到浏览器应用商店扩展页面</p>
                      <p>2. 按照提示完成安装</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold">如何使用 Flomo Extension</h2>
                <div className="prose prose-sm max-w-none">
                  <div className="grid gap-3 mb-4">
                    <p>1. 下载并安装 flomo extension 扩展，参考这里：<a href="/guide?action=install"><b>安装说明</b></a></p>
                    <p>2. 点击 flomo extension 扩展，登录自己的账号</p>
                    <p>3. 在【写笔记】页面输入笔记内容，点击【保存 flomo 笔记】按钮</p>
                    <p>4. 若笔记保存不成功，需要按照提示打开 flomo 页面并登录自己的账号（非会员账号也行）</p>
                    <p>5. 若当天的免费次数用完，点击<a href="/plans">这里</a>升级 <b>PRO</b> 套餐</p>
                  </div>
                </div>
              </section>

              {/* Sale Section */}
              <section id="sale" className="content-section space-y-6">
                <h2 className="text-2xl font-bold">售后服务</h2>
                <div className="prose prose-sm max-w-none">
                  <div className="grid gap-3 mb-4">
                    <p>如果您遇到了解决不了的问题，请扫描添加下面二维码（烦请备注：flomo插件）:</p>
                    <p>
                      <img src="/hotstrip-wx.jpg" className="w-60 rounded-lg shadow-md"></img>
                    </p>
                  </div>
                  <div className="grid gap-3 mb-4">
                    <p>如果您对该插件不满意:</p>
                    <p>欢迎您通过<a href="https://txc.qq.com/products/648748"><b>兔小巢</b></a>反馈您的意见，我们会及时跟进处理。</p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="content-section space-y-6">
                <h2 className="text-2xl font-bold">常见问题</h2>
                <div className="prose prose-sm max-w-none">
                  <div className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">1. 插件无法正常使用怎么办？</h3>
                      <div className="grid gap-2">
                        <p>• 确保已按照<a href="/?action=install"><b>安装说明</b></a>正确安装插件</p>
                        <p>• 检查浏览器是否支持该插件（推荐使用最新版 Chrome 或 Edge）</p>
                        <p>• 尝试重新启动浏览器</p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">2. 笔记无法同步怎么办？</h3>
                      <div className="grid gap-2">
                        <p>• 确保已登录 flomo 账号</p>
                        <p>• 检查网络连接是否正常</p>
                        <p>• 尝试刷新页面或重新登录</p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">3. 如何升级到 PRO 版本？</h3>
                      <div className="grid gap-2">
                        <p>• 访问<a href="/plans"><b>套餐页面</b></a>选择适合的套餐</p>
                        <p>• 按照提示完成支付</p>
                        <p>• 刷新页面即可享受 PRO 功能</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
