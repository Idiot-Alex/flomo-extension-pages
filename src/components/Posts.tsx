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
  return category === '公告'
    ? 'border-primary/30 bg-primary text-primary-foreground'
    : 'border-primary/20 bg-accent text-accent-foreground'
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

const PostItem = memo(function PostItem({
  post,
  onOpen,
}: {
  post: Post
  onOpen: () => void
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/35">
      <div className="relative">
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <span className={`${getCategoryColor(post.category)} rounded-full border px-3 py-1 text-xs font-medium`}>
            {post.category}
          </span>
        </div>
        <div className="aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-medium tracking-[0.12em] text-muted-foreground">{post.displayDate}</p>
        <h2 className="mb-3 font-editorial text-2xl font-medium leading-snug text-foreground">{post.title}</h2>
        <p className="line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}...</p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-5 flex items-center self-start rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card">
        <DialogTitle className="pr-8 font-editorial text-3xl font-medium text-foreground">{post.title}</DialogTitle>
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
      <main id="main-content" className="min-h-[calc(100vh-8rem)] bg-background">
        <div className="kami-page py-16 sm:py-20">
          <header className="mb-12 border-b border-border pb-10">
            <p className="kami-eyebrow">更新与思考</p>
            <h1 className="mt-4 font-editorial text-4xl font-medium tracking-tight text-foreground sm:text-6xl">最新动态</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">关于产品更新、记录方法与浏览器使用体验。</p>
          </header>
          
          {loading && <div className="border-y border-border py-10 text-sm text-muted-foreground" aria-live="polite">正在整理文章…</div>}
          {error && <div className="border-y border-destructive/30 py-10 text-sm text-destructive" role="alert">{error}</div>}
          {slug && !loading && !selectedPost && (
            <div className="mb-8 rounded-lg border border-border bg-secondary p-4 text-sm text-foreground">
              没有找到这篇文章，请从下方列表选择其他内容。
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
