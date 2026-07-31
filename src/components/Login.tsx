import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CryptoJS from 'crypto-js'
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
import { useToast } from '@/components/ui/use-toast'
import { login, oauthGoogleLogin } from '@/lib/api'
import type { ApiRes } from '@/lib/type'
import { setUser } from '@/store/actions'
import type { AppDispatch } from '@/store/store'
import { openOAuthPopup } from '@/lib/oauth'

const schema = yup.object({
  email: yup.string().email('请输入有效的邮箱地址').required('请输入邮箱'),
  password: yup.string().min(6, '密码至少需要 6 位').required('请输入密码'),
})

export function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isPasswordLoginPending, setIsPasswordLoginPending] = useState(false)
  const [isGoogleLoginPending, setIsGoogleLoginPending] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setIsPasswordLoginPending(true)
      try {
        const password = CryptoJS.SHA256(values.password).toString()
        const res: ApiRes = await login({ email: values.email, password })

        if (!res.success) {
          toast({ variant: 'destructive', description: res.msg })
          return
        }

        dispatch(setUser(res.data))
        formik.resetForm()
        toast({ description: res.msg })
        navigate('/')
      } catch (error) {
        toast({
          variant: 'destructive',
          description: error instanceof Error ? error.message : '登录失败，请稍后重试',
        })
      } finally {
        setIsPasswordLoginPending(false)
      }
    },
  })

  const onGoogleLogin = async () => {
    setIsGoogleLoginPending(true)
    try {
      const oauthResponse = await oauthGoogleLogin()
      if (!oauthResponse.success || !oauthResponse.data?.url) {
        throw new Error(oauthResponse.msg || '无法获取 Google 登录链接')
      }

      const result = await openOAuthPopup(oauthResponse.data.url, 'Google 登录')
      if (!result.success) {
        throw new Error(result.msg)
      }

      toast({ description: result.msg })
      dispatch(setUser(result.data))
      navigate('/')
    } catch (error) {
      toast({
        variant: 'destructive',
        description: error instanceof Error ? error.message : 'Google 登录失败',
      })
    } finally {
      setIsGoogleLoginPending(false)
    }
  }

  return (
    <main id="main-content" className="grid min-h-dvh place-items-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <img src="/favicon.png" alt="" className="h-8 w-8 rounded-lg" width="128" height="128" />
          返回 Flomo Extension
        </Link>

        <Card className="border-border bg-card shadow-whisper">
          <CardHeader className="space-y-2 pb-5">
            <p className="kami-eyebrow">账户访问</p>
            <CardTitle className="text-3xl tracking-[-0.03em]">登录账户</CardTitle>
            <CardDescription>继续查看套餐状态和账户信息</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
                  aria-describedby="email-error"
                />
                <p id="email-error" className="min-h-5 text-sm text-destructive">
                  {formik.touched.email ? formik.errors.email : ''}
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <Link to="/reset-pwd" className="text-sm font-medium text-primary hover:underline">忘记密码？</Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched.password && formik.errors.password)}
                  aria-describedby="password-error"
                />
                <p id="password-error" className="min-h-5 text-sm text-destructive">
                  {formik.touched.password ? formik.errors.password : ''}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!formik.dirty || !formik.isValid || isGoogleLoginPending}
                loading={isPasswordLoginPending}
                loadingText="登录中"
              >
                登录
              </Button>

              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">或者</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onGoogleLogin}
                disabled={isPasswordLoginPending}
                loading={isGoogleLoginPending}
                loadingText="连接 Google"
              >
                <img className="mr-2 h-4 w-4" src="/google_logo.webp" alt="" width="64" height="64" />
                使用 Google 登录
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">立即注册</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
