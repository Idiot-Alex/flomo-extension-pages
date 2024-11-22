import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useToast } from '@/components/ui/use-toast'
import { login, oauthGoogleLogin } from '@/lib/api'
import { ApiRes } from '@/lib/type'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/actions'
import CryptoJS from 'crypto-js'

export function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => {}
  })

  const onLogin = () => {
    if (!formik.isValid) {
      toast({
        variant: "destructive",
        description: '请按照提示信息输入正确信息'
      })
      return
    }
    const hash = CryptoJS.SHA256(formik.values.password).toString()
    const params = {
      email: formik.values.email,
      password: hash,
    }
    login(params).then((res: ApiRes) => {
      if (res.success) {
        formik.resetForm()
        toast({
          description: res.msg
        })
        dispatch(setUser(res.data))
        // 跳转到首页
        navigate('/')
      } else {
        toast({
          variant: "destructive",
          description: res.msg
        })
      }
    })
  }

  const onGoogleLogin = async() => {
    // 1. 获取登录链接
    const res = await oauthGoogleLogin()
    const { data } = res
    
    // 2. 打开登录弹窗
    const popup = window.open(data.url, 'Google 登录', 'width=600,height=600')
    
    // 3. 监听登录结果
    window.addEventListener('message', (event) => {
      if (event.data.type === 'google-oauth-callback') {
        // 登录成功,处理用户数据
        const res = event.data.data
        if (res.success) {
          // 存储用户数据,更新界面等
          toast({
            description: res.msg
          })
          dispatch(setUser(res.data))
          // 跳转到首页
          navigate('/')
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      } else if (event.data.type === 'google-oauth-error') {
        // 处理登录错误
        console.error('登录失败:', event.data.error)
      }
    })
  }

  return (
    <div className="h-screen w-full flex">
      <Card className="flex-1 mx-auto my-auto mt-16 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">登录 <a href="/">Flomo Extension</a></CardTitle>
          <CardDescription>
            输入邮箱和密码登录您的账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
              />
              <Label className="text-red-400">{ formik.errors.email || '' }</Label>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <a href="/reset-pwd" className="ml-auto inline-block text-sm underline">
                  忘记密码?
                </a>
              </div>
              <Input id="password" type="password" required value={formik.values.password} onChange={formik.handleChange} />
              <Label className="text-red-400">{ formik.errors.password || '' }</Label>
            </div>
            <Button type="submit" className="w-full" onClick={onLogin}>
              登录
            </Button>
            <Button variant="secondary" type="submit" className="w-full" onClick={onGoogleLogin}>
              <img className="w-4 h-4 m-4" src="/google_logo.png" alt="Google 登录" />
              <span>使用 Google 登录</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            还没有账号?{" "}
            <a href="/register" className="underline">
              立即注册
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
