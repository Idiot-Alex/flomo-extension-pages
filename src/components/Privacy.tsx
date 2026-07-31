import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const privacySections = [
  {
    title: '引言',
    content: <p>本隐私政策阐述了 Flomo Extension 扩展（以下简称“我们”或“我们的”）如何收集、使用、披露和保护您的个人信息。</p>,
  },
  {
    title: '信息收集',
    content: (
      <>
        <p>我们的扩展可能会收集以下信息以便提供和改进我们的服务：</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>用户的邮箱账号信息，用于扩展服务的注册</li>
          <li>用户使用邮箱注册本扩展服务需要设置密码，用于扩展服务的登录验证</li>
        </ul>
      </>
    ),
  },
  {
    title: '信息使用',
    content: (
      <>
        <p>我们使用收集的信息来：</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>提供在浏览器上记录 flomo 笔记服务</li>
          <li>改进我们的扩展功能和用户体验</li>
        </ul>
      </>
    ),
  },
  {
    title: '信息分享',
    content: (
      <>
        <p>我们不会与任何第三方分享您的个人信息，除非：</p>
        <ul className="mt-2 list-disc pl-5"><li>法律要求我们披露信息</li></ul>
      </>
    ),
  },
  {
    title: '信息安全',
    content: <p>我们采取适当的安全措施来保护您的个人信息不被未经授权的访问和泄露。</p>,
  },
  {
    title: '用户权利',
    content: (
      <>
        <p>您有权：</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>访问您的个人信息</li>
          <li>要求更正或删除不准确的个人信息</li>
          <li>撤回您对个人信息处理的同意</li>
        </ul>
      </>
    ),
  },
  {
    title: '第三方链接',
    content: <p>我们的扩展可能包含指向第三方网站的链接，这些网站有它们自己的隐私政策。</p>,
  },
  {
    title: '隐私政策更新',
    content: <p>我们可能会不时更新本隐私政策。任何变更将在本页面上公布。</p>,
  },
  {
    title: '联系我们',
    content: (
      <>
        <p>如有任何关于隐私政策的疑问，请联系我们。</p>
        <p className="mt-2">电子邮件：<a href="mailto:flomo-extension@idiotalex.com">flomo-extension@idiotalex.com</a></p>
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
            <h1 className="mt-5 font-editorial text-4xl font-medium tracking-tight sm:text-6xl">隐私政策</h1>
            <p className="mt-5 text-sm text-muted-foreground">生效日期：2024 年 5 月 4 日</p>
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
