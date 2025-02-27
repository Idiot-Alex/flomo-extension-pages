import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const cardVariants = {
  offscreen: {
    y: 20,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
}

const hoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cover bg-center">
      <Header />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            无需会员，任意网页保存 Flomo 笔记
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Flomo Extension - 让你的想法永不丢失，随时随地记录灵感
          </p>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="px-8 py-4 text-lg"
                onClick={() => window.open(FLOMO_EXTENSION_WEB_STORE_URL)}
              >
                立即下载
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/guide')}
              >
                了解更多
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 功能截图 */}
      <div className="bg-white/95 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">功能截图</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <img src="/flomo-extension-shot1.png" alt="功能截图 1" className="rounded-lg shadow-lg w-full" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <img src="/flomo-extension-shot2.png" alt="功能截图 2" className="rounded-lg shadow-lg w-full" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <img src="/flomo-extension-shot3.png" alt="功能截图 3" className="rounded-lg shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/95 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: "无需 Flomo 会员",
                description: "即可在任意网页保存笔记",
                icon: "📝"
              },
              {
                title: "多端同步",
                description: "与 Flomo 无缝集成，数据实时同步",
                icon: "🔄"
              },
              {
                title: "智能分类",
                description: "自动标签分类，轻松管理笔记",
                icon: "🏷️"
              },
              {
                title: "快速记录",
                description: "一键保存网页内容，快速记录灵感",
                icon: "⚡"
              },
              {
                title: "安全可靠",
                description: "数据加密存储，保障隐私安全",
                icon: "🔒"
              },
              {
                title: "跨平台支持",
                description: "支持 Chrome、Edge 等主流浏览器",
                icon: "🌐"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div whileHover="hover" variants={hoverVariants}>
                  <Card className="p-8 h-full flex flex-col">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 flex-1">{feature.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 用户评价 Section */}
      <div className="bg-white/95 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">用户评价</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "张*",
                comment: "这个扩展极大地提高了我的工作效率，强烈推荐！",
                rating: 5
              },
              {
                name: "李**",
                comment: "界面简洁易用，与Flomo完美集成，非常满意。",
                rating: 5
              },
              {
                name: "王*",
                comment: "跨平台支持做得很好，在多个设备上都能无缝使用。",
                rating: 4
              }
            ].map((review, index) => (
              <motion.div
                key={review.name}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div whileHover="hover" variants={hoverVariants}>
                  <Card className="p-8 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 text-xl">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                      <div className="ml-2 font-semibold">{review.name}</div>
                    </div>
                    <p className="text-gray-600 flex-1">{review.comment}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative z-10 bg-cover bg-center" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">立即开始使用</h2>
          <p className="text-xl text-gray-600 mb-8">
            加入数千名用户，提升你的生产力
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="px-12 py-6 text-xl"
              onClick={() => navigate('/guide')}
            >
              免费试用
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
