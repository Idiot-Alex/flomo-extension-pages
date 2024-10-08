import { useLocation, useNavigate } from 'react-router-dom'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { queryOrderStatus } from '@/lib/api'

export function PayOrder() {
  const navigate = useNavigate()

  const location = useLocation()
  const orderData = location.state

  const queryOrderTimer = () => {
    // 定时查询订单支付状态
    let timer = setTimeout(() => {
      toast({
        description: '正在查询订单支付状态...',
      })
      const data = {
        orderId: orderData.orderId,
      }
      queryOrderStatus(data).then(res => {
        console.log(res)
        if (res.success && res.data.paySt === 1) {
          toast({
            description: '订单支付完成...',
          })
          clearTimeout(timer)
          navigate('/account')
        } else {
          queryOrderTimer()
        }
      })
    }, 3000)
  }

  if (!orderData?.orderId || !orderData.data?.QRcode_url) {
    toast({
      variant: "destructive",
      description: '请先选择购买的套餐...',
      action: <ToastAction altText="去选择套餐" onClick={() => navigate('/plans')}>去选择套餐</ToastAction>,
    })
  } else {
    queryOrderTimer()
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 支付二维码</h1>
      </div>
      { 
        orderData ? (
          <div className="mx-auto grid w-full max-w-6xl">
            <div className="flex flex-col">
              <img src={orderData.data?.QRcode_url} alt="支付二维码" className="w-80" />
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