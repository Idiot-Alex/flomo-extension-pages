import { CircleUser, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)

  const isActive = (path: string) => location.pathname === path

  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const onAccount = () => {
    navigate('/account')
  }

  return (
    <header className="z-50 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <img alt="flomo extension logo" src="/favicon.png" className="h-20 mt-16 border rounded-[4rem] border-gray-300" />
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a href="/" className={`${isActive('/') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
          主页
        </a>
        <a href="/guide" className={`${isActive('/guide') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
          使用说明
        </a>
        <a href="/plans" className={`${isActive('/plans') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
          价格套餐
        </a>
        <a href="/posts" className={`${isActive('/posts') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
          文章
        </a>
        {!user.email && (
          <a href="/register" className={`${isActive('/register') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'}`}>注册</a>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a href="/" className={`${isActive('/') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'}`}>
              主页
            </a>
            <a href="/guide" className={`${isActive('/guide') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
              使用说明
            </a>
            <a href="/plans" className={`${isActive('/plans') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'}`}>
              价格套餐
            </a>
            <a href="/posts" className={`${isActive('/posts') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
              文章
            </a>
            {!user.email && (
              <a href="/register" className={`${isActive('/register') ? 'text-white bg-primary rounded-lg px-3 py-1.5 font-medium transition-all duration-300' : 'text-muted-foreground hover:text-foreground'}`}>注册</a>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {user.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="absolute right-20">{user.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onAccount}>我的账户</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <a href="/login" className="text-muted-foreground hover:text-foreground">登录</a>
          </Button>
        )}
      </div>
    </header>
  )
}
