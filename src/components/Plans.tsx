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
          
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>
      <Footer />
    </>
  )
}
