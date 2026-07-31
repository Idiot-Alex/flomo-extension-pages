import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { queryOrderStatus } from '@/lib/api'
import { useEffect, useRef, useState } from 'react'

interface PayOrderState {
  orderId: string
  channel: 'wx' | 'ali'
  title: string
  price: number
  data?: {
    QRcode_url?: string
    img?: string
  }
}

export function PayOrder() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const [paymentStatus, setPaymentStatus] = useState('等待扫码支付')
  const navigate = useNavigate()
  const location = useLocation()
  const orderData = location.state as PayOrderState | null
  const hasPaymentCode = Boolean(orderData?.data?.QRcode_url || orderData?.data?.img)
  const hasValidOrder = Boolean(orderData?.orderId && hasPaymentCode)

  useEffect(() => {
    if (!hasValidOrder || !orderData) {
      toast({
        variant: "destructive",
        description: '请先选择购买的套餐...',
        action: <ToastAction className="bg-primary rounded-md px-4 py-2" altText="去选择套餐" onClick={() => navigate('/plans')}>去选择套餐</ToastAction>,
      })
      return
    }

    let attempts = 0
    let cancelled = false

    const queryOrderTimer = () => {
      attempts += 1
      timerRef.current = setTimeout(async () => {
        if (cancelled) {
          return
        }

        setPaymentStatus('正在确认支付状态…')
        try {
          const res = await queryOrderStatus({ orderId: orderData.orderId })
          if (res.success && res.data?.paySt === 1) {
            setPaymentStatus('支付成功，正在跳转…')
            toast({ description: '订单支付完成' })
            navigate('/account')
            return
          }
        } catch {
          setPaymentStatus('暂时无法确认，正在重试…')
        }

        if (attempts < 20) {
          queryOrderTimer()
        } else {
          setPaymentStatus('暂未确认支付结果，请稍后在账户页查看')
          toast({ description: '订单查询次数达到上限，请稍后查看账户状态' })
        }
      }, 3000)
    }

    queryOrderTimer()

    return () => {
      cancelled = true
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [hasValidOrder, navigate, orderData])

  return (
    <>
      <Header />
      <main id="main-content" className="container mx-auto min-h-[calc(100dvh-12rem)] px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="mb-2 text-2xl font-bold"><Link to="/">Flomo Extension</Link> 支付二维码</h1>
            {hasValidOrder && orderData ? (
              <p className="text-base text-gray-600">请使用 <b>{orderData.channel === 'wx' ? '微信' : '支付宝'}</b> 完成支付</p>
            ) : (
              <p className="text-base text-gray-600">订单信息会在选择套餐后生成</p>
            )}
          </div>
          
          { 
            hasValidOrder && orderData ? (
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
                    <p className="text-center text-sm text-gray-500" aria-live="polite">{paymentStatus}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg text-gray-600">没有需要支付的订单</p>
                  <Button 
                    className="w-48" 
                    onClick={() => navigate('/plans')}
                  >
                    去选择套餐
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </main>
      <Footer />
    </>
  )
}
