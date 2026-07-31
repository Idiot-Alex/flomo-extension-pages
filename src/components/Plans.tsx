import { FreePlan } from './FreePlan'
// import { AfdianPlan } from './AfdianPlan'
import { LtzfWxPlan } from './LtzfWxPlan'
import { ZpayAliPlan } from './ZpayAliPlan'
import { Header } from './Header'
import { Footer } from './Footer'

export function Plans() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="kami-page py-16 sm:py-20">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="kami-eyebrow">套餐与价格</p>
            <h1 className="mt-5 max-w-4xl font-editorial text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl">
              选择适合你的记录节奏
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              免费体验核心功能，或开通 Pay 套餐解除每日次数限制。支付完成后，会员权益会自动生效。
            </p>
          </header>

          <section className="py-14 sm:py-20" aria-labelledby="plans-options-title">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-5">
              <div>
                <p className="kami-eyebrow">00 · 可选方案</p>
                <h2 id="plans-options-title" className="mt-3 font-editorial text-3xl font-medium sm:text-4xl">
                  从轻量体验开始
                </h2>
              </div>
              <p className="hidden max-w-xs text-right text-sm leading-6 text-muted-foreground sm:block">
                付费套餐价格与权益一致，仅支付渠道不同。
              </p>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-[0.72fr_1.28fr]">
              <FreePlan />
              <div className="grid items-stretch gap-5 sm:grid-cols-2">
                <LtzfWxPlan />
                <ZpayAliPlan />
              </div>
            </div>
          </section>

          <section className="grid gap-10 border-t border-border py-14 sm:py-20 lg:grid-cols-[0.72fr_1.28fr]" aria-labelledby="plans-faq-title">
            <div>
              <p className="kami-eyebrow">01 · 购买说明</p>
              <h2 id="plans-faq-title" className="mt-3 font-editorial text-3xl font-medium sm:text-4xl">
                常见问题
              </h2>
            </div>
            <dl className="border-t border-border">
              {[
                ['如何开通会员？', '选择套餐并完成支付后，会员权益会自动激活。'],
                ['支持哪些支付方式？', '目前支持微信支付和支付宝。'],
                ['会员有效期多久？', '可选择 1 个月、半年或一年，以购买套餐为准。'],
                ['如何续费？', '到期后重新购买套餐即可续费。'],
              ].map(([question, answer]) => (
                <div key={question} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <dt className="font-editorial text-lg font-medium text-foreground">{question}</dt>
                  <dd className="text-sm leading-7 text-muted-foreground">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
