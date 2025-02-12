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
import { FormikValues, useFormik } from 'formik'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { resetPwd, sendEmailCode } from '@/lib/api'
import { ApiRes } from '@/lib/type'
import CryptoJS from 'crypto-js'

export function ResetPwd() {
  const { toast } = useToast()

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    code: yup.string().required().length(6),
  })

  const formik = useFormik<FormikValues>({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    validateOnChange: true,
    validationSchema: schema,
    onSubmit: (values: any) => {
      console.log(values)
    },
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
      type: 'ResetPwd',
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
  
  const onResetPwd = () => {
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
    resetPwd(params).then((res: ApiRes) => {
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
  
  return (
    <Card className="mx-auto mt-16 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">重置密码 <a href="/">Flomo Extension</a></CardTitle>
        <CardDescription>
          输入您的信息重置账户密码
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
              <Label className="text-red-400">{formik.errors.email as string || ''}</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">新密码</Label>
            <Input name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
              <Label className="text-red-400">{formik.errors.password as string || ''}</Label>
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
            <Label className="text-red-400">{formik.errors.code as string || ''}</Label>
          </div>
          <Button type="submit" className="w-full" onClick={onResetPwd}>
            重置账户密码
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          密码已经重置成功?{" "}
          <a href="/login" className="underline">
            立即登录
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
