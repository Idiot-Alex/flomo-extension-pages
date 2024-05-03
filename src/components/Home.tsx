import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useNavigate, useLocation } from 'react-router-dom'
import { FLOMO_EXTENSION_FILE_URL } from '@/lib/type'

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

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Flomo Extension 说明</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
          <a onClick={() => onAction('instruction')} className="font-semibold text-primary cursor-pointer">Flomo Extension 介绍</a>
          <a onClick={() => onAction('install')} className="text-primary cursor-pointer">安装说明</a>
          <a onClick={() => onAction('usage')} className="text-primary cursor-pointer">使用说明</a>
          <a onClick={() => onAction('sale')} className="text-primary cursor-pointer">售后服务</a>
        </nav>
        <div className="grid gap-6">
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
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={onDownload}>立即下载插件</Button>
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
                <div className="grid gap-3 mb-4">
                  <p>本插件目前只能离线安装：</p>
                  <p>1. 下载插件的安装文件 zip，下载完成后自行解压</p>
                  <p>2. 打开 Chrome 浏览器，进入 chrome://extensions/</p>
                  <p>3. 开启页面右上角的 “开发者模式”</p>
                  <p>4. 点击 “加载已解压的扩展程序” 并选择解压的文件夹</p>
                  <p>5. 在浏览器的工具栏中点击该插件，即可正常使用</p>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4"></CardFooter>
            </Card> : ''
          }
          {
            location.search.indexOf('usage') > -1 ?
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>如何安装 Flomo Extension</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 mb-4">
                  <p>本插件目前只能离线安装：</p>
                  <p>1. 下载插件的安装文件 zip，下载完成后自行解压</p>
                  <p>2. 打开 Chrome 浏览器，进入 chrome://extensions/</p>
                  <p>3. 开启页面右上角的 “开发者模式”</p>
                  <p>4. 点击 “加载已解压的扩展程序” 并选择解压的文件夹</p>
                  <p>5. 在浏览器的工具栏中点击该插件，即可正常使用</p>
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
        </div>
      </div>
    </>
  )
}