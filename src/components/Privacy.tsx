import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function Privacy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>隐私政策</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 mb-4">
          <p>生效日期： 2024 年 5 月 4 日</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>1. 引言</p>
          <p>本隐私政策阐述了 Flomo Extension 扩展（以下简称“我们”或“我们的”）如何收集、使用、披露和保护您的个人信息。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>2. 信息收集</p>
          <p>我们的扩展可能会收集以下信息以便提供和改进我们的服务：</p>
          <p>用户的邮箱账号信息，用于扩展服务的注册。</p>
          <p>用户使用邮箱注册本扩展服务需要设置密码，用于扩展服务的登录验证。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>3. 信息使用</p>
          <p>我们使用收集的信息来：</p>
          <p>提供在浏览器上记录 flomo 笔记服务。</p>
          <p>改进我们的扩展功能和用户体验。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>4. 信息分享</p>
          <p>我们不会与任何第三方分享您的个人信息，除非：</p>
          <p>法律要求我们披露信息。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>5. 信息安全</p>
          <p>我们采取适当的安全措施来保护您的个人信息不被未经授权的访问和泄露。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>6. 用户权利</p>
          <p>您有权：</p>
          <p>访问您的个人信息。</p>
          <p>要求更正或删除不准确的个人信息。</p>
          <p>撤回您对个人信息处理的同意。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>7. 第三方链接</p>
          <p>我们的扩展可能包含指向第三方网站的链接，这些网站有它们自己的隐私政策。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>8. 隐私政策更新</p>
          <p>我们可能会不时更新本隐私政策。任何变更将在本页面上公布。</p>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 mb-4">
          <p>9. 联系我们</p>
          <p>如有任何关于隐私政策的疑问，请联系我们。</p>
          <p>联系方式：</p>
          <p>电子邮件：flomo-extension@idiotalex.com</p>
          <p>网址：https://flomo-extension-pages.pages.dev/?action=privacy</p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4"></CardFooter>
    </Card>
  )
}
