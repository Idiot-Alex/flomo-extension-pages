import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const screenshots = [
  {
    src: '/flomo-extension-shot1.webp',
    title: '登录与使用引导',
    caption: '查看扩展账户入口与首次使用说明。',
    alt: 'Flomo Extension 登录与首次使用引导界面',
  },
  {
    src: '/flomo-extension-shot2.webp',
    title: '编辑器与设置',
    caption: '在扩展编辑器整理草稿，并查看当前设置入口。',
    alt: 'Flomo Extension 编辑器与设置界面',
  },
  {
    src: '/flomo-extension-shot3.webp',
    title: '连接 flomo 网页',
    caption: '把草稿填入已登录的 flomo 网页并触发保存，再到笔记列表确认结果。',
    alt: 'Flomo Extension 在已登录的 flomo 网页中打开编辑器的界面',
  },
]

const features = [
  {
    number: '01',
    title: '阅读不中断',
    subtitle: '想法出现时，入口就在手边',
    description: '无需离开当前网页。打开扩展、写下内容、保存，然后继续阅读。',
  },
  {
    number: '02',
    title: '保存到自己的 flomo',
    subtitle: '记录路径更短，回顾方式不变',
    description: '扩展把草稿填入已经登录的 flomo 网页并触发保存，再由你回到笔记列表确认结果。保存功能不要求 flomo 官方会员，但必须登录可用的 flomo 网页账户。',
  },
  {
    number: '03',
    title: '免费版无需扩展账户',
    subtitle: '先用起来，再决定是否升级',
    description: '当前免费规则无需扩展账户，每日提供 2 次保存机会；需要更多次数时，再选择适合的套餐。',
  },
  {
    number: '04',
    title: 'Chrome 浏览器可用',
    subtitle: '跟着日常使用的浏览器走',
    description: '可从 Chrome 扩展商店安装，更新与日常使用都留在浏览器生态内。',
  },
]

const principles = [
  ['01', '打开扩展', '在当前页面点击浏览器工具栏中的 Flomo Extension。'],
  ['02', '写下想法', '记录刚刚出现的判断、摘录或下一步行动。'],
  ['03', '确认保存', '扩展在 flomo 网页中触发保存后，回到笔记列表确认结果。'],
  ['04', '回到阅读', '在 flomo 确认结果后关闭扩展，不让工具占据注意力。'],
]

const technicalGuides = [
  {
    title: '权限与数据流',
    description: '逐项解释 storage、tabs、alarms、identity，以及选中文本脚本为什么会在普通网页中运行。',
    to: '/posts/flomo-extension-permissions-data-flow',
  },
  {
    title: '真实保存流程',
    description: '了解扩展怎样连接已登录的 flomo 网页，以及为什么最终结果仍需要回到笔记列表确认。',
    to: '/posts/flomo-extension-save-flow-troubleshooting',
  },
  {
    title: '本地草稿边界',
    description: '说明网页选区何时进入草稿、哪些格式不会保留，以及重要内容为什么应先复制备份。',
    to: '/posts/flomo-extension-selection-draft-workflow',
  },
]

