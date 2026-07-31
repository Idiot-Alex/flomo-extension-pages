import { CircleUser, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearUser } from '@/store/actions'
import type { AppDispatch, RootState } from '@/store/store'

const navItems = [
  { to: '/', label: '主页' },
  { to: '/guide', label: '使用说明' },
  { to: '/plans', label: '价格套餐' },
  { to: '/posts', label: '文章' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) => [
  'relative px-3 py-2 text-sm font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  isActive
    ? 'text-primary after:absolute after:inset-x-3 after:-bottom-[1px] after:h-px after:bg-primary'
    : 'text-muted-foreground hover:text-foreground',
].join(' ')

export function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)

  const onLogout = () => {
    dispatch(clearUser())
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1120px] items-center gap-4 px-4 sm:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Flomo Extension 首页"
        >
          <img src="/favicon.png" alt="" className="h-10 w-10 rounded-lg" width="128" height="128" />
          <span className="font-editorial hidden text-lg font-medium tracking-tight text-foreground sm:inline">Flomo Extension</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
          {!user.email && (
            <NavLink to="/register" className={navLinkClass}>注册</NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="max-w-56 gap-2 px-3">
                  <CircleUser className="h-5 w-5 shrink-0" />
                  <span className="hidden truncate lg:inline">{user.email}</span>
                  <span className="sr-only lg:hidden">打开账户菜单</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/account')}>我的账户</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">登录</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="打开导航菜单">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[18rem] border-border bg-background">
              <SheetTitle className="flex items-center gap-2">
                <img src="/favicon.png" alt="" className="h-8 w-8 rounded-lg" width="128" height="128" />
                Flomo Extension
              </SheetTitle>
              <SheetDescription className="sr-only">选择要前往的页面</SheetDescription>
              <nav className="mt-8 grid gap-2" aria-label="移动端主导航">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink to={item.to} end={item.to === '/'} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
                {!user.email && (
                  <SheetClose asChild>
                    <NavLink to="/register" className={navLinkClass}>注册</NavLink>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
