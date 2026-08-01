import { Link } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const principles = [
  ['01', '基于真实产品', '功能说明与教程以当前可用的产品界面和可复现步骤为依据。'],
  ['02', '标明独立身份', 'Flomo Extension 是第三方独立项目，与 flomo 官方不存在隶属、授权或代言关系。'],
  ['03', '及时修正内容', '功能、价格或安装方式发生变化时，我们会更新相关页面，并在发现错误后及时修正。'],
]

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <div className="kami-page py-16 sm:py-20">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="kami-eyebrow">项目与维护</p>
            <h1 className="kami-page-title mt-5">关于 Flomo Extension</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              一个由独立开发者维护的 Chrome 浏览器扩展，目标是在不离开当前网页的情况下缩短记录路径。
            </p>
          </header>

          <div className="ml-auto max-w-3xl py-8 sm:py-12">
            <section className="border-b border-border py-8">
              <h2 className="font-editorial text-3xl font-medium">这个项目解决什么问题</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                <p>阅读网页时，切换应用、复制内容再打开笔记工具，会打断正在进行的思考。Flomo Extension 把记录入口放在浏览器工具栏中，让用户在当前页面整理本地草稿，再通过已登录的 flomo 网页保存。</p>
                <p>本站提供产品说明、真实界面、安装步骤、套餐信息和使用文章，帮助用户在安装前了解产品边界。</p>
              </div>
            </section>

            <section className="border-b border-border py-8">
              <h2 className="font-editorial text-3xl font-medium">内容与透明度原则</h2>
              <ol className="mt-6 border-t border-border">
                {principles.map(([number, title, description]) => (
                  <li key={number} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6">
                    <span className="font-mono text-xs text-primary">{number}</span>
                    <h3 className="font-editorial text-lg font-medium">{title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="border-b border-border py-8">
              <h2 className="font-editorial text-3xl font-medium">我们怎样核对产品说明</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                <p>当前文档以 Chrome 版 v1.40.0 的扩展清单、页面脚本、弹窗编辑器、账户接口调用和本地存储实现为核验范围，最近一次核验日期为 2026 年 8 月 1 日。</p>
                <p>我们会区分源码中可以确认的行为、需要在产品页面复核的结果和尚未独立验证的结论，并为实现相关说明标注适用版本。第三方产品的信息则优先引用其官方帮助页或商店页面。</p>
                <p>
                  详细依据可阅读<Link to="/posts/flomo-extension-permissions-data-flow">权限与数据流说明</Link>、
                  <Link to="/posts/flomo-extension-save-flow-troubleshooting">保存流程与故障排查</Link>和
                  <Link to="/posts/flomo-extension-selection-draft-workflow">选中文本工作流</Link>。
                </p>
              </div>
            </section>

            <section className="py-8">
              <h2 className="font-editorial text-3xl font-medium">联系与反馈</h2>
              <div className="mt-5 space-y-3 text-base leading-8 text-muted-foreground">
                <p>产品、账户或内容问题可发送邮件至 <a href="mailto:hotstrip.zx@gmail.com">hotstrip.zx@gmail.com</a>。</p>
                <p>也可以通过<a href="https://txc.qq.com/products/648748" target="_blank" rel="noreferrer">问题反馈页面</a>提交建议或错误信息。</p>
                <p>关于数据收集、广告与第三方服务的说明，请查看<Link to="/privacy">隐私政策</Link>。</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
