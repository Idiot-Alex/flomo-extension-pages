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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 max-w-3xl mx-auto">
            无需会员也能同步笔记，随时记录灵感
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Flomo Extension - 强大的 Flomo 网页插件，无需 Flomo 会员，即可在任意网页保存笔记，并同步到你的 Flomo 账户。
          </p>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" >让你的想法永不丢失，随时随地记录灵感。</p>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="px-8 py-4 text-lg bg-blue-500 text-white hover:bg-blue-700"
                onClick={() => window.open(FLOMO_EXTENSION_WEB_STORE_URL)}
              >
                立即下载
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-blue-500 text-blue-500 hover:bg-blue-50"
                onClick={() => navigate('/guide')}
              >
                了解更多
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 功能截图 */}
      <div className="bg-gray-50 py-10">
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
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: "无需 Flomo 会员",
                description: "无需 Flomo 会员，即可在任意网页保存笔记，随时记录你的想法。",
                icon: "📝"
              },
              {
                title: "多端同步",
                description: "与 Flomo 无缝集成，数据实时同步，在任何设备上都能访问你的笔记。",
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
      <div className="bg-gray-50 py-20">
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
      <div className="py-20 relative z-10 bg-cover bg-center rounded-lg shadow-md" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
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
      {/* 关于 Flomo 插件 Section - Scandinavian Style */}
      <div className="bg-white py-16">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> {/* Added text-center here */}
         <h2 className="text-3xl font-bold mb-8 text-gray-900">关于 Flomo 插件</h2> {/* Removed text-left */}
         <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto"> {/* Removed text-left, added mx-auto */}
           Flomo 插件是一款强大的浏览器扩展，旨在帮助用户随时随地记录和管理灵感。它无需 Flomo 会员，即可在任意网页保存笔记，并同步到你的 Flomo 账户。无论你是在阅读文章、浏览网页还是观看视频，都可以随时记录你的想法和灵感，让你的知识管理更加高效。
         </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
