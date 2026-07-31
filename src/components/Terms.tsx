const sections = [
  {
    id: 'service-description',
    title: '服务说明',
    content: [
      'Flomo Extension 是一个浏览器扩展程序，旨在帮助用户更方便地在浏览器上记录 flomo 笔记。',
      '本服务由第三方开发者提供，与 flomo 官方无直接关联。',
    ],
  },
  {
    id: 'user-responsibility',
    title: '用户责任',
    content: [
      '不得利用本服务进行任何非法活动',
      '不得干扰或破坏本服务的正常运行',
      '对使用本服务产生的后果承担全部责任',
    ],
  },
  {
    id: 'service-limitations',
    title: '服务限制',
    content: [
      '免费用户每日有使用次数限制',
      '部分功能可能需要付费使用',
      '服务可能因维护或其他原因暂时中断',
    ],
  },
  {
    id: 'payment',
    title: '付费、取消与退款',
    content: [
      '套餐价格、周期和权益以购买页面下单时展示的信息为准',
      '请在付款前确认所选套餐；支付异常或权益未生效时，可通过站点联系邮箱申请核查',
      '适用的取消或退款条件会根据订单状态、已使用权益及支付渠道规则处理',
    ],
  },
  {
    id: 'intellectual-property',
    title: '独立项目与知识产权',
    content: [
      'Flomo Extension 是第三方独立项目，与 flomo 官方不存在隶属、授权或代言关系',
      'flomo 及其他第三方产品名称、商标和内容归各自权利人所有',
      '用户应遵守原始网页、浏览器商店和目标平台的适用规则',
    ],
  },
  {
    id: 'disclaimer',
    title: '免责声明',
    content: [
      '本服务按“现状”提供，不提供任何形式的保证',
      '开发者不对因使用本服务造成的任何损失负责',
      '用户应自行承担使用本服务的风险',
    ],
  },
  {
    id: 'terms-modification',
    title: '条款修改',
    content: [
      '我们保留随时修改本条款的权利。',
      '修改后的条款将在本页面公布，继续使用本服务即表示您接受修改后的条款。',
    ],
  },
  {
    id: 'contact',
    title: '联系我们',
    content: [
      '账户、支付、产品或条款问题可发送邮件至 flomo-extension@idiotalex.com',
      '为便于核查支付问题，请提供订单标识和问题描述，但不要发送密码或完整支付凭据',
    ],
  },
]

export function Terms() {
  return (
    <section className="min-h-screen bg-background">
      <div className="kami-page py-16 sm:py-20">
        <header className="border-b border-border pb-10 sm:pb-14">
          <p className="kami-eyebrow">法律与说明</p>
          <h1 className="kami-page-title mt-5">服务条款</h1>
          <p className="mt-5 text-sm text-muted-foreground">生效日期：2024 年 5 月 4 日 · 最近更新：2026 年 8 月 1 日</p>
        </header>

        <div className="ml-auto max-w-3xl py-8 sm:py-12">
          {sections.map((section, index) => (
            <article key={section.id} id={section.id} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-8">
              <p className="font-editorial text-lg text-primary" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
              <div>
                <h2 className="font-editorial text-2xl font-medium text-foreground">{section.title}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  {section.content.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
