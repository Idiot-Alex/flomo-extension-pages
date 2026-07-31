import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { useRef, useState, useEffect } from 'react'

const guideSections = [
  ['instruction', '插件介绍'],
  ['install', '安装与首次保存'],
  ['faq', '故障排查'],
  ['sale', '联系支持'],
] as const

const guideScreenshots = [
  {
    src: '/flomo-extension-shot1.webp',
    title: '登录与使用引导',
    alt: 'Flomo Extension 登录与首次使用引导界面',
  },
  {
    src: '/flomo-extension-shot2.webp',
    title: '编辑器与设置',
    alt: 'Flomo Extension 编辑器与设置界面',
  },
  {
    src: '/flomo-extension-shot3.webp',
    title: '连接 flomo 网页',
    alt: 'Flomo Extension 在已登录的 flomo 网页中打开编辑器的界面',
  },
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
    return (
      <div className="space-y-6">
        {guideScreenshots.map((screenshot) => (
          <figure
            key={screenshot.src}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-whisper"
          >
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
              width="1200"
              height="900"
            />
            <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
              {screenshot.title}
            </figcaption>
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
              从安装到第一次保存，说明扩展与 flomo 网页如何配合、草稿存在哪里，以及保存失败时如何逐项排查。
            </p>
            <p className="mt-4 text-sm text-muted-foreground">适用于 Chrome 版 v1.20.0 · 内容核验于 2026 年 8 月 1 日</p>
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
                    onClick={() => window.open(FLOMO_EXTENSION_WEB_STORE_URL, '_blank', 'noopener,noreferrer')}
                    className="w-full"
                  >
                    Chrome 扩展商店安装
                  </Button>
                  <Button 
                    onClick={onDownload}
                    className="w-full"
                    variant="outline"
                  >
                    下载 ZIP 安装包
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
                  <p className="text-lg">Flomo Extension 是由独立开发者维护的 Chrome 扩展，用于把当前网页里的输入或主动选中的文字整理成草稿，再保存到用户已经登录的 flomo 网页端。</p>
                  <div className="mt-6 border-l-2 border-primary bg-accent/55 p-6">
                    <p>它不是 flomo 官方产品，也不包含 flomo 官方会员。免费使用不要求注册 Flomo Extension 账户，但保存笔记前仍需在浏览器中打开并登录自己的 flomo 网页账户。</p>
                  </div>
                  <p>需要了解 flomo 官方产品、账户或网页端的使用方式，请查看 <a href="https://help.flomoapp.com/" target="_blank" rel="noreferrer">flomo 官方帮助中心</a>。</p>
                </div>
                <h2 className="font-editorial text-3xl font-medium">先区分三种登录状态</h2>
                <dl className="border-t border-border text-sm leading-7">
                  <div className="grid gap-2 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <dt className="font-medium text-foreground">flomo 网页登录</dt>
                    <dd className="text-muted-foreground">真实保存所必需。必须在当前浏览器窗口登录可用的 flomo 网页账户，并打开“全部笔记”页面。</dd>
                  </div>
                  <div className="grid gap-2 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <dt className="font-medium text-foreground">本站 Extension 登录</dt>
                    <dd className="text-muted-foreground">用于购买套餐和查看账户状态；免费模式不要求登录。</dd>
                  </div>
                  <div className="grid gap-2 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <dt className="font-medium text-foreground">扩展弹窗登录</dt>
                    <dd className="text-muted-foreground">用于识别付费套餐与到期时间。它与本站登录状态不会自动同步，付费用户应在扩展内登录购买时同一 Flomo Extension 账户。</dd>
                  </div>
                </dl>
                <h2 className="font-editorial text-3xl font-medium">一次保存实际经过哪些步骤？</h2>
                <ol className="grid gap-4 border-t border-border text-sm leading-7 text-muted-foreground">
                  <li className="border-b border-border py-4"><b className="text-foreground">1. 形成草稿：</b>直接在扩展编辑器输入，或在网页中选中文字后点击“添加到 flomo extension 草稿”。只有点击该按钮后，选中文字才会加入草稿。</li>
                  <li className="border-b border-border py-4"><b className="text-foreground">2. 本地保存：</b>草稿、当天保存次数和 flomo 标签页标识保存在浏览器扩展的本地存储中。</li>
                  <li className="border-b border-border py-4"><b className="text-foreground">3. 连接网页：</b>扩展查找已经打开的 <code>v.flomoapp.com</code> 标签页，并与页面中的扩展脚本建立连接。</li>
                  <li className="border-b border-border py-4"><b className="text-foreground">4. 提交内容：</b>点击保存后，扩展把草稿填入 flomo 网页编辑器并触发网页上的保存按钮；页面脚本返回正向结果后会清空本地草稿，但仍需回到 flomo 笔记列表确认最终结果。</li>
                </ol>
                <h2 className="font-editorial text-3xl font-medium">功能演示</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">三个当前产品界面</h3>
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
                    <h3 className="text-lg font-medium">推荐：Chrome 扩展商店安装</h3>
                    <div className="grid gap-3">
                      <p>1. 点击页面中的“Chrome 扩展商店安装”打开扩展详情页。</p>
                      <p>2. 核对扩展名称与开发者信息后，按 Chrome 提示完成安装。</p>
                      <p>3. 在扩展菜单中固定 Flomo Extension，方便在阅读时打开。</p>
                    </div>
                  </div>
                  <div className="grid gap-3 border-t border-border py-5">
                    <h3 className="text-lg font-medium">备选：下载 ZIP 手动安装</h3>
                    <div className="grid gap-3">
                      <p>1. 点击“下载 ZIP 安装包”获取文件，并在本地解压。</p>
                      <p>2. 在地址栏打开 <code>chrome://extensions/</code>，开启“开发者模式”。</p>
                      <p>3. 点击“加载已解压的扩展程序”，选择刚才解压的文件夹。</p>
                      <p>4. 手动安装不会自动更新；后续版本需要重新下载并核对来源。</p>
                    </div>
                  </div>
                </div>
                <h2 className="font-editorial text-3xl font-medium">第一次触发保存</h2>
                <div className="prose max-w-none">
                  <div className="grid gap-3 mb-4">
                    <p>1. 先打开 <a href="https://v.flomoapp.com/mine" target="_blank" rel="noreferrer">flomo 的“全部笔记”页面</a>，并登录自己的 flomo 账户。</p>
                    <p>2. 保留该标签页，再从 Chrome 工具栏打开 Flomo Extension。</p>
                    <p>3. 在编辑器输入内容；也可以先在普通 HTTP/HTTPS 网页选中文字，点击浮动按钮后再打开扩展检查草稿。浏览器内部页和 Chrome 扩展商店等受限页面不适用。</p>
                    <p>4. 点击“保存 flomo 笔记”。扩展收到页面脚本的正向结果后，请回到 flomo 页面确认笔记已经出现。</p>
                    <p>5. 当前免费规则为每日 2 次保存机会，不要求登录 Flomo Extension 账户；次数按浏览器本地日期，并在 flomo 页面脚本返回正向结果后计数。</p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="content-section scroll-mt-28 space-y-7 border-t border-border pt-12">
                <p className="kami-eyebrow">02 · 故障排查</p>
                <h2 className="font-editorial text-3xl font-medium">按照提示定位保存问题</h2>
                <div className="prose max-w-none">
                  <div className="space-y-6">
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">“保存 flomo 笔记”按钮不可点击</h3>
                      <div className="grid gap-2">
                        <p>扩展没有在当前窗口找到 flomo 标签页。打开 <code>https://v.flomoapp.com/mine</code>，等待页面完成加载，再关闭并重新打开扩展窗口。</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">提示“找不到 flomo 编辑框”</h3>
                      <div className="grid gap-2">
                        <p>确认 flomo 网页已经登录，并进入“全部笔记”页面。若页面刚更新或长时间未刷新，刷新 flomo 标签页后再试。</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">提示当天免费次数已用完</h3>
                      <div className="grid gap-2">
                        <p>当前免费规则为每日 2 次保存机会。次数按浏览器本地日期，并在 flomo 页面脚本返回正向结果后计数。达到上限后，可以在下一个本地日期再试，或在<a href="/plans">套餐页面</a>查看第三方扩展的付费权益。</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">扩展显示正向反馈，但 flomo 中没有新笔记</h3>
                      <div className="grid gap-2">
                        <p>当前版本的正向反馈表示扩展已经向 flomo 网页触发保存动作，并不替代 flomo 服务端的最终确认。请回到 flomo 页面检查登录状态、页面提示和实际笔记列表。</p>
                      </div>
                    </div>
                    <div className="border-t border-border py-5">
                      <h3 className="mb-2 text-lg font-medium">支付后扩展仍显示 Free</h3>
                      <div className="grid gap-2">
                        <p>支付确认后后台会更新权益，但已发布扩展不会自动刷新本地账户摘要。请在扩展弹窗内退出，并使用购买时同一 Flomo Extension 账户重新登录。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sale Section */}
              <section id="sale" className="content-section scroll-mt-28 space-y-7 border-t border-border pt-12">
                <p className="kami-eyebrow">03 · 联系支持</p>
                <h2 className="font-editorial text-3xl font-medium">仍未解决？</h2>
                <div className="prose max-w-none">
                  <p>发送邮件至 <a href="mailto:flomo-extension@idiotalex.com">flomo-extension@idiotalex.com</a>，或通过<a href="https://txc.qq.com/products/648748" target="_blank" rel="noreferrer">问题反馈页面</a>提交信息。</p>
                  <p>请附上 Chrome 版本、扩展版本、看到的完整提示，以及问题发生在“打开扩展”“连接 flomo 页面”还是“点击保存”哪一步。不要发送密码、验证码或完整支付凭据。</p>
                  <p><img src="/hotstrip-wx.jpg" alt="Flomo Extension 微信支持二维码" className="w-60 rounded-xl border border-border" loading="lazy" decoding="async" width="950" height="1295"></img></p>
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
