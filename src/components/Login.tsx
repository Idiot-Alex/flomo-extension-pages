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

export function Login() {
  return (
    <Card className="mx-auto max-w-sm">
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
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">密码</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                忘记密码?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
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
