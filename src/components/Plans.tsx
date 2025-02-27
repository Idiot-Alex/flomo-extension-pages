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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-white">
        <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Flomo Extension 套餐计划
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">选择最适合您的套餐，开启高效记录之旅</p>
          </div>
          
          <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-1 lg:grid-cols-3 mb-16">
            <div className="hover:-translate-y-2 transition-transform duration-300">
              <FreePlan />
            </div>
            <div className="hover:-translate-y-2 transition-transform duration-300">
              <LtzfWxPlan />
            </div>
            <div className="hover:-translate-y-2 transition-transform duration-300">
              <ZpayAliPlan />
            </div>
            {/* <div className="hover:-translate-y-2 transition-transform duration-300">
              <AfdianPlan />
            </div> */}
          </div>

          {/* FAQ 部分 */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              常见问题解答
            </h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold">如何开通会员？</h3>
                <p className="mt-2 text-muted-foreground">选择套餐后，根据指引完成支付即可立即开通服务，支付成功后自动激活会员权益。</p>
              </div>
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold">支持哪些支付方式？</h3>
                <p className="mt-2 text-muted-foreground">目前支持微信支付、支付宝，后续会开通更多支付方式。</p>
              </div>
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold">会员有效期多久？</h3>
                <p className="mt-2 text-muted-foreground">根据套餐可以选择 1 个月、半年、一年三种有效期。</p>
              </div>
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold">如何续费？</h3>
                <p className="mt-2 text-muted-foreground">会员到期后可以再次购买新套餐，将重置会员有效期。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
