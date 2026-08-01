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
    title: '扩展中的笔记数据流',
    content: (
      <>
        <p>Chrome 版 v1.30.1 的笔记处理流程如下：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>在普通网页中选中文字时，扩展会在页面本地读取当前选区并显示操作入口；只有您点击“添加到 flomo extension 草稿”后，选中文字才会写入扩展草稿</li>
          <li>编辑器草稿保存在 Chrome 扩展的本地存储中，用于关闭并重新打开扩展后恢复内容</li>
          <li>点击保存时，笔记正文通过浏览器标签页连接发送给已打开的 flomo 页面，由页面脚本填入 flomo 编辑器并触发页面上的保存按钮</li>
          <li>Chrome 扩展自身调用的 Flomo Extension 账户 API 仅用于验证码、注册、登录和套餐状态，不包含上传笔记正文的接口</li>
        </ul>
        <p className="mt-3">因此，更准确的表述是：笔记正文不会发送到 Chrome 扩展自身调用的 Flomo Extension 账户 API，但草稿会保存在浏览器本地，并在您发起保存时交给已登录的 flomo 网页处理。flomo 如何保存笔记由其自身政策和服务规则约束。</p>
        <p className="mt-3">上述流程根据 v1.30.1 源码于 2026 年 8 月 1 日核验。版本更新后，请同时以 Chrome 安装时展示的权限和本页最新说明为准。</p>
      </>
    ),
  },
  {
    title: '扩展权限与本地信息',
    content: (
      <>
        <p>当前版本声明的具名权限及用途包括：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><code>storage</code>：保存草稿、当日使用次数、flomo 标签页标识和扩展账户套餐信息</li>
          <li><code>tabs</code>：查找并连接已经打开的 flomo 标签页</li>
          <li><code>alarms</code>：用于安排后台检查 flomo 标签页，以便后续连接目标页面</li>
          <li><code>identity</code>：仅在您主动选择 Google 登录时，发起 Google 授权流程；请求范围为基本个人资料与邮箱</li>
        </ul>
        <p className="mt-3">此外，选中文字功能的内容脚本会在 HTTP/HTTPS 网页中运行，以检测用户选区并显示本地操作入口。它不适用于 <code>chrome://</code>、Chrome 扩展商店等受浏览器限制的特殊页面。</p>
        <p className="mt-3">逐项源码依据、权限能力与版本限制见<a href="/posts/flomo-extension-permissions-data-flow">权限与数据流说明</a>。</p>
      </>
    ),
  },
  {
    title: '账户、网站与订单信息',
    content: (
      <>
        <p>根据您使用的功能，我们可能处理以下信息：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>账户信息：注册邮箱、登录验证信息、套餐状态和到期时间；免费模式不要求创建 Flomo Extension 账户</li>
          <li>Google 登录信息：当您选择 Google 登录时，授权令牌会提交给账户服务以确认邮箱身份</li>
          <li>服务与诊断信息：访问页面、功能交互、错误信息、浏览器与设备类型</li>
          <li>网络与日志信息：IP 地址、请求时间、安全日志和反滥用记录</li>
          <li>支付相关状态：订单标识、支付结果和套餐信息；支付凭据由相应支付服务处理</li>
        </ul>
      </>
    ),
  },
  {
    title: '信息的使用目的',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>提供账户登录、用户发起的笔记保存、套餐与售后支持</li>
        <li>排查故障、保障服务安全并防止滥用</li>
        <li>了解页面和功能的整体使用情况，改进产品体验</li>
        <li>若未来启用广告，展示、衡量和限制广告，并遵守适用的广告政策</li>
        <li>履行法律义务或响应有权机关的合法要求</li>
      </ul>
    ),
  },
  {
    title: 'Cookies 与广告',
    content: (
      <>
        <p>本站目前未加载 Google AdSense 广告投放脚本。若未来启用 AdSense，我们会在启用前更新本政策，并根据适用地区和规则提供必要的同意或选择机制。</p>
        <p className="mt-3">启用广告后，Google 等第三方供应商可能使用 Cookies、Web Beacon、IP 地址或其他标识符来投放和衡量广告，并可能根据您此前访问本站或其他网站的情况展示个性化广告。</p>
        <p className="mt-3">您可以在 <a href="https://adssettings.google.com/" {...externalLinkProps}>Google 广告设置</a>中管理个性化广告，也可以阅读<a href="https://policies.google.com/technologies/partner-sites" {...externalLinkProps}>Google 如何使用合作伙伴网站或应用中的信息</a>。</p>
        <p className="mt-3">面向欧洲经济区、英国和瑞士投放 Google 广告时，Google 要求站点使用其认证并集成 IAB TCF 的同意管理平台。该设置需要由站点维护者在 AdSense 的“隐私权和消息”中启用。您也可以通过浏览器设置删除或阻止 Cookies，但部分功能可能因此受限。</p>
      </>
    ),
  },
  {
    title: '当前及计划使用的第三方服务',
    content: (
      <>
        <p>本站当前使用以下服务，它们可能按照各自政策处理设备、网络或使用信息：</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><a href="https://policies.google.com/privacy" {...externalLinkProps}>Google Analytics</a>：访问分析</li>
          <li><a href="https://privacy.microsoft.com/privacystatement" {...externalLinkProps}>Microsoft Clarity</a>：页面使用情况与体验分析</li>
          <li><a href="https://www.cloudflare.com/privacypolicy/" {...externalLinkProps}>Cloudflare</a>：内容分发、安全防护与性能分析</li>
          <li>自托管 Umami：汇总访问统计</li>
          <li><a href="https://flomoapp.com/" {...externalLinkProps}>flomo</a>：用户主动发起笔记保存时的目标平台</li>
        </ul>
        <p className="mt-3">本站计划未来使用 <a href="https://policies.google.com/privacy" {...externalLinkProps}>Google AdSense</a> 提供广告服务；在实际启用前，它不属于本站当前加载的广告投放服务。</p>
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
        <p>浏览器本地草稿会保留，以便下次打开扩展时继续编辑；当前版本在向 flomo 网页成功触发保存动作后清空草稿。账户、订单和服务日志仅在提供服务、解决争议、履行法律义务和保障安全所需的期限内保存，具体期限会因用途和法律要求而不同。</p>
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
        <p className="mt-3">如对隐私政策或个人信息处理有疑问，请发送邮件至 <a href="mailto:hotstrip.zx@gmail.com">hotstrip.zx@gmail.com</a>。</p>
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
