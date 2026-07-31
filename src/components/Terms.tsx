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
]

export function Terms() {
  return (
    <section className="min-h-screen bg-background">
      <div className="kami-page py-16 sm:py-20">
        <header className="border-b border-border pb-10 sm:pb-14">
          <p className="kami-eyebrow">法律与说明</p>
          <h1 className="kami-page-title mt-5">服务条款</h1>
          <p className="mt-5 text-sm text-muted-foreground">生效日期：2024 年 5 月 4 日</p>
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
