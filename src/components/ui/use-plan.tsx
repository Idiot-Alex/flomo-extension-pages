
export interface PlanFeature {
  color: string
  title: string
  desc: string
}

function usePlan() {

  const renderPlan = (plans: PlanFeature[]) => {
    return (
      plans.map((item) => (
        <div key={item.title} className="mb-5 grid grid-cols-[18px_1fr] items-start last:mb-0">
          <span className={`mt-1 flex h-2 w-2 rounded-full ${item.color}`} aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-5 text-foreground">
              {item.title}
            </p>
            <p className="text-sm leading-5 text-muted-foreground">
              {item.desc}
            </p>
          </div>
        </div>
      ))
    )
  }

  return {
    renderPlan,
  }
}

export {
  usePlan,
}
