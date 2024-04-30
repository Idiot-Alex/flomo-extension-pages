import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Plans() {

  const freePlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-100',
      title: '无需注册账号',
      desc: '不需要注册或者登录',
    },
    {
      color: 'bg-sky-100',
      title: '每日使用次数 1',
      desc: '使用插件保存 flomo 笔记次数',
    },
  ]

  const payPlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-500',
      title: '需要注册并登录账号',
      desc: '使用邮箱账号注册或者登录',
    },
    {
      color: 'bg-sky-500',
      title: '每日使用次数无限制',
      desc: '使用插件保存 flomo 笔记次数',
    },
    {
      color: 'bg-sky-500',
      title: '¥2.9 一个月',
      desc: '每月仅需 2.9 元',
    }
  ]

  // const proPlans = [
  //   {
  //     color: 'bg-sky-500',
  //     title: '数据安全，放心使用',
  //     desc: '不会存储任何 flomo 笔记数据',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '需要注册并登录账号',
  //     desc: '使用邮箱账号注册或者登录',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '每日使用次数无限制',
  //     desc: '使用插件保存 flomo 笔记次数',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '¥4.9 一个月',
  //     desc: '每月仅需 4.9 元',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '后续升级服务免费享受',
  //     desc: '更多功能一网打尽',
  //   }
  // ]

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

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 套餐计划</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-2 md:grid-cols-2 lg:grid-cols-2">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Free 套餐</CardTitle>
            <CardDescription>
              无需注册账号，每日 1 次机会免费使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(freePlans) }
          </CardContent>
        </Card>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Pay 套餐</CardTitle>
            <CardDescription>
              需要注册账号并付费，每日 <b className="text-zinc-600">无限</b> 次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(payPlans) }
          </CardContent>
        </Card>
        {/* <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Pro 套餐</CardTitle>
            <CardDescription>
            需要注册账号并付费，每日<b className="text-zinc-600">无限</b>次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(proPlans) }
          </CardContent>
        </Card> */}
      </div>
    </>
  )
}