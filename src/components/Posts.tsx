import { useState, useEffect, useCallback, memo } from 'react'
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { applyPageMeta } from '@/lib/page-meta'

interface Post {
  slug: string
  title: string
  date: string
  displayDate: string
  category: string
  coverImage: string
  content: string
  excerpt: string
}

function getCategoryColor(category: string) {
  switch (category) {
    case '文章':
      return 'bg-blue-100 text-blue-800'
    case '优化':
      return 'bg-green-100 text-green-800'
    case '公告':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  loading: boolean
  error: string | null
}

function usePosts() {
  const [state, setState] = useState<PostsState>({
    posts: [],
    selectedPost: null,
    loading: true,
    error: null
  })

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/posts/generated.json')
      if (!response.ok) {
        throw new Error(`Posts request failed: ${response.status}`)
      }
      const postsData = await response.json() as Post[]

      setState(prev => ({
        ...prev,
        posts: postsData,
        loading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: '加载文章失败，请稍后重试',
        loading: false
      }))
      console.error('加载文章失败:', error)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const setSelectedPost = useCallback((post: Post | null) => {
    setState(prev => ({ ...prev, selectedPost: post }))
  }, [])

  return {
    ...state,
    setSelectedPost
  }
}

const getPostBgColor = (slug: string) => {
  const colors = [
    'bg-blue-100',
    'bg-green-100', 
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100'
  ]
  const colorIndex = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0)
  return colors[colorIndex % colors.length]
}

const PostItem = memo(function PostItem({
  post,
  onOpen,
}: {
  post: Post
  onOpen: () => void
}) {
  return (
    <article
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          <span className={`${getCategoryColor(post.category)} text-sm font-medium px-3 py-1 rounded-full`}>
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.displayDate}</span>
        </div>
        <div className={`flex-1 max-h-[300px] ${post.coverImage ? 'bg-gray-100' : getPostBgColor(post.slug)} overflow-hidden`}>
          {post.coverImage && (
              <img 
              src={`${post.coverImage}`}
              alt={post.title}
              className="w-full h-1/2 object-cover max-w-full"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
        <p className="text-gray-600 leading-relaxed line-clamp-3 flex-1">{post.excerpt}...</p>
        <button
          onClick={onOpen}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label={`阅读《${post.title}》`}
        >
          阅读更多
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  )
})

const PostModal = memo(function PostModal({
  post,
  onClose
}: {
  post: Post
  onClose: () => void
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="pr-8 text-2xl font-bold text-gray-900">{post.title}</DialogTitle>
        <DialogDescription>{post.category} · 发布于 {post.displayDate}</DialogDescription>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </DialogContent>
    </Dialog>
  )
})

export function Posts() {
  const { posts, selectedPost, loading, error, setSelectedPost } = usePosts()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) {
      setSelectedPost(null)
      return
    }

    const post = posts.find((item) => item.slug === slug) || null
    setSelectedPost(post)
    if (post) {
      applyPageMeta({
        title: `${post.title} - Flomo Extension`,
        description: post.excerpt,
      }, `/posts/${post.slug}`)
    }
  }, [posts, setSelectedPost, slug])

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">最新动态</h1>
          
          {loading && <div className="text-center py-8">加载中...</div>}
          {error && <div className="text-red-500 text-center py-8">{error}</div>}
          {slug && !loading && !selectedPost && (
            <div className="mb-8 rounded-lg bg-amber-50 p-4 text-amber-900">
              没有找到这篇文章，请从下方列表选择其他内容。
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostItem
                key={post.slug}
                post={post}
                onOpen={() => navigate(`/posts/${post.slug}`)}
              />
            ))}
          </div>

          {selectedPost && (
            <PostModal
              post={selectedPost}
              onClose={() => navigate('/posts')}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
