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

export function Register() {
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
              <div className="flex">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <Button type="submit" className="">
                  发送验证码
                </Button>
              </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="first-name">邮箱验证码</Label>
            <Input id="first-name" placeholder="xxxxxx" required />
          </div>
          <Button type="submit" className="w-full">
            注册账户
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          已经有了账户?{" "}
          <a href="/login" className="underline">
            登录
          </a>
        </div>
      </CardContent>
    </Card>
  )
}