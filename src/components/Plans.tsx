import { FreePlan } from './FreePlan'
import { AfdianPlan } from './AfdianPlan'
import { LtzfWxPlan } from './LtzfWxPlan'

export function Plans() {

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 套餐计划</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-2 md:grid-cols-3 lg:grid-cols-3">
        <FreePlan />
        <LtzfWxPlan />
        <AfdianPlan />
      </div>
    </>
  )
}