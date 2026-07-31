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
      <main id="main-content" className="min-h-screen bg-[#f6f9f6]">
        <div className="container px-4 py-16 sm:py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">简单透明</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              选择适合你的记录方式
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              免费体验核心功能，或开通 Pay 套餐解除每日次数限制。支付成功后会员权益自动生效。
            </p>
          </div>

          <div className="mx-auto mb-20 grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
            <div className="h-full">
              <FreePlan />
            </div>
            <div className="h-full">
              <LtzfWxPlan />
            </div>
            <div className="h-full">
              <ZpayAliPlan />
            </div>
            {/* <div className="hover:-translate-y-2 transition-transform duration-300">
              <AfdianPlan />
            </div> */}
          </div>

          <section className="mx-auto max-w-4xl" aria-labelledby="plans-faq-title">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold text-primary">购买说明</p>
              <h2 id="plans-faq-title" className="text-3xl font-bold tracking-tight text-foreground">
                常见问题
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border bg-white p-6">
                <h3 className="text-base font-semibold">如何开通会员？</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">选择套餐并完成支付后，会员权益会自动激活。</p>
              </article>
              <article className="rounded-2xl border bg-white p-6">
                <h3 className="text-base font-semibold">支持哪些支付方式？</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">目前支持微信支付和支付宝。</p>
              </article>
              <article className="rounded-2xl border bg-white p-6">
                <h3 className="text-base font-semibold">会员有效期多久？</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">可选择 1 个月、半年或一年，以购买套餐为准。</p>
              </article>
              <article className="rounded-2xl border bg-white p-6">
                <h3 className="text-base font-semibold">如何续费？</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">到期后重新购买套餐即可续费。</p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
