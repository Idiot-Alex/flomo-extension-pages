import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-gray-200 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/privacy" className="text-gray-600 hover:text-gray-900">
            隐私政策
          </Link>
          <Link to="/terms" className="text-gray-600 hover:text-gray-900">
            服务条款
          </Link>
          <a href="https://txc.qq.com/products/648748" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noreferrer">
            问题反馈
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Flomo Extension. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
