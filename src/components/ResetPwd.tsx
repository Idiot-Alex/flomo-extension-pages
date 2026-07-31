import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useToast } from '@/components/ui/use-toast'
import { resetPwd, sendEmailCode } from '@/lib/api'
import type { ApiRes } from '@/lib/type'

const schema = yup.object({
  email: yup.string().email('请输入有效的邮箱地址').required('请输入邮箱'),
  password: yup.string().min(6, '密码至少需要 6 位').required('请输入新密码'),
  code: yup.string().length(6, '请输入 6 位验证码').required('请输入验证码'),
})

export function ResetPwd() {
  const { toast } = useToast()
  const [codeId, setCodeId] = useState('')
  const [countingDown, setCountingDown] = useState(false)
  const [countDown, setCountDown] = useState(60)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    if (!countingDown) {
      return
    }

    const timer = window.setInterval(() => {
      setCountDown((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setCountingDown(false)
          return 60
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [countingDown])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: async (values) => {
      if (!codeId) {
        toast({ variant: 'destructive', description: '请先获取邮箱验证码' })
        return
      }

      setIsResetting(true)
      try {
        const password = CryptoJS.SHA256(values.password).toString()
        const res: ApiRes = await resetPwd({
          email: values.email,
          password,
          code: values.code,
          codeId,
        })

        if (!res.success) {
          toast({ variant: 'destructive', description: res.msg })
          return
        }

        toast({ description: res.msg })
        setCountingDown(false)
        setCodeId('')
        formik.resetForm()
      } catch (error) {
        toast({
          variant: 'destructive',
          description: error instanceof Error ? error.message : '密码重置失败，请稍后重试',
        })
      } finally {
        setIsResetting(false)
      }
    },
  })

  const onSendEmailCode = async () => {
    formik.setFieldTouched('email', true)
    try {
      await schema.validateAt('email', formik.values)
    } catch {
      toast({ variant: 'destructive', description: '请先输入有效的邮箱地址' })
      return
    }

    setIsSendingCode(true)
    try {
      const res: ApiRes = await sendEmailCode({ email: formik.values.email, type: 'ResetPwd' })
      if (!res.success) {
        const detail = res.data?.message ? `：${res.data.message}` : ''
        toast({ variant: 'destructive', description: `${res.msg}${detail}` })
        return
      }

      setCodeId(res.data.codeId)
      setCountDown(60)
      setCountingDown(true)
      toast({ description: res.msg })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: error instanceof Error ? error.message : '验证码发送失败，请稍后重试',
      })
    } finally {
      setIsSendingCode(false)
    }
  }

  return (
    <main id="main-content" className="grid min-h-dvh place-items-center bg-secondary/55 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/login" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <img src="/favicon.png" alt="" className="h-8 w-8 rounded-lg" width="128" height="128" />
          返回登录
        </Link>

        <Card className="border-emerald-950/10 bg-white shadow-[0_24px_70px_-48px_rgba(9,67,43,0.65)]">
          <CardHeader className="space-y-2 pb-5">
            <CardTitle className="text-3xl tracking-[-0.03em]">重置密码</CardTitle>
            <CardDescription>通过邮箱验证码设置一个新密码</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="flex gap-2">
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
                    aria-describedby="reset-email-error"
                  />
                  <Button type="button" variant="outline" className="shrink-0 px-3" disabled={countingDown || isSendingCode || isResetting} onClick={onSendEmailCode}>
                    {isSendingCode && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                    {countingDown ? `${countDown}s` : '发送验证码'}
                  </Button>
                </div>
                <p id="reset-email-error" className="min-h-5 text-sm text-destructive">
                  {formik.touched.email ? formik.errors.email : ''}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">新密码</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched.password && formik.errors.password)}
                  aria-describedby="reset-password-error"
                />
                <p id="reset-password-error" className="min-h-5 text-sm text-destructive">
                  {formik.touched.password ? formik.errors.password : ''}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reset-code">邮箱验证码</Label>
                <InputOTP
                  id="reset-code"
                  name="code"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={formik.values.code}
                  onChange={(value) => formik.setFieldValue('code', value)}
                  onBlur={() => formik.setFieldTouched('code', true)}
                  aria-describedby="reset-code-error"
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}
                  </InputOTPGroup>
                </InputOTP>
                <p id="reset-code-error" className="min-h-5 text-sm text-destructive">
                  {formik.touched.code ? formik.errors.code : ''}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={!formik.isValid || !codeId || isSendingCode || isResetting}>
                {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                确认重置
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              已经想起密码？{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">返回登录</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
