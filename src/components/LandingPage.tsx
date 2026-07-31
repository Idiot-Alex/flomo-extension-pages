import { ArrowRight, Check, MousePointer2, PenLine, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FLOMO_EXTENSION_EDGE_STORE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const features = [
  {
    number: '01',
    title: '阅读不中断',
    description: '不用离开当前网页，打开扩展就能写下刚刚出现的想法。',
  },
  {
    number: '02',
    title: '直接同步到 Flomo',
    description: '记录完成后直接保存到你的 Flomo 账户，继续使用熟悉的回顾方式。',
  },
  {
    number: '03',
    title: '免费版无需注册',
    description: '轻量使用可以直接开始；需要更多次数时，再选择适合的套餐。',
  },
  {
    number: '04',
    title: 'Chrome 与 Edge 可用',
    description: '从浏览器扩展商店安装，更新和日常使用更省心。',
  },
]

const steps = [
  { icon: MousePointer2, title: '打开扩展', description: '在正在阅读的页面点击浏览器工具栏图标。' },
  { icon: PenLine, title: '写下想法', description: '记录文字、来源和此刻真正值得留下的内容。' },
  { icon: RefreshCw, title: '同步保存', description: '点击保存，笔记随即进入你的 Flomo 账户。' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-emerald-950/10">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
            <div className="relative z-10 max-w-xl">
              <p className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-sm font-semibold text-primary">
                浏览器里的 Flomo 快速入口
              </p>
              <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
                <span className="block">在网页里记下</span>
                <span className="block">这一刻，</span>
                <span className="block text-primary">不打断阅读。</span>
              </h1>
              <p className="mt-7 max-w-lg text-pretty text-lg leading-8 text-muted-foreground">
                Flomo Extension 让你在浏览任何网页时快速记录想法，并同步到自己的 Flomo 账户。无需 Flomo 会员，也不用来回切换页面。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="group h-12 rounded-lg px-6 shadow-[0_12px_30px_-16px_hsl(var(--primary))]">
                  <a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">
                    安装 Chrome 版
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-lg bg-background/70 px-6">
                  <Link to="/guide">查看使用指南</Link>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {['免费版无需注册', '支持 Chrome / Edge', '不存储 Flomo 笔记内容'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={FLOMO_EXTENSION_EDGE_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                使用 Edge？前往 Edge 扩展商店
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-primary/10" />
              <figure className="relative overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-white p-3 shadow-[0_30px_80px_-42px_rgba(9,67,43,0.55)] sm:p-5">
                <div className="mb-3 flex items-center gap-1.5 px-1" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <img
                  src="/flomo-extension-shot1.webp"
                  alt="Flomo Extension 在浏览器中记录笔记的界面"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                  width="1200"
                  height="900"
                  decoding="async"
                />
              </figure>
              <div className="absolute -bottom-5 left-6 rounded-lg border border-emerald-950/10 bg-white px-4 py-3 shadow-lg sm:left-10">
                <p className="text-xs text-muted-foreground">记录路径</p>
                <p className="mt-1 text-sm font-semibold">网页 → 扩展 → Flomo</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32" aria-labelledby="features-title">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-semibold text-primary">少一步切换，多留下一条想法</p>
              <h2 id="features-title" className="mt-4 max-w-md text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                为持续阅读而设计的记录流程
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
                它不试图替代 Flomo，只负责缩短“看到”和“记下”之间的距离。
              </p>
            </div>

            <div className="border-t border-emerald-950/15">
              {features.map((feature) => (
                <article key={feature.number} className="grid gap-3 border-b border-emerald-950/15 py-8 sm:grid-cols-[4rem_1fr_1.1fr] sm:items-start sm:gap-6">
                  <span className="font-mono text-sm tabular-nums text-primary">{feature.number}</span>
                  <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="leading-7 text-muted-foreground">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/65 py-24 sm:py-32" aria-labelledby="workflow-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">三步完成记录</p>
              <h2 id="workflow-title" className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                不改变习惯，只缩短路径
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <figure className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-3 shadow-[0_24px_70px_-50px_rgba(9,67,43,0.6)]">
                <img
                  src="/flomo-extension-shot2.webp"
                  alt="Flomo Extension 笔记编辑与同步示例"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                />
              </figure>
              <div className="flex flex-col justify-between gap-3">
                {steps.map(({ icon: Icon, title, description }, index) => (
                  <article key={title} className="rounded-xl bg-background p-6 ring-1 ring-emerald-950/10">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#123c2b] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <p className="text-sm font-semibold text-emerald-200">先从免费版开始</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              下一次灵感出现时，直接把它留下来。
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-emerald-50/75">
              安装扩展不需要创建新工作流。继续浏览、继续思考，记录交给离你最近的入口。
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-white text-[#123c2b] hover:bg-emerald-50">
                <a href={FLOMO_EXTENSION_WEB_STORE_URL} target="_blank" rel="noreferrer">立即安装</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/plans">查看套餐</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
