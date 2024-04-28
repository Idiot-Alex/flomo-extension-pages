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
import { login } from '@/lib/api'
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

  return (
    <Card className="mx-auto mt-16 max-w-sm">
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
            <Label className="text-red-400">{ <>{formik.errors.email}</> ?? '' }</Label>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">密码</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                忘记密码?
              </a>
            </div>
            <Input id="password" type="password" required value={formik.values.password} onChange={formik.handleChange} />
            <Label className="text-red-400">{ <>{formik.errors.password}</> ?? '' }</Label>
          </div>
          <Button type="submit" className="w-full" onClick={onLogin}>
            登录
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
  )
}
