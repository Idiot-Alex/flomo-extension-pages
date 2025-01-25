import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Header } from './Header'
import { Footer } from './Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Guide() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
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
    const path = `?action=${action}`
    navigate(path)
  }

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const showImages = () => {
    const imgList = [
      '/flomo-extension-shot1.png',
      '/flomo-extension-shot2.png',
      '/flomo-extension-shot3.png',
    ]
   
    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {imgList.map((img, index) => (
            <CarouselItem key={index} className="lg:basis">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={img} alt="flomo extension image" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/50 via-background/95 to-background">
        <div className="container">
          <div className="flex flex-col items-center text-center py-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Flomo Extension 使用指南
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              全面了解如何使用 Flomo 浏览器扩展，提升您的笔记效率
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          {/* Navigation */}
          <aside className="hidden md:block">
            <nav className="sticky top-20 space-y-1">
              <a
                onClick={() => onAction('overview')}
                className={`${activeSection === 'overview' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
              >
                概览
              </a>
              <a
                onClick={() => onAction('features')}
                className={`${activeSection === 'features' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
              >
                功能详解
              </a>
              <a
                onClick={() => onAction('faq')}
                className={`${activeSection === 'faq' ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-accent/50 cursor-pointer`}
              >
                常见问题
              </a>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {/* Overview Section */}
            {(location.search.indexOf('overview') > -1) || !location.search ? (
              <section id="overview" className="space-y-6">
                <h2 className="text-2xl font-bold">Flomo Extension 概览</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-lg">
                    Flomo Extension 是一个功能强大的浏览器扩展，旨在提升您在 flomo 上的笔记体验。
                  </p>
                  <div className="mt-6 p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">主要功能</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">1</span>
                        <span>快速记录想法和灵感</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">2</span>
                        <span>一键保存网页内容到 flomo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">3</span>
                        <span>随时随地访问您的 flomo 笔记</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            ) : null}
            {/* Features Section */}
            {location.search.indexOf('features') > -1 ? (
              <section id="features" className="space-y-6">
                <h2 className="text-2xl font-bold">功能详解</h2>
                <div className="space-y-4">
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">快速记录</h3>
                    <div className="prose prose-sm">
                      <ol className="space-y-3">
                        <li>点击浏览器工具栏中的 flomo 图标</li>
                        <li>在弹出的窗口中输入笔记内容</li>
                        <li>点击保存即可将笔记同步到您的 flomo 账户</li>
                      </ol>
                    </div>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">网页保存</h3>
                    <div className="prose prose-sm">
                      <ol className="space-y-3">
                        <li>在任意网页上右键点击</li>
                        <li>选择 "保存到 flomo" 选项</li>
                        <li>选择要保存的内容区域</li>
                        <li>添加备注后点击保存</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            {/* FAQ Section */}
            {location.search.indexOf('faq') > -1 ? (
              <section id="faq" className="space-y-6">
                <h2 className="text-2xl font-bold">常见问题</h2>
                <div className="space-y-4">
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">如何登录？</h3>
                    <p className="prose prose-sm">点击扩展图标，使用您的 flomo 账号登录即可。</p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">保存失败怎么办？</h3>
                    <p className="prose prose-sm">请确保您已登录 flomo 网页版，并检查网络连接。</p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-4">如何升级到 PRO 版本？</h3>
                    <p className="prose prose-sm">点击<a href="/plans" className="text-primary hover:underline">这里</a>查看 PRO 套餐详情。</p>
                  </div>
                </div>
              </section>
            ) : null}

            {/* Demo Section */}
            {(location.search.indexOf('overview') > -1) || !location.search ? (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold">功能演示</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">快速记录演示</h3>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <video className="w-full" controls autoPlay muted playsInline>
                        <source src="/flomo-extension-usage-1.mp4"></source>
                      </video>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">插件运行截图</h3>
                    {showImages()}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
