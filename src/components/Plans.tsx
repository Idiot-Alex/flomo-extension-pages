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
            <h1 className="kami-page-title mt-5 max-w-4xl">
              选择适合你的记录节奏
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              免费模式当前每天提供 2 次保存机会；Pay 套餐在付费期内不受扩展本地每日次数限制。
              购买的是本站独立开发、维护的 Flomo Extension 使用权益，不包含 flomo 官方会员。
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              扩展保存功能不要求 flomo 官方会员，但必须登录可用的 flomo 网页账户。支付确认后后台会更新权益；若扩展仍显示 Free，请在扩展内退出，并使用购买时同一 Flomo Extension 账户重新登录。
            </p>
          </header>

          <section className="py-14 sm:py-20" aria-labelledby="plans-options-title">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-5">
              <div>
                <p className="kami-eyebrow">00 · 可选方案</p>
                <h2 id="plans-options-title" className="kami-section-title mt-3">
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
              <h2 id="plans-faq-title" className="kami-section-title mt-3">
                常见问题
              </h2>
            </div>
            <dl className="border-t border-border">
              {[
                ['购买的是什么？', '购买的是第三方 Flomo Extension 的使用权益，不包含 flomo 官方会员或其相关权益。'],
                ['使用前需要哪些账户？', '保存时必须登录可用的 flomo 网页账户；购买和识别付费权益时，需要注册或登录 Flomo Extension 账户。'],
                ['如何开通付费权益？', '使用 Flomo Extension 账户选择套餐并完成支付。支付确认后，后台会更新该账户的付费权益。'],
                ['支付后扩展仍显示 Free？', '请在扩展内退出，并使用购买时同一 Flomo Extension 账户重新登录，以重新读取套餐与到期时间。'],
                ['支持哪些支付方式？', '目前支持微信支付和支付宝，两种渠道的价格与权益一致。'],
                ['付费权益有效期多久？', '可选择 1 个月、半年或一年，以实际购买的套餐为准。'],
                ['如何续费？', '权益到期后，重新购买套餐即可延长使用期限。'],
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
