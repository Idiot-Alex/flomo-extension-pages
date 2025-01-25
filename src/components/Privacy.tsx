import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

export function Privacy() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <Header />
      <div className="flex-1 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 py-4"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">隐私政策</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid gap-3">
                  <p className="text-gray-600">生效日期： 2024 年 5 月 4 日</p>
                </div>
              </motion.div>
              
              <Separator className="my-6" />

              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="grid gap-3 mb-6">
                    <h3 className="text-xl font-semibold">{section}. {[
                      '引言',
                      '信息收集',
                      '信息使用',
                      '信息分享',
                      '信息安全',
                      '用户权利',
                      '第三方链接',
                      '隐私政策更新',
                      '联系我们'
                    ][index]}</h3>
                    <div className="text-gray-600 space-y-2">
                      {section === 1 && (
                        <>
                          <p>本隐私政策阐述了 Flomo Extension 扩展（以下简称“我们”或“我们的”）如何收集、使用、披露和保护您的个人信息。</p>
                        </>
                      )}
                      {section === 2 && (
                        <>
                          <p>我们的扩展可能会收集以下信息以便提供和改进我们的服务：</p>
                          <ul className="list-disc pl-6">
                            <li>用户的邮箱账号信息，用于扩展服务的注册</li>
                            <li>用户使用邮箱注册本扩展服务需要设置密码，用于扩展服务的登录验证</li>
                          </ul>
                        </>
                      )}
                      {section === 3 && (
                        <>
                          <p>我们使用收集的信息来：</p>
                          <ul className="list-disc pl-6">
                            <li>提供在浏览器上记录 flomo 笔记服务</li>
                            <li>改进我们的扩展功能和用户体验</li>
                          </ul>
                        </>
                      )}
                      {section === 4 && (
                        <>
                          <p>我们不会与任何第三方分享您的个人信息，除非：</p>
                          <ul className="list-disc pl-6">
                            <li>法律要求我们披露信息</li>
                          </ul>
                        </>
                      )}
                      {section === 5 && (
                        <p>我们采取适当的安全措施来保护您的个人信息不被未经授权的访问和泄露。</p>
                      )}
                      {section === 6 && (
                        <>
                          <p>您有权：</p>
                          <ul className="list-disc pl-6">
                            <li>访问您的个人信息</li>
                            <li>要求更正或删除不准确的个人信息</li>
                            <li>撤回您对个人信息处理的同意</li>
                          </ul>
                        </>
                      )}
                      {section === 7 && (
                        <p>我们的扩展可能包含指向第三方网站的链接，这些网站有它们自己的隐私政策。</p>
                      )}
                      {section === 8 && (
                        <p>我们可能会不时更新本隐私政策。任何变更将在本页面上公布。</p>
                      )}
                      {section === 9 && (
                        <>
                          <p>如有任何关于隐私政策的疑问，请联系我们。</p>
                          <div className="space-y-1">
                            <p>联系方式：</p>
                            <p>电子邮件：flomo-extension@idiotalex.com</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {section < 9 && <Separator className="my-6" />}
                </motion.div>
              ))}
            </CardContent>
            <CardFooter className="border-t px-6 py-4"></CardFooter>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
