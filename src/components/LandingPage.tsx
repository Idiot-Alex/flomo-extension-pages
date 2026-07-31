import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FLOMO_EXTENSION_EDGE_STORE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const screenshots = [
  {
    src: '/flomo-extension-shot1.webp',
    title: '写下这一刻',
    caption: '入口留在浏览器里，思路仍在原来的页面上。',
    alt: 'Flomo Extension 在浏览器中快速记录笔记的界面',
  },
  {
    src: '/flomo-extension-shot2.webp',
    title: '保持熟悉的记录方式',
    caption: '内容直接同步到自己的 Flomo 账户。',
    alt: 'Flomo Extension 编辑并同步笔记的界面',
  },
  {
    src: '/flomo-extension-shot3.webp',
    title: '从网页到笔记',
    caption: '少一次切换，灵感就少一次丢失。',
    alt: 'Flomo Extension 从网页保存内容的界面',
  },
  {
    src: '/flomo-extension-shot4.webp',
    title: '继续阅读',
    caption: '记完就回到正在发生的思考。',
    alt: 'Flomo Extension 完成笔记保存后的界面',
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
    title: '直接同步到 Flomo',
    subtitle: '记录路径更短，回顾方式不变',
    description: '笔记仍进入你自己的 Flomo 账户，不需要迁移已有内容或建立另一套系统。',
  },
  {
    number: '03',
    title: '免费版无需注册',
    subtitle: '先用起来，再决定是否升级',
    description: '轻量记录可以直接开始；需要更多每日次数时，再选择适合的套餐。',
  },
  {
    number: '04',
    title: 'Chrome 与 Edge 可用',
    subtitle: '跟着日常使用的浏览器走',
    description: '可从 Chrome 或 Edge 扩展商店安装，更新与日常使用都留在浏览器生态内。',
  },
]

const principles = [
  ['01', '打开扩展', '在当前页面点击浏览器工具栏中的 Flomo Extension。'],
  ['02', '写下想法', '记录刚刚出现的判断、摘录或下一步行动。'],
  ['03', '同步保存', '内容进入自己的 Flomo 账户，继续原来的回顾习惯。'],
  ['04', '回到阅读', '保存完成后关闭扩展，不让工具占据注意力。'],
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
            <p className="kami-eyebrow">浏览器记录工具 · v1.20.0</p>
            <div className="flex items-center gap-5">
              <a href={FLOMO_EXTENSION_EDGE_STORE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">Edge</a>
              <Link to="/guide" className="transition-colors hover:text-primary">使用说明</Link>
            </div>
          </div>

          <h1 className="mt-10 max-w-4xl text-balance font-editorial text-5xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]">
            在网页里记下这一刻，<span className="text-primary">不打断阅读。</span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty font-editorial text-lg leading-8 text-muted-foreground sm:text-xl">
            浏览网页时直接把想法同步到自己的 Flomo 账户。
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="outline">
              <Link to="/guide">查看使用指南</Link>
            </Button>
            <Button asChild size="lg" className="group">
              <a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">
                安装 Chrome 版
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {['免费版无需注册', '支持 Chrome / Edge', '不存储 Flomo 笔记内容'].map((item, index) => (
              <span key={item} className="inline-flex items-center gap-5">
                {item}
                {index < 2 && <span className="text-primary/35" aria-hidden="true">·</span>}
              </span>
            ))}
          </div>
        </header>

        <section className="border-b py-16 sm:py-20" aria-labelledby="gallery-title">
          <div className="mb-9 max-w-2xl">
            <p className="kami-eyebrow">00 · 产品界面</p>
            <h2 id="gallery-title" className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">记录发生在原来的页面上</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">四个真实界面，展示从打开扩展到保存完成的完整路径。</p>
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
            <h2 id="features-title" className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">只缩短记录路径，不改变你的笔记习惯</h2>
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
            <h2 id="workflow-title" className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">记下来，然后继续读</h2>
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

        <section className="py-16 text-center sm:py-24" aria-labelledby="start-title">
          <p className="kami-eyebrow">03 · 从免费版开始</p>
          <h2 id="start-title" className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">下一次灵感出现时，直接把它留下来。</h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-2 font-editorial text-base leading-7 text-foreground/80">
            <li>无需创建另一套笔记系统</li>
            <li>免费版可以直接使用</li>
            <li>需要更多次数时再升级套餐</li>
          </ul>
          <p className="mt-7 font-editorial text-xl tabular-nums">付费套餐从 ¥1.9 / 月起</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="outline"><Link to="/plans">查看套餐</Link></Button>
            <Button asChild size="lg"><a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">立即安装</a></Button>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">支持微信与支付宝；支付成功后会员权益自动生效。</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
