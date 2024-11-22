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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { oauthGoogleRegister, register, sendEmailCode } from '@/lib/api'
import { ApiRes } from '@/lib/type'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'

export function Register() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    code: yup.string().required().length(6),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    validateOnChange: true,
    validationSchema: schema,
    onSubmit: () => {},
  })

  const [codeId, setCodeId] = useState('')
  const [countingDown, setCountingDown] = useState(false)
  const [countDown, setCountDown] = useState(60)

  useEffect(() => {
    if (countingDown) {
      let timer: any = null
      
      const handleTimer = () => {
        if (countDown > 0) {
          setCountDown(countDown - 1)
        } else {
          clearInterval(timer)
          setCountingDown(false)
          setCountDown(60)
        }
      }
      timer = setInterval(handleTimer, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [countDown, countingDown])

  const handleInputOtp = (value: string) => {
    formik.setFieldValue('code', value)
  }

  const onSendEmailCode = () => {
    if (formik.errors.email) {
      toast({
        variant: 'destructive',
        description: formik.errors.email.toString()
      })
      return
    }
    const params = {
      email: formik.values.email,
      type: 'Register',
    }
    sendEmailCode(params).then((res: ApiRes) => {
      if (res.success) {
        toast({
          description: res.msg
        })
        setCodeId(res.data.codeId)
        setCountingDown(true)
      } else {
        let msg = res.msg
        if (res.data?.message) {
          msg = `${msg}: ${res.data.message}`
        }
        toast({
          variant: 'destructive',
          description: msg
        })
      }
    })
  }
  
  const onRegister = () => {
    if (!formik.isValid) {
      toast({
        variant: 'destructive',
        description: '请按照提示信息输入正确信息'
      })
      return
    }
    const hash = CryptoJS.SHA256(formik.values.password).toString()
    const params = {
      email: formik.values.email,
      password: hash,
      code: formik.values.code,
      codeId: codeId
    }
    register(params).then((res: ApiRes) => {
      if (res.success) {
        toast({
          description: res.msg
        })
        setCountingDown(false)
        formik.resetForm()
      } else {
        toast({
          description: res.msg
        })
      }
    })
  }
  
  const onGoogleRegister = async () => {
    const res = await oauthGoogleRegister()
    const { data } = res
    
    window.open(data.url, 'Google 注册', 'width=600,height=600')

    window.addEventListener('message', (event) => {
      if (event.data.type === 'google-oauth-callback') {
        // 注册成功,处理用户数据
        const res = event.data.data
        if (res.success) {
          // 存储用户数据,更新界面等
          toast({
            description: res.msg
          })
          // 跳转到登录
          navigate('/login')
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      } else if (event.data.type === 'google-oauth-error') {
        // 处理登录错误
        console.error('注册失败:', event.data.error)
      }
    })
  }

  return (
    <div className="h-screen w-full flex">
      <Card className="flex-1 mx-auto my-auto mt-16 max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">注册 <a href="/">Flomo Extension</a></CardTitle>
          <CardDescription>
            输入您的信息创建账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="flex space-x-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <Button type="submit" className="" disabled={countingDown} onClick={onSendEmailCode}>
                    发送验证码{ countDown === 60 ? '' : `${countDown} s` }
                  </Button>
                </div>
                <Label className="text-red-400">{ formik.errors.email || '' }</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码</Label>
              <Input name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
                <Label className="text-red-400">{ formik.errors.password || '' }</Label>
            </div>
            <div className="grid gap-4">
              <Label htmlFor="first-name">邮箱验证码</Label>
              <InputOTP
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={formik.values.code}
                onChange={handleInputOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Label className="text-red-400">{ formik.errors.code || '' }</Label>
            </div>
            <Button type="submit" className="w-full" onClick={onRegister}>
              注册账户
            </Button>
            <Button variant="secondary" type="submit" className="w-full" onClick={onGoogleRegister}>
              <img className="w-4 h-4 m-4" src="/google_logo.png" alt="Google 登录" />
              <span>使用 Google 注册</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            已经有了账户?{" "}
            <a href="/login" className="underline">
              立即登录
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