export function LandingPage() {
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveScreenshot((current) => (current + 1) % screenshots.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [])

  const screenshot = screenshots[activeScreenshot]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="main-content" className="kami-page">
        <header className="border-b py-16 sm:py-20 lg:py-24">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <p className="kami-eyebrow">浏览器记录工具 · v1.30.1</p>
            <div className="flex items-center gap-5">
              <Link to="/guide" className="transition-colors hover:text-primary">使用说明</Link>
            </div>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <h1 className="kami-display max-w-4xl lg:text-[3.25rem] xl:text-[3.75rem]">
                <span className="lg:block">在网页里记下这一刻，</span>
                <span className="text-primary lg:block">不打断阅读。</span>
              </h1>
              <p className="mt-7 max-w-2xl text-pretty font-editorial text-lg leading-8 text-muted-foreground sm:text-xl">
                浏览网页时整理本地草稿，再通过已登录的 flomo 网页触发保存，并到笔记列表确认结果。
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="outline" className="px-4 sm:px-7">
                  <Link to="/guide">查看使用指南</Link>
                </Button>
                <Button asChild size="lg" className="group px-4 sm:px-7">
                  <a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">
                    安装 Chrome 版
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {['免费版无需扩展账户', '支持 Chrome', '草稿保存在浏览器本地'].map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-5">
                    {item}
                    {index < 2 && <span className="text-primary/35" aria-hidden="true">·</span>}
                  </span>
                ))}
              </div>
            </div>

            <figure className="hidden lg:block">
              <div className="rounded-[1.75rem] border bg-card p-3 shadow-whisper">
                <img
                  src="/flomo-extension-home-1.png"
                  alt="Flomo Extension 在浏览器中快速记录笔记的编辑界面"
                  className="h-auto w-full rounded-[1.15rem] border bg-white"
                  width="524"
                  height="540"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-3 px-4 text-center text-xs leading-5 text-muted-foreground">
                打开扩展，写下内容，再回到正在阅读的页面。
              </figcaption>
            </figure>
          </div>
        </header>

        <section className="border-b py-16 sm:py-20" aria-labelledby="gallery-title">
          <div className="mb-9 max-w-2xl">
            <p className="kami-eyebrow">00 · 产品界面</p>
            <h2 id="gallery-title" className="kami-section-title mt-3">记录发生在原来的页面上</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">三个当前产品界面，分别展示使用引导、编辑器与连接 flomo 网页的状态。</p>
          </div>

          <div>
            <figure className="overflow-hidden rounded-xl border bg-[#171815] p-2 shadow-whisper sm:p-4">
              <img
                key={screenshot.src}
                src={screenshot.src}
                alt={screenshot.alt}
                className="aspect-[4/3] w-full rounded-lg object-contain motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                width="1200"
                height="900"
                decoding="async"
              />
            </figure>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-h-12">
                <p className="font-editorial text-lg font-medium">{screenshot.title}</p>
                <p className="mt-1 font-editorial text-sm leading-6 text-muted-foreground">{screenshot.caption}</p>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="选择产品截图">
                {screenshots.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActiveScreenshot(index)}
                    aria-pressed={activeScreenshot === index}
                    className={`h-8 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeScreenshot === index ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b py-16 sm:py-20" aria-labelledby="features-title">
          <div className="mb-8 max-w-2xl">
            <p className="kami-eyebrow">01 · 为什么更顺手</p>
            <h2 id="features-title" className="kami-section-title mt-3">只缩短记录路径，不改变你的笔记习惯</h2>
          </div>

          <ol className="border-t">
            {features.map((feature) => (
              <li key={feature.number} className="grid gap-3 border-b py-7 sm:grid-cols-[3rem_13rem_1fr] sm:gap-7">
                <span className="font-mono text-xs tabular-nums text-primary">{feature.number}</span>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-primary">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{feature.subtitle}</p>
                </div>
                <p className="max-w-xl text-sm leading-7 text-foreground/80">{feature.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b py-16 sm:py-20" aria-labelledby="workflow-title">
          <div className="mb-8 max-w-2xl">
            <p className="kami-eyebrow">02 · 四步记录</p>
            <h2 id="workflow-title" className="kami-section-title mt-3">记下来，然后继续读</h2>
          </div>

          <ol className="grid border-t sm:grid-cols-2">
            {principles.map(([number, title, description], index) => (
              <li key={number} className={`grid grid-cols-[2.5rem_1fr] gap-3 border-b py-6 sm:px-7 ${index % 2 === 0 ? 'sm:border-r sm:pl-0' : 'sm:pr-0'}`}>
                <span className="font-editorial text-lg text-primary">{number}</span>
                <div>
                  <h3 className="font-editorial text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b py-16 sm:py-20" aria-labelledby="technical-guides-title">
          <div className="mb-8 max-w-2xl">
            <p className="kami-eyebrow">03 · 实现与边界</p>
            <h2 id="technical-guides-title" className="kami-section-title mt-3">安装前，先知道扩展具体会做什么</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">以下文档根据 Chrome 版 v1.30.1 源码核验，明确区分浏览器本地草稿、Flomo Extension 账户和 flomo 网页账户。</p>
          </div>

          <div className="grid border-t md:grid-cols-3">
            {technicalGuides.map((guide, index) => (
              <article key={guide.to} className={`flex flex-col border-b py-7 md:px-7 ${index < technicalGuides.length - 1 ? 'md:border-r' : ''} ${index === 0 ? 'md:pl-0' : ''} ${index === technicalGuides.length - 1 ? 'md:pr-0' : ''}`}>
                <h3 className="font-editorial text-xl font-medium">{guide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{guide.description}</p>
                <Link to={guide.to} className="mt-5 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline">
                  阅读完整说明
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 text-center sm:py-24" aria-labelledby="start-title">
          <p className="kami-eyebrow">04 · 从免费版开始</p>
          <h2 id="start-title" className="kami-section-title mx-auto mt-3 max-w-2xl">下一次灵感出现时，直接把它留下来。</h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-2 font-editorial text-base leading-7 text-foreground/80">
            <li>无需创建另一套笔记系统</li>
            <li>当前每天提供 2 次保存机会，免费版无需扩展账户</li>
            <li>需要更多次数时再升级套餐</li>
          </ul>
          <p className="mt-7 font-editorial text-xl tabular-nums">付费套餐从 ¥1.9 / 月起</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="outline"><Link to="/plans">查看套餐</Link></Button>
            <Button asChild size="lg"><a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">立即安装</a></Button>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">支持微信与支付宝；支付确认后后台更新权益。若扩展仍显示 Free，请在扩展内退出，并使用购买时同一 Flomo Extension 账户重新登录。</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
