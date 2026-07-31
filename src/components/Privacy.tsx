import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const externalLinkProps = {
  target: '_blank',
  rel: 'noreferrer',
} as const

const privacySections = [
  {
    title: '适用范围',
    content: (
      <>
        <p>本隐私政策适用于 Flomo Extension 网站、账户服务与浏览器扩展，说明我们如何处理个人信息、Cookies 和第三方服务产生的数据。</p>
        <p className="mt-3">Flomo Extension 是第三方独立项目，与 flomo 官方不存在隶属、授权或代言关系。用户在 flomo 平台上的数据同时受 flomo 自身隐私政策约束。</p>
      </>
    ),
  },
  {
    title: '我们收集的信息',
    content: (
      <>
        <p>根据您使用的功能，我们可能处理以下信息：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>账户信息：注册邮箱、登录验证信息、套餐状态和到期时间</li>
          <li>服务与诊断信息：访问页面、功能交互、错误信息、浏览器与设备类型</li>
          <li>网络与日志信息：IP 地址、请求时间、安全日志和反滥用记录</li>
          <li>支付相关状态：订单标识、支付结果和套餐信息；支付凭据由相应支付服务处理</li>
        </ul>
        <p className="mt-3">网站不会要求您公开发布 Flomo 笔记内容。扩展在执行同步操作时会处理您主动输入的内容，以完成您请求的记录操作。</p>
      </>
    ),
  },
  {
    title: '信息的使用目的',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>提供账户登录、笔记同步、套餐与售后支持</li>
        <li>排查故障、保障服务安全并防止滥用</li>
        <li>了解页面和功能的整体使用情况，改进产品体验</li>
        <li>展示、衡量和限制广告，并遵守适用的广告政策</li>
        <li>履行法律义务或响应有权机关的合法要求</li>
      </ul>
    ),
  },
  {
    title: 'Cookies 与广告',
    content: (
      <>
        <p>本站使用 Google AdSense。Google 等第三方供应商可能使用 Cookies、Web Beacon、IP 地址或其他标识符来投放和衡量广告。Google 可能根据您此前访问本站或其他网站的情况展示个性化广告。</p>
        <p className="mt-3">您可以在 <a href="https://adssettings.google.com/" {...externalLinkProps}>Google 广告设置</a>中管理个性化广告，也可以阅读<a href="https://policies.google.com/technologies/partner-sites" {...externalLinkProps}>Google 如何使用合作伙伴网站或应用中的信息</a>。</p>
        <p className="mt-3">面向欧洲经济区、英国和瑞士投放 Google 广告时，Google 要求站点使用其认证并集成 IAB TCF 的同意管理平台。该设置需要由站点维护者在 AdSense 的“隐私权和消息”中启用。您也可以通过浏览器设置删除或阻止 Cookies，但部分功能可能因此受限。</p>
      </>
    ),
  },
  {
    title: '第三方服务',
    content: (
      <>
        <p>本站当前使用以下服务，它们可能按照各自政策处理设备、网络或使用信息：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><a href="https://policies.google.com/privacy" {...externalLinkProps}>Google Analytics 与 Google AdSense</a>：访问分析与广告服务</li>
          <li><a href="https://privacy.microsoft.com/privacystatement" {...externalLinkProps}>Microsoft Clarity</a>：页面使用情况与体验分析</li>
          <li><a href="https://www.cloudflare.com/privacypolicy/" {...externalLinkProps}>Cloudflare</a>：内容分发、安全防护与性能分析</li>
          <li>自托管 Umami：汇总访问统计</li>
          <li><a href="https://flomoapp.com/" {...externalLinkProps}>flomo</a>：用户主动发起笔记同步时的目标平台</li>
        </ul>
      </>
    ),
  },
  {
    title: '信息共享与披露',
    content: (
      <>
        <p>我们不会出售您的账户信息。仅在提供上述服务、获得您的指示、保护服务与用户安全，或法律要求时，向必要的服务提供商或有权机关披露相关信息。</p>
        <p className="mt-3">第三方服务可能在其运营所在地处理数据。使用本站即表示相关数据可能根据适用规则进行跨境传输。</p>
      </>
    ),
  },
  {
    title: '保存与安全',
    content: (
      <>
        <p>我们仅在提供服务、解决争议、履行法律义务和保障安全所需的期限内保存个人信息。不同类型信息的保存期限会因用途和法律要求而不同。</p>
        <p className="mt-3">我们采取访问控制、传输保护和日志审查等合理措施降低未经授权访问、篡改或泄露的风险，但任何互联网服务都无法承诺绝对安全。</p>
      </>
    ),
  },
  {
    title: '您的选择与权利',
    content: (
      <>
        <p>您可以联系我们申请访问、更正或删除账户信息，或撤回此前作出的选择。我们会在核实身份并考虑适用法律与安全要求后处理请求。</p>
        <p className="mt-3">您还可以通过浏览器管理 Cookies，并使用 <a href="https://tools.google.com/dlpage/gaoptout" {...externalLinkProps}>Google Analytics 停用工具</a>或 Google 广告设置调整相关数据使用方式。</p>
      </>
    ),
  },
  {
    title: '政策更新与联系',
    content: (
      <>
        <p>当产品、第三方服务或适用规则发生变化时，我们可能更新本政策，并在页面顶部标明最近更新日期。</p>
        <p className="mt-3">如对隐私政策或个人信息处理有疑问，请发送邮件至 <a href="mailto:flomo-extension@idiotalex.com">flomo-extension@idiotalex.com</a>。</p>
      </>
    ),
  },
]

export function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <div className="kami-page py-16 sm:py-20">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="kami-eyebrow">数据与隐私</p>
            <h1 className="kami-page-title mt-5">隐私政策</h1>
            <p className="mt-5 text-sm text-muted-foreground">生效日期：2024 年 5 月 4 日 · 最近更新：2026 年 8 月 1 日</p>
          </header>

          <article className="ml-auto max-w-3xl py-8 sm:py-12">
            {privacySections.map((section, index) => (
              <section key={section.title} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <p className="font-editorial text-lg text-primary" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h2 className="font-editorial text-2xl font-medium text-foreground">{section.title}</h2>
                  <div className="mt-4 text-sm leading-7 text-muted-foreground">{section.content}</div>
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
