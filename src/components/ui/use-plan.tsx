
function usePlan() {

  const renderPlan = (plans: Array<any>) => {
    return (
      plans.map((item, i) => (
        <div key={i} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className={`flex h-2 w-2 translate-y-1 rounded-full ${item.color}`}/>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">
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
