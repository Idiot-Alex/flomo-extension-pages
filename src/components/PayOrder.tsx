import { useLocation, useNavigate } from 'react-router-dom'
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
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 支付二维码</h1>
        <p>请使用 <b>{orderData.channel === 'wx' ? '微信' : '支付宝'}</b> 完成支付</p>
      </div>
      { 
        orderData ? (
          <div className="mx-auto grid w-full max-w-6xl">
            <div className="flex flex-col">
              {
                orderData.channel === 'wx' ? 
                <img src={orderData.data?.QRcode_url} alt="支付二维码" className="w-80" /> :
                <img src={orderData.data?.img} alt="支付二维码" className="w-80" />
              }
              
              <p>订单号：{orderData.orderId}</p>
              <p>交易描述：{orderData.title}</p>
              <p>
                交易金额：
                <b className="text-2xl">¥{orderData.price}</b>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p>没有需要支付的订单, 去选择套餐？</p>
            <Button className="w-20" color="orange" onClick={() => navigate('/plans')}>立即前往</Button>
          </div>
        )
      }
    </>
  )
}