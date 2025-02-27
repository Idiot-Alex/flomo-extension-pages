import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BookOpen, Shield, AlertCircle, Settings, Edit } from 'lucide-react'

const sections = [
  { 
    id: 'service-description', 
    title: '服务说明',
    icon: <BookOpen className="w-6 h-6" />,
    content: [
      'Flomo Extension 是一个浏览器扩展程序，旨在帮助用户更方便地在浏览器上记录 flomo 笔记。',
      '本服务由第三方开发者提供，与 flomo 官方无直接关联。'
    ]
  },
  { 
    id: 'user-responsibility', 
    title: '用户责任',
    icon: <Shield className="w-6 h-6" />,
    content: [
      '不得利用本服务进行任何非法活动',
      '不得干扰或破坏本服务的正常运行',
      '对使用本服务产生的后果承担全部责任'
    ]
  },
  { 
    id: 'service-limitations', 
    title: '服务限制',
    icon: <AlertCircle className="w-6 h-6" />,
    content: [
      '免费用户每日有使用次数限制',
      '部分功能可能需要付费使用',
      '服务可能因维护或其他原因暂时中断'
    ]
  },
  { 
    id: 'disclaimer', 
    title: '免责声明',
    icon: <Settings className="w-6 h-6" />,
    content: [
      '本服务按"现状"提供，不提供任何形式的保证',
      '开发者不对因使用本服务造成的任何损失负责',
      '用户应自行承担使用本服务的风险'
    ]
  },
  { 
    id: 'terms-modification', 
    title: '条款修改',
    icon: <Edit className="w-6 h-6" />,
    content: [
      '我们保留随时修改本条款的权利。',
      '修改后的条款将在本页面公布，继续使用本服务即表示您接受修改后的条款。'
    ]
  }
]

export function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              服务条款
            </h1>
            <p className="text-gray-600 mt-4">生效日期：2024年5月4日</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {section.icon}
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16"></div>
        </div>
      </div>
    </div>
  )
}
