import { useState, useEffect, useCallback, memo } from 'react'
import { Header } from "./Header"
import { Footer } from "./Footer"
import { remark } from 'remark'
import remarkHtml from 'remark-html'
interface Post {
  slug: string
  title: string
  date: string
  category: string
  coverImage: string
  content: string
  excerpt: string
}

function getCategoryColor(category: string) {
  switch (category) {
    case '更新':
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
      const response = await fetch('/posts/index.json')
      const postList = await response.json()
      
      const postsData = await Promise.all(
        postList.map(async (post: { slug: string }) => {
          const mdResponse = await fetch(`/posts/${post.slug}.md`)
          const mdText = await mdResponse.text()
          
          const frontmatterMatch = mdText.match(/^---\n([\s\S]*?)\n---\n/)
          const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
          const content = frontmatterMatch ? mdText.slice(frontmatterMatch[0].length) : mdText
          
          const data = frontmatter.split('\n').reduce((acc, line) => {
            const [key, ...values] = line.split(':')
            if (key && values.length) {
              acc[key.trim()] = values.join(':').trim()
            }
            return acc
          }, {} as Record<string, string>)
          
          const processedContent = await remark()
            .use(remarkHtml)
            .process(content)
          const contentHtml = processedContent.toString()
          
          return {
            slug: post.slug,
            title: data.title,
            date: new Date(data.date).toLocaleDateString('zh-CN'),
            category: data.category,
            coverImage: data.coverImage,
            content: contentHtml,
            excerpt: contentHtml.split('\n').slice(0, 4).join('\n') + '...'
          }
        })
      )

      setState(prev => ({
        ...prev,
        posts: postsData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()),
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

const getRandomBgColor = () => {
  const colors = [
    'bg-blue-100',
    'bg-green-100', 
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const PostItem = memo(function PostItem({
  post,
  onClick,
  setSelectedPost
}: {
  post: Post
  onClick: () => void
  setSelectedPost: (post: Post) => void
}) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3]">
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          <span className={`${getCategoryColor(post.category)} text-sm font-medium px-3 py-1 rounded-full`}>
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        <div className={`h-full ${post.coverImage ? 'bg-gray-100' : getRandomBgColor()} overflow-hidden`}>
          {post.coverImage && (
            <img 
              src={`${post.coverImage}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
        <div 
          className="text-gray-600 leading-relaxed line-clamp-3 prose flex-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedPost(post)
          }}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center self-start"
        >
          阅读更多
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
})

const PostModal = memo(function PostModal({
  post,
  onClose
}: {
  post: Post
  onClose: () => void
}) {
  useEffect(() => {
    // 禁用滚动
    document.body.style.overflow = 'hidden'
    return () => {
      // 恢复滚动
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold
                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h3:text-xl
                prose-p:text-gray-700
                prose-a:text-blue-600 hover:prose-a:text-blue-800
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4
                prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-img:rounded-lg
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:marker:text-gray-500
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-gray-100 prose-th:p-2
                prose-td:border prose-td:p-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export function Posts() {
  const { posts, selectedPost, loading, error, setSelectedPost } = usePosts()


  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">最新动态</h1>
          
          {loading && <div className="text-center py-8">加载中...</div>}
          {error && <div className="text-red-500 text-center py-8">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostItem
                key={post.slug}
                post={post}
                onClick={() => setSelectedPost(post)}
                setSelectedPost={setSelectedPost}
              />
            ))}
          </div>

          {selectedPost && (
            <PostModal
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
