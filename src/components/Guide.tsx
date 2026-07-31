import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { useRef, useState, useEffect } from 'react'

const guideSections = [
  ['instruction', '插件介绍'],
  ['install', '安装使用'],
  ['sale', '售后服务'],
  ['faq', '常见问题'],
] as const

export function Guide() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
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

  useEffect(() => {
    const requestedSection = searchParams.get('action')
    if (!requestedSection || !['instruction', 'install', 'sale', 'faq'].includes(requestedSection)) {
      return
    }

    setActiveSection(requestedSection)
    document.getElementById(requestedSection)?.scrollIntoView({ behavior: 'smooth' })
  }, [searchParams])

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
    window.open(FLOMO_EXTENSION_FILE_URL, '_blank', 'noopener,noreferrer')
  }

  const showImages = () => {
    const imgList = [
      '/flomo-extension-shot1.webp',
      '/flomo-extension-shot2.webp',
      '/flomo-extension-shot3.webp',
      '/flomo-extension-shot4.webp',
    ]
   
    return (
      <div className="space-y-6">
        {imgList.map((img, index) => (
          <figure
            key={index}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-whisper"
          >
            <img 
              src={img} 
              alt={`Flomo Extension 功能截图 ${index + 1}`}
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
              width="1200"
              height="900"
            />
          </figure>
        ))}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main id="main-content" className="flex flex-1 flex-col bg-background">
        <div className="kami-page py-16 sm:py-20">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="kami-eyebrow">产品手册</p>
            <h1 className="kami-page-title mt-5 max-w-4xl">
              Flomo Extension 使用指南
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              从安装到第一次记录，快速了解 Flomo 浏览器扩展的完整使用方式。
            </p>
          </header>

          <nav className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 py-4 md:hidden" aria-label="指南章节">
            {guideSections.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => onAction(id)}
                className={`${activeSection === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'} shrink-0 border-b-2 px-3 py-2 text-sm font-medium`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="grid gap-10 py-12 md:grid-cols-[210px_minmax(0,720px)] md:justify-between md:py-16">
            {/* Navigation */}
            <aside className="hidden md:block">
              <nav className="sticky top-24 space-y-6" aria-label="指南章节">
                <div className="border-l border-border">
                  {guideSections.map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onAction(id)}
                      className={`${activeSection === id ? '-ml-px border-primary font-medium text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'} block w-full border-l-2 px-4 py-2 text-left text-sm transition-colors`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={onDownload}
                    className="w-full"
                  >
                    立即下载插件
                  </Button>
                  <Button 
                    onClick={() => window.open(FLOMO_EXTENSION_WEB_STORE_URL, '_blank', 'noopener,noreferrer')}
                    className="w-full"
                    variant="outline"
                  >
                    Chrome 扩展商店安装
                  </Button>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-16">
              {/* Overview Section */}
              <section id="instruction" className="content-section scroll-mt-28 space-y-7">
                <p className="kami-eyebrow">00 · 产品介绍</p>
                <h2 className="font-editorial text-3xl font-medium">Flomo Extension 是什么？</h2>
                <div className="prose max-w-none">
                  <p className="text-lg">
                    <a href="https://help.flomoapp.com">flomo 浮墨笔记</a>
                    ，是一款全平台的卡片笔记，聚焦帮你记录更多想法与灵感，以及更好回顾过往记录。
                  </p>
                  <div className="mt-6 border-l-2 border-primary bg-accent/55 p-6">
                    <p>本插件是为了方便在浏览器上使用时可以随时同步到 flomo 平台而生，简而言之，Flomo Extension 是一个在浏览器上记录 flomo 笔记的插件。</p>
                  </div>
                </div>
                <h2 className="font-editorial text-3xl font-medium">功能演示</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">插件运行截图</h3>
                    {showImages()}
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">快速记录演示</h3>
                    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-whisper">
                      <video className="w-full" controls muted playsInline preload="metadata" poster="/flomo-extension-shot1.webp">
                        <source src="/flomo-extension-usage-1.mp4"></source>
                      </video>
                    </div>
                  </div>
                </div>
              </section>

              {/* Install Section */}
              <section id="install" className="content-section scroll-mt-28 space-y-7 border-t border-border pt-12">
                <p className="kami-eyebrow">01 · 安装使用</p>
                <h2 className="font-editorial text-3xl font-medium">如何安装 Flomo Extension</h2>
                <div className="space-y-6">
                  <div className="grid gap-3 border-t border-border py-5">
                    <h3 className="text-lg font-medium">离线安装</h3>
                    <div className="grid gap-3">
                      <p>离线安装步骤：</p>
                      <p>1. 点击左侧【立即下载插件】按钮下载插件的安装文件 zip，下载完成后自行解压</p>
                      <p>2. 打开 Chrome 浏览器，进入 chrome://extensions/</p>
                      <p>3. 开启页面右上角的 “开发者模式”</p>
                      <p>4. 点击 “加载已解压的扩展程序” 并选择解压的文件夹</p>
                      <p>5. 在浏览器的工具栏中点击该插件，即可正常使用</p>
                    </div>
                  </div>
                  <div className="grid gap-3 border-t border-border py-5">
                    <h3 className="text-lg font-medium">浏览器应用商店安装</h3>
                    <div className="grid gap-3">
                      <p>在线安装步骤：</p>
                      <p>1. 点击左侧【浏览器扩展商店安装】按钮跳转到浏览器应用商店扩展页面</p>
                      <p>2. 按照提示完成安装</p>
                    </div>
                  </div>
                </div>
                <h2 className="font-editorial text-3xl font-medium">如何使用 Flomo Extension</h2>
                <div className="prose max-w-none">
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
              <section id="sale" className="content-section scroll-mt-28 space-y-7 border-t border-border pt-12">
                <p className="kami-eyebrow">02 · 售后服务</p>
                <h2 className="font-editorial text-3xl font-medium">售后服务</h2>
                <div className="prose max-w-none">
                  <div className="grid gap-3 mb-4">
                    <p>如果您遇到了解决不了的问题，请扫描添加下面二维码（烦请备注：flomo插件）:</p>
                    <p>
                      <img src="/hotstrip-wx.jpg" alt="Flomo 插件售后服务微信二维码" className="w-60 rounded-xl border border-border" loading="lazy" decoding="async" width="950" height="1295"></img>
                    </p>
                  </div>
                  <div className="grid gap-3 mb-4">
                    <p>如果您对该插件不满意:</p>
                    <p>欢迎您通过<a href="https://txc.qq.com/products/648748"><b>兔小巢</b></a>反馈您的意见，我们会及时跟进处理。</p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="content-section scroll-mt-28 space-y-7 border-t border-border pt-12">
                <p className="kami-eyebrow">03 · 常见问题</p>
                <h2 className="font-editorial text-3xl font-medium">常见问题</h2>
                <div className="prose max-w-none">
                  <div className="space-y-6">
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">1. 插件无法正常使用怎么办？</h3>
                      <div className="grid gap-2">
                        <p>• 确保已按照<a href="/guide?action=install"><b>安装说明</b></a>正确安装插件</p>
                        <p>• 检查浏览器是否支持该插件（推荐使用最新版 Chrome）</p>
                        <p>• 尝试重新启动浏览器</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">2. 笔记无法同步怎么办？</h3>
                      <div className="grid gap-2">
                        <p>• 确保已登录 flomo 账号</p>
                        <p>• 检查网络连接是否正常</p>
                        <p>• 尝试刷新页面或重新登录</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">3. 如何升级到 PRO 版本？</h3>
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
