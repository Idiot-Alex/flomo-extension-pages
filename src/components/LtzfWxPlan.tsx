import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createWxOrder } from '@/lib/api'
import { FLOMO_EXTENSION_PAYMENT_RETURN_URL, ApiRes, type PayOption } from '@/lib/type'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@radix-ui/react-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from './ui/use-toast'
import { useSelector } from 'react-redux'
import { usePlan } from './ui/use-plan'
import type { RootState } from '@/store/store'

export function LtzfWxPlan() {
  const user = useSelector((state: RootState) => {
    return state.user
  })
  const plan = usePlan()
  const [pendingPlanMonth, setPendingPlanMonth] = useState<number | null>(null)
  const navigate = useNavigate()

  const wxPlans = [
    {
      color: 'bg-primary',
      title: '不受扩展本地每日次数限制',
      desc: '付费权益有效期内，不受扩展本地每日保存次数限制',
    },
    {
      color: 'bg-primary',
      title: '使用同一 Extension 账户',
      desc: '购买前请注册或登录，扩展内使用同一账户识别权益',
    },
    {
      color: 'bg-primary',
      title: '不要求 flomo 官方会员',
      desc: '但必须登录可用的 flomo 网页账户，才能触发保存',
    }
  ]

  const wxPayList = [
    {
      title: '1 个月',
      month: 1,
      price: 5,
      payPrice: 1.9,
    },
    {
      title: '半年',
      month: 6,
      price: 30,
      payPrice: 5.9,
    },
    {
      title: '一年',
      month: 12,
      price: 60,
      payPrice: 9.9,
    },
  ]

  const renderWxPay = () => {
    const toPay = async (payData: PayOption) => {
      setPendingPlanMonth(payData.month)
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录 Flomo Extension 账户才能继续支付',
          action: <ToastAction className="bg-primary rounded-md px-4 py-2" altText="登录 Flomo Extension 账户" onClick={() => navigate('/login')}>去登录</ToastAction>,
        })
        setPendingPlanMonth(null)
        return
      }
      toast({
        description: '正在生成订单，请稍后...'
      })
      const params = {
        email: user.email,
        title: `Flomo Extension【Pay】套餐 - ${payData.title}`,
        month: payData.month,
        price: payData.payPrice,
        returnUrl: FLOMO_EXTENSION_PAYMENT_RETURN_URL,
      }

      try {
        const res: ApiRes = await createWxOrder(params)
        if (res.success) {
          toast({
            description: res.msg
          })
          const orderData = {
            ...res.data,
            channel: 'wx',
            title: params.title,
            price: params.price,
          }
          // 跳转支付页面
          navigate('/pay-order', { 
            state: orderData
          })
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      } catch {
        toast({
          variant: "destructive",
          description: '下单失败'
        })
      } finally {
        setPendingPlanMonth(null)
      }
    }

    return (<>
      {
        wxPayList.map((item) => (
          <div key={item.month} className="grid grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
            <Label>{item.title}</Label>
            <Label
              className="flex flex-col"
              aria-label={`参考价 ¥${item.price}，当前价 ¥${item.payPrice}`}
            >
              <span className="text-xs text-muted-foreground">参考价 <s>¥{item.price}</s></span>
              <span className="mt-1 text-xs text-muted-foreground">
                当前价 <b className="text-xl text-foreground">¥{item.payPrice}</b>
              </span>
            </Label>
            <Button
              className="w-full"
              disabled={pendingPlanMonth !== null}
              loading={pendingPlanMonth === item.month}
              loadingText="生成中"
              onClick={() => toPay(item)}
            >
              去支付
            </Button>
          </div>
        ))
      }
      </>
    )
  }

  return (<>
    <Card className="flex h-full w-full flex-col border-primary/45 bg-card shadow-whisper ring-1 ring-primary/10">
      <CardHeader>
        <p className="kami-eyebrow">微信支付</p>
        <CardTitle className="text-2xl">Pay 套餐</CardTitle>
        <CardDescription>
          请先注册或登录 Flomo Extension 账户；支付确认后，付费期内不受扩展本地每日次数限制
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        { plan.renderPlan(wxPlans) }
      </CardContent>
      <CardFooter className="border-t px-6 py-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full">立即购买</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">套餐选择</h4>
                <p className="text-sm text-muted-foreground">
                  请选择下面任意一个套餐前往支付
                </p>
              </div>
              <div className="grid gap-2">
                { renderWxPay() }
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  </>)
}
