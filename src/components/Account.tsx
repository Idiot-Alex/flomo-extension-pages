import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Header } from './Header'
import { Footer } from './Footer'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { reloadUser } from '@/lib/api'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Package, Calendar } from 'lucide-react'

export function Account() {
  const navigate = useNavigate()
  const [userInf, setUserInf] = useState({
    email: '',
    plan: '',
    expiredTime: '',
  })

  const user = useSelector((state: any) => {
    return state.user
  })

  // 重新加载用户信息
  useEffect(() => {
    if (user.email) {
      reloadUser({ email: user.email }).then(res => {
        if (res.success) {
          setUserInf(res.data)
        } else {
          setUserInf(user)
        }
      })
    }
  }, [])

  const toPlan = () => {
    navigate('/plans')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background/50 via-background/95 to-background">
        <div className="container py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                我的账户
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">管理您的账户信息和订阅状态</p>
            </div>

            <div className="mx-auto max-w-4xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">账户信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-6 h-6 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">邮箱</Label>
                            <Input
                              id="email"
                              type="email"
                              readOnly
                              value={userInf.email}
                              className="w-full mt-1 bg-background/50"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Package className="w-6 h-6 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor="plan" className="text-sm font-medium text-muted-foreground">当前套餐</Label>
                            <Input
                              id="plan"
                              type="text"
                              readOnly
                              value={userInf.plan}
                              className="w-full mt-1 bg-background/50"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Calendar className="w-6 h-6 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor="expiredTime" className="text-sm font-medium text-muted-foreground">套餐到期时间</Label>
                            <Input
                              id="expiredTime"
                              type="text"
                              readOnly
                              value={!userInf.expiredTime ? '' : new Date(userInf.expiredTime).toLocaleString()}
                              className="w-full mt-1 bg-background/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={toPlan} 
                        className="w-full md:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        查看其他套餐
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
