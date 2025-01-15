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
    const path = `/?action=${action}`
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
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Flomo Extension 说明</h1>
      </div>
      <div className="overflow-hidden h-[calc(100vh-200px)] mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
          <a onClick={() => onAction('instruction')} className="font-semibold text-primary cursor-pointer">Flomo Extension 介绍</a>
          <a onClick={() => onAction('install')} className="text-primary cursor-pointer">安装说明</a>
          <a onClick={() => onAction('usage')} className="text-primary cursor-pointer">使用说明</a>
          <a onClick={() => onAction('sale')} className="text-primary cursor-pointer">售后服务</a>
          <a onClick={() => onAction('privacy')} className="text-primary cursor-pointer">隐私政策</a>
        </nav>
        <div className="grid gap-6 overflow-y-auto h-[100%]">
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
                  <video className="w-80" controls autoPlay muted playsInline>
                    <source src="/flomo-extension-google-login.mp4"></source>
                  </video>
                </div>
                <div className="grid gap-3 mt-4">
                  <p>快速开始：</p>
                  <video className="w-[80%]" controls autoPlay muted playsInline>
                    <source src="/flomo-extension-usage-1.mp4"></source>
                  </video>
                </div>
                <div className="grid gap-3 mt-4">
                  <p>插件运行截图：</p>
                </div>
                <div className="grid gap-3 mb-4 justify-center">
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
                      <div className="grid gap-3 mb-4 p-4">
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
                      <div className="grid gap-3 mb-4 p-4">
                        <p>在线安装步骤：</p>
                        <p>1. 点击下面【浏览器扩展商店安装】按钮跳转到浏览器应用商店扩展页面</p>
                        <p>2. 按照提示完成安装</p>
                        <p>
                          <img src="/flomo-extension-webstore.png" alt="webstore.png"/>
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
                    <img src="/hotstrip-wx.jpg" className="w-60"></img>
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
          {
            location.search.indexOf('privacy') > -1 ?
            <Card>
              <CardHeader>
                <CardTitle>隐私政策</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 mb-4">
                  <p>生效日期： 2024 年 5 月 4 日</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>1. 引言</p>
                  <p>本隐私政策阐述了 Flomo Extension 扩展（以下简称“我们”或“我们的”）如何收集、使用、披露和保护您的个人信息。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>2. 信息收集</p>
                  <p>我们的扩展可能会收集以下信息以便提供和改进我们的服务：</p>
                  <p>用户的邮箱账号信息，用于扩展服务的注册。</p>
                  <p>用户使用邮箱注册本扩展服务需要设置密码，用于扩展服务的登录验证。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>3. 信息使用</p>
                  <p>我们使用收集的信息来：</p>
                  <p>提供在浏览器上记录 flomo 笔记服务。</p>
                  <p>改进我们的扩展功能和用户体验。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>4. 信息分享</p>
                  <p>我们不会与任何第三方分享您的个人信息，除非：</p>
                  <p>法律要求我们披露信息。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>5. 信息安全</p>
                  <p>我们采取适当的安全措施来保护您的个人信息不被未经授权的访问和泄露。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>6. 用户权利</p>
                  <p>您有权：</p>
                  <p>访问您的个人信息。</p>
                  <p>要求更正或删除不准确的个人信息。</p>
                  <p>撤回您对个人信息处理的同意。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>7. 第三方链接</p>
                  <p>我们的扩展可能包含指向第三方网站的链接，这些网站有它们自己的隐私政策。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>8. 隐私政策更新</p>
                  <p>我们可能会不时更新本隐私政策。任何变更将在本页面上公布。</p>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mb-4">
                  <p>9. 联系我们</p>
                  <p>如有任何关于隐私政策的疑问，请联系我们。</p>
                  <p>联系方式：</p>
                  <p>电子邮件：flomo-extension@idiotalex.com</p>
                  <p>网址：https://flomo-extension-pages.pages.dev/?action=privacy</p>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4"></CardFooter>
            </Card>
            : ''
          }
        </div>
      </div>
    </>
  )
}