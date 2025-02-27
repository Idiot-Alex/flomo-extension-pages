import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-gray-200 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a 
            href="/privacy" 
            onClick={(e) => {
              e.preventDefault()
              navigate('/privacy')
            }} 
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            隐私政策
          </a>
          <a href="https://txc.qq.com/products/648748" className="text-gray-600 hover:text-gray-900 cursor-pointer">
            问题反馈
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © 2025 Flomo Extension. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
