import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import { useToast } from '@/components/ui/use-toast'
import { createAfdianOrder, createWxOrder } from '@/lib/api'
import { ApiRes, FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL, FLOMO_EXTENSION_WEB_URL } from '@/lib/type'
import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"


export function Plans() {
  const user = useSelector((state: any) => {
    return state.user
  })
  const { toast } = useToast()

  const onDownload = () => {
    onConfetti()
    window.open(FLOMO_EXTENSION_FILE_URL)
  }
  const onWebStore = () => {
    onConfetti()
    window.open(FLOMO_EXTENSION_WEB_STORE_URL)
  }

  const onConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const freePlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-100',
      title: '无需注册账号',
      desc: '不需要注册或者登录',
    },
    {
      color: 'bg-sky-100',
      title: '每日使用次数 2',
      desc: '使用插件保存 flomo 笔记次数',
    },
  ]

  const afdianPayPlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储用户任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-500',
      title: '需要注册并登录账号',
      desc: '使用邮箱账号注册或者登录',
    },
    {
      color: 'bg-sky-500',
      title: '每日使用次数无限制',
      desc: '使用插件保存 flomo 笔记次数',
    },
    {
      color: 'bg-sky-500',
      title: '原价 ¥5.0 一个月',
      desc: '限时折扣，¥10.0 半年会员，¥15.0 一年会员，赶紧冲哇',
    }
  ]

  const wxPlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储用户任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-500',
      title: '需要注册并登录账号',
      desc: '使用邮箱账号注册或者登录',
    },
    {
      color: 'bg-sky-500',
      title: '每日使用次数无限制',
      desc: '使用插件保存 flomo 笔记次数',
    },
    {
      color: 'bg-sky-500',
      title: '原价 ¥5.0 一个月',
      desc: '限时特价，¥10.0 半年会员，¥15.0 一年会员，赶紧冲哇',
    },
    {
      color: 'bg-sky-500',
      title: '微信支付，更加方便',
      desc: '更多功能敬请期待...',
    }
  ]

  const renderPlan = (plans: Array<any>) => {
    return (
      plans.map((item, i) => (
        <div key={i} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className={`flex h-2 w-2 translate-y-1 rounded-full ${item.color}`}/>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.desc}
            </p>
          </div>
        </div>
      ))
    )
  }

  const afdianPayList = [
    {
      title: '半年',
      month: 1,
      price: 30,
      payPrice: 10,
    },
    {
      title: '一年',
      month: 2,
      price: 60,
      payPrice: 15,
    },
  ]

  const wxPayList = [
    {
      title: '半年',
      month: 6,
      price: 30,
      payPrice: 10,
    },
    {
      title: '一年',
      month: 12,
      price: 60,
      payPrice: 15,
    },
  ]

  const renderAfdianPay = () => {
    const toPay = (payData: any) => {
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录账号才能继续支付...'
        })
        return
      }
      const params = {
        email: user.email,
        title: `Flomo Extension【Pay】套餐 - ${payData.title}`,
        month: payData.month,
        price: payData.payPrice,
      }
      createAfdianOrder(params).then((res: ApiRes) => {
        if (res.success) {
          window.open(res.data)
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      })
    }
    return (
      afdianPayList.map((item, i) => (
        <div key={i} className="grid grid-cols-3 items-center gap-4 border-b pb-4">
          <Label htmlFor="width">{item.title}</Label>
          {
            item.price === item.payPrice ?
            <Label htmlFor="width">
              <b className="text-2xl">¥{item.payPrice}</b>
            </Label> : 
            <Label htmlFor="width" className="flex flex-col">
              <s className="text-gray-400">¥{item.price}</s>
              <b className="text-2xl">¥{item.payPrice}</b>
            </Label>
          }
          <Button className="w-full" onClick={() => toPay(item)}>去支付</Button>
        </div>
      ))
    )
  }

  const renderWxPay = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [orderData, setOrderData] = useState({} as any)

    const toPay = (payData: any) => {
      setIsButtonDisabled(true)
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录账号才能继续支付...'
        })
        setIsButtonDisabled(false)
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
        returnUrl: FLOMO_EXTENSION_WEB_URL,
      }
      createWxOrder(params).then((res: ApiRes) => {
        setIsButtonDisabled(false)
        if (res.success) {
          setOrderData({
            ...res.data,
            title: params.title,
            price: params.price,
          })
          toast({
            description: res.msg
          })
          setDialogOpen(true)
          setShowDialog(true)
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      }).catch(_ => {
        toast({
          variant: "destructive",
          description: '下单失败'
        })
        setIsButtonDisabled(false)
      })
    }

    function dialogOpenChange(open: boolean): void {
      setDialogOpen(open)
      // 如果关闭
      if (!open) {
        setOrderData({} as any)
        setShowDialog(false)
      }
    }

    return (<>
      {
        wxPayList.map((item, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-4 border-b pb-4">
            <Label htmlFor="width">{item.title}</Label>
            {
              item.price === item.payPrice ?
              <Label htmlFor="width">
                <b className="text-2xl">¥{item.payPrice}</b>
              </Label> : 
              <Label htmlFor="width" className="flex flex-col">
                <s className="text-gray-400">¥{item.price}</s>
                <b className="text-2xl">¥{item.payPrice}</b>
              </Label>
            }
            <Button className="w-full" disabled={isButtonDisabled} onClick={() => toPay(item)}>去支付</Button>
          </div>
        ))
      }
      {
        showDialog && (
          <Dialog open={dialogOpen} onOpenChange={(open) => dialogOpenChange(open)}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>请使用微信扫码完成支付</DialogTitle>
                <DialogDescription className="flex flex-col">
                  <img src={orderData.data.QRcode_url} alt="支付二维码" />
                  <p>订单号：{orderData.orderId}</p>
                  <p>交易描述：{orderData.title}</p>
                  <p>
                    交易金额：
                    <b className="text-2xl">¥{orderData.price}</b>
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )
      }
      </>
    )
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 套餐计划</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-2 md:grid-cols-3 lg:grid-cols-3">
        <Card className="mx-auto max-w-sm bg-lightgrey">
          <CardHeader>
            <CardTitle className="text-2xl">Free 套餐</CardTitle>
            <CardDescription>
              无需注册账号，每日 2 次机会免费使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(freePlans) }
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex flex-col">
            <Button className="w-full" onClick={onDownload}>立即下载使用</Button>
            <Button className="w-full mt-4" onClick={onWebStore}>浏览器扩展商店安装</Button>
          </CardFooter>
        </Card>
        <Card className="mx-auto max-w-sm bg-blanchedalmond">
          <CardHeader>
            <CardTitle className="text-2xl">Pay 套餐（微信支付渠道）</CardTitle>
            <CardDescription>
              需要注册账号并付费，每日 <b className="text-zinc-600">无限</b> 次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(wxPlans) }
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full" color="orange">立即购买</Button>
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
        <Card className="mx-auto max-w-sm bg-lightgrey">
          <CardHeader>
            <CardTitle className="text-2xl">Pay 套餐（爱发电渠道）</CardTitle>
            <CardDescription>
              需要注册账号并付费，每日 <b className="text-zinc-600">无限</b> 次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(afdianPayPlans) }
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full" color="orange">立即购买</Button>
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
                    { renderAfdianPay() }
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}