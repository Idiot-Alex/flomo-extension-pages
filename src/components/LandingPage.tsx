import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import { motion } from 'framer-motion'
import { Footer } from '@/components/Footer'

const cardVariants = {
  offscreen: {
    y: 50,
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/landing-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
                onClick={() => navigate('/dashboard')}
              >
                了解更多
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/95 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">无需会员</h3>
                  <p className="text-gray-600">
                    无需 Flomo 会员，即可在任意网页保存笔记
                  </p>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">多端同步</h3>
                  <p className="text-gray-600">
                    与 Flomo 无缝集成，数据实时同步
                  </p>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover="hover" variants={hoverVariants}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">智能分类</h3>
                  <p className="text-gray-600">
                    自动标签分类，轻松管理笔记
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">立即开始使用</h2>
          <p className="text-xl text-gray-600 mb-8">
            加入数千名用户，提升你的生产力
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="px-12 py-6 text-xl"
              onClick={() => navigate('/dashboard')}
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
