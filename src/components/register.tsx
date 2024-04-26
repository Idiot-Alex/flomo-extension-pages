import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import * as yup from "yup"
import { useFormik } from "formik"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

export function Register() {
  const { toast } = useToast()

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
    onSubmit: (values: any) => {
      console.log(values)
    },
  })

  const handleInputOtp = (value: string) => {
    formik.setFieldValue('code', value)
  }

  const onSendEmailCode = () => {
    if (formik.errors.email) {
      console.log(formik.errors.email)
      toast({
        variant: "destructive",
        description: formik.errors.email.toString()
      })
    }
  }
  
  const onRegister = () => {
    
  }
  
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">注册</CardTitle>
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
                <Button type="submit" className="" onClick={onSendEmailCode}>
                  发送验证码
                </Button>
              </div>
              <Label className="text-red-400">{ <>{formik.errors.email}</> ?? '' }</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
              <Label className="text-red-400">{ <>{formik.errors.password}</> ?? '' }</Label>
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
            <Label className="text-red-400">{ <>{formik.errors.code}</> ?? '' }</Label>
          </div>
          <Button type="submit" className="w-full" onClick={onRegister}>
            注册账户
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          已经有了账户?{" "}
          <a href="/login" className="underline">
            登录
          </a>
        </div>
        <Toaster />
      </CardContent>
    </Card>
  )
}
