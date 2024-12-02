import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function NotFound() {

  const navigate = useNavigate()

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center my-auto">
      <h3 className="text-xl font-bold">404 页面未找到</h3>
      <p className="text-xs mt-2">抱歉,您访问的页面不存在。</p>
      <Button className="mt-4" onClick={() => navigate('/')}>
        返回主页
      </Button>
    </div>
  )
}