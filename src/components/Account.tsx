import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { reloadUser } from '@/lib/api'
import { setUser } from '@/store/actions'

export function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: any) => {
    return state.user
  })

  // 重新加载用户信息
  if (user) {
    reloadUser({ email: user.email }).then(res => {
      if (res.success) {
        dispatch(setUser(res.data))
      }
    })
  }

  const toPlan = () => {
    navigate('/plans')
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">我的账户</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>账户信息</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="mb-4">
                <Label>邮箱</Label>
                <Input type="email" readOnly 
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={user.email}/>
              </div>
              <div className="mb-4">
                <Label>当前套餐</Label>
                <Input type="email" readOnly 
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={user.plan}/>
              </div>
              <div className="mb-4">
                <Label>套餐到期时间</Label>
                <Input type="email" readOnly 
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={new Date(user.expiredTime).toLocaleString()}/>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={toPlan}>查看其他套餐</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}