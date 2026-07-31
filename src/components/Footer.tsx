import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="kami-page flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
        <div className="grid grid-cols-[3.5rem_1fr] items-center gap-x-4">
          <img src="/favicon.png" alt="" className="row-span-2 h-14 w-14 rounded-lg" width="128" height="128" />
          <p className="font-editorial text-2xl font-medium leading-tight text-foreground">Flomo Extension</p>
          <p className="mt-1 text-sm text-muted-foreground">看见想法，就在当前网页记下来。</p>
        </div>

        <div className="text-left text-sm text-muted-foreground sm:max-w-md sm:text-right">
          <nav className="mb-4 text-foreground" aria-label="页脚导航">
            <Link to="/privacy" className="transition-colors hover:text-primary">隐私政策</Link>
            <span className="mx-2 text-border" aria-hidden="true">·</span>
            <Link to="/terms" className="transition-colors hover:text-primary">服务条款</Link>
            <span className="mx-2 text-border" aria-hidden="true">·</span>
            <a href="https://txc.qq.com/products/648748" className="transition-colors hover:text-primary" target="_blank" rel="noreferrer">问题反馈</a>
          </nav>
          <p className="font-editorial leading-6">记录不该打断思考，它只需要离你更近一点。</p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} Flomo Extension</p>
        </div>
      </div>
    </footer>
  )
}
