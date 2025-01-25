import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { queryOrderStatus } from '@/lib/api'
import { useEffect, useRef } from 'react'

export function PayOrder() {
  const countRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout>()
  const navigate = useNavigate()
  const location = useLocation()
  const orderData = location.state

  const queryOrderTimer = () => {
    countRef.current++
    // 定时查询订单支付状态
    timerRef.current = setTimeout(() => {
      toast({ description: '正在查询订单支付状态...' })
      const data = {
        orderId: orderData.orderId,
      }
      queryOrderStatus(data).then(res => {
        if (res.success && res.data.paySt === 1) {
          toast({ description: '订单支付完成...' })
          navigate('/account')
        } else {
          if (countRef.current < 20) {
            queryOrderTimer()
          } else {
            toast({ description: '订单查询次数达到上限...' })
          }
        }
      })
    }, 3000)
  }

  useEffect(() => {
    if (!orderData?.orderId || 
      (!orderData.data?.QRcode_url && !orderData.data?.img)) {
      toast({
        variant: "destructive",
        description: '请先选择购买的套餐...',
        action: <ToastAction className="bg-primary rounded-md px-4 py-2" altText="去选择套餐" onClick={() => navigate('/plans')}>去选择套餐</ToastAction>,
      })
    } else {
      queryOrderTimer()
    }

    // 清理函数：组件卸载或路由变化时清除定时器
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [orderData, navigate]) // 依赖项包含 orderData 和 navigate

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2"><a href="/">Flomo Extension</a> 支付二维码</h1>
            <p className="text-base text-gray-600">请使用 <b>{orderData.channel === 'wx' ? '微信' : '支付宝'}</b> 完成支付</p>
          </div>
          
          { 
            orderData ? (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-col items-center space-y-4">
                  {
                    orderData.channel === 'wx' ? 
                    <img src={orderData.data?.QRcode_url} alt="支付二维码" className="w-56 h-56" /> :
                    <img src={orderData.data?.img} alt="支付二维码" className="w-56 h-56" />
                  }
                  
                  <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">订单号：</span>
                      <span className="font-medium">{orderData.orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">交易描述：</span>
                      <span className="font-medium">{orderData.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">交易金额：</span>
                      <span className="text-xl font-bold text-green-600">¥{orderData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg text-gray-600">没有需要支付的订单</p>
                  <Button 
                    className="w-48" 
                    color="orange" 
                    onClick={() => navigate('/plans')}
                  >
                    去选择套餐
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
