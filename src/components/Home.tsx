import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
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
import { useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  const onAction = (action: string) => {
    const path = `?action=${action}`
    navigate(path)
  }

  const onDownload = () => {
    window.open(FLOMO_EXTENSION_FILE_URL)
  }
  const onWebStore = () => {
    window.open(FLOMO_EXTENSION_WEB_STORE_URL)
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Layout Container */}
      <div className="container flex flex-1">
        {/* Side Navigation */}
        <div className="hidden lg:block w-64 shrink-0">
          <aside className="sticky top-0 h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="h-full overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="px-4">
                  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Flomo Extension
                  </h2>
                  <nav className="flex flex-col space-y-1">
                    <a 
                      onClick={() => onAction('instruction')}
                      className={`${location.search.includes('instruction') || !location.search ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent/50 cursor-pointer`}
                    >
                      Flomo Extension 介绍
                    </a>
                    <a 
                      onClick={() => onAction('install')}
                      className={`${location.search.includes('install') ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent/50 cursor-pointer`}
                    >
                      安装说明
                    </a>
                    <a 
                      onClick={() => onAction('usage')}
                      className={`${location.search.includes('usage') ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent/50 cursor-pointer`}
                    >
                      使用说明
                    </a>
                    <a 
                      onClick={() => onAction('sale')}
                      className={`${location.search.includes('sale') ? 'bg-accent font-medium' : 'text-muted-foreground'} flex items-center px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent/50 cursor-pointer`}
                    >
                      售后服务
                    </a>
                  </nav>
                </div>
                <Separator />
              </div>
            </div>
          </aside>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <main className="h-full overflow-y-auto">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
              {/* Page Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Flomo Extension 说明</h1>
              </header>

              {/* Content Grid */}
              <div className="space-y-6">
            {
          (location.search.indexOf('instruction') > -1) || !location.search ?
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Flomo Extension 是什么？</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 mb-4">
                <p>
                  <a href="https://help.flomoapp.com">flomo 浮墨笔记</a>
                  ，是一款全平台的卡片笔记，聚焦帮你记录更多想法与灵感，以及更好回顾过往记录。
                </p>
              </div>
              <div className="grid gap-3 mb-4">
                <p>本插件是为了方便在浏览器上使用时可以随时同步到 flomo 平台而生，简而言之，Flomo Extension 是一个在浏览器上记录 flomo 笔记的插件。</p>
              </div>
              <div className="grid gap-3 mt-4">
                <p>新特性 Google 账号登录：</p>
                  <video className="w-full max-w-[320px] rounded-lg shadow-md" controls autoPlay muted playsInline>
                  <source src="/flomo-extension-google-login.mp4"></source>
                </video>
              </div>
              <div className="grid gap-3 mt-4">
                <p>快速开始：</p>
                  <video className="w-full max-w-[640px] rounded-lg shadow-md" controls autoPlay muted playsInline>
                  <source src="/flomo-extension-usage-1.mp4"></source>
                </video>
              </div>
              <div className="grid gap-3 mt-4">
                <p>插件运行截图：</p>
              </div>
                <div className="grid gap-4 mb-6 justify-center">
                {
                  showImages()
                }
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={onDownload}>立即下载插件</Button>
              <Button onClick={onWebStore} className="ml-2">浏览器扩展商店安装</Button>
            </CardFooter>
          </Card> : ''
        }
        {
          location.search.indexOf('install') > -1 ?
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>如何安装 Flomo Extension</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="p-4">离线安装</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 mb-4 p-4 bg-muted/50 rounded-lg">
                      <p>离线安装步骤：</p>
                      <p>1. 点击下面【立即下载插件】按钮下载插件的安装文件 zip，下载完成后自行解压</p>
                      <p>2. 打开 Chrome 浏览器，进入 chrome://extensions/</p>
                      <p>3. 开启页面右上角的 “开发者模式”</p>
                      <p>4. 点击 “加载已解压的扩展程序” 并选择解压的文件夹</p>
                      <p>5. 在浏览器的工具栏中点击该插件，即可正常使用</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="p-4">浏览器应用商店安装</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 mb-4 p-4 bg-muted/50 rounded-lg">
                      <p>在线安装步骤：</p>
                      <p>1. 点击下面【浏览器扩展商店安装】按钮跳转到浏览器应用商店扩展页面</p>
                      <p>2. 按照提示完成安装</p>
                      <p>
                        <img src="/flomo-extension-webstore.png" alt="webstore.png" className="rounded-lg shadow-md"/>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={onDownload}>立即下载插件</Button>
              <Button onClick={onWebStore} className="ml-2">浏览器扩展商店安装</Button>
            </CardFooter>
          </Card> : ''
        }
        {
          location.search.indexOf('usage') > -1 ?
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>如何使用 Flomo Extension</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 mb-4">
                <p>1. 下载并安装 flomo extension 扩展，参考这里：<a href="/?action=install"><b>安装说明</b></a></p>
                <p>2. 点击 flomo extension 扩展，登录自己的账号</p>
                <p>3. 在【写笔记】页面输入笔记内容，点击【保存 flomo 笔记】按钮</p>
                <p>4. 若笔记保存不成功，需要按照提示打开 flomo 页面并登录自己的账号（非会员账号也行）</p>
                <p>5. 若当天的免费次数用完，点击<a href="/plans">这里</a>升级 <b>PRO</b> 套餐</p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4"></CardFooter>
          </Card> : ''
        }
        {
          location.search.indexOf('sale') > -1 ?
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>售后服务</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter className="border-t px-6 py-4"></CardFooter>
          </Card> : ''
        }
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
