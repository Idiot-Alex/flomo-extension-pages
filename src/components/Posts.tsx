import { memo, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { applyPageMeta } from '@/lib/page-meta'
import { FLOMO_EXTENSION_WEB_URL } from '@/lib/type'

interface Post {
  slug: string
  title: string
  date: string
  updatedDate: string
  displayDate: string
  displayUpdatedDate: string
  category: string
  coverImage: string
  coverWidth: number
  coverHeight: number
  content: string
  excerpt: string
  author: string
  index?: boolean
}

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
}

function getCategoryColor(category: string) {
  return category === '公告'
    ? 'border-primary/30 bg-primary text-primary-foreground'
    : 'border-primary/20 bg-accent text-accent-foreground'
}

function usePosts() {
  const [state, setState] = useState<PostsState>({
    posts: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPosts() {
      try {
        const response = await fetch('/posts/generated.json', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Posts request failed: ${response.status}`)
        }
        const posts = await response.json() as Post[]
        setState({ posts, loading: false, error: null })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        console.error('加载文章失败:', error)
        setState({ posts: [], loading: false, error: '加载文章失败，请稍后重试' })
      }
    }

    fetchPosts()
    return () => controller.abort()
  }, [])

  return state
}

const PostItem = memo(function PostItem({ post }: { post: Post }) {
  const postPath = `/posts/${post.slug}`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/35">
      <Link to={postPath} className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label={`阅读《${post.title}》`}>
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <span className={`${getCategoryColor(post.category)} rounded-full border px-3 py-1 text-xs font-medium`}>
            {post.category}
          </span>
        </div>
        <div className="aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={post.coverWidth}
              height={post.coverHeight}
            />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-medium tracking-[0.12em] text-muted-foreground">
          <time dateTime={post.date}>{post.displayDate}</time>
          {post.updatedDate !== post.date && <> · 更新于 <time dateTime={post.updatedDate}>{post.displayUpdatedDate}</time></>}
        </p>
        <h2 className="mb-3 font-editorial text-2xl font-medium leading-snug text-foreground">
          <Link to={postPath} className="text-foreground transition-colors hover:text-primary">{post.title}</Link>
        </h2>
        <p className="line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
        <Link
          to={postPath}
          className="mt-5 flex items-center self-start rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          阅读完整文章
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
})

function PostsIndex({ posts }: { posts: Post[] }) {
  return (
    <div className="kami-page py-16 sm:py-20">
      <header className="mb-12 border-b border-border pb-10">
        <p className="kami-eyebrow">更新与思考</p>
        <h1 className="kami-page-title mt-4">文章与使用指南</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">提供经过源码核验的产品文档与有明确来源的功能比较，说明使用步骤、数据边界和故障排查方法。</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => <PostItem key={post.slug} post={post} />)}
      </div>
    </div>
  )
}

function PostDetail({ post, relatedPosts }: { post: Post; relatedPosts: Post[] }) {
  return (
    <div className="kami-page py-12 sm:py-16">
      <nav aria-label="面包屑" className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="shrink-0 hover:text-primary">首页</Link>
        <span className="shrink-0" aria-hidden="true">/</span>
        <Link to="/posts" className="shrink-0 hover:text-primary">文章</Link>
        <span className="shrink-0" aria-hidden="true">/</span>
        <span className="min-w-0 truncate text-foreground" aria-current="page">{post.title}</span>
      </nav>

      <article className="mx-auto max-w-3xl">
        <header className="border-b border-border pb-10 sm:pb-12">
          <p className="kami-eyebrow">{post.category}</p>
          <h1 className="kami-page-title mt-4">{post.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>作者：{post.author}</span>
            <span>发布于 <time dateTime={post.date}>{post.displayDate}</time></span>
            {post.updatedDate !== post.date && <span>更新于 <time dateTime={post.updatedDate}>{post.displayUpdatedDate}</time></span>}
          </div>
        </header>

        {post.coverImage && (
          <figure className="my-10 overflow-hidden rounded-xl border border-border bg-card shadow-whisper">
            <img
              src={post.coverImage}
              alt={`${post.title}配图`}
              className="h-auto w-full"
              width={post.coverWidth}
              height={post.coverHeight}
              decoding="async"
            />
          </figure>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:font-editorial prose-headings:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 border-t border-border pt-8 text-sm leading-7 text-muted-foreground">
          <p>本文由 Flomo Extension 独立整理。第三方产品名称和商标归各自权利人所有；功能与权益请以对应官方页面为准。</p>
        </footer>
      </article>

      {relatedPosts.length > 0 && (
        <aside className="mx-auto mt-16 max-w-3xl border-t border-border pt-10" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title" className="font-editorial text-2xl font-medium">继续阅读</h2>
          <ul className="mt-5 space-y-3">
            {relatedPosts.map((item) => (
              <li key={item.slug}>
                <Link to={`/posts/${item.slug}`} className="text-base text-primary underline-offset-4 hover:underline">{item.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

function PostNotFound() {
  return (
    <div className="kami-page py-20 text-center">
      <p className="kami-eyebrow">404 · 文章不存在</p>
      <h1 className="kami-page-title mt-4">没有找到这篇文章</h1>
      <p className="mt-5 text-muted-foreground">链接可能已经失效，或文章地址输入有误。</p>
      <Link to="/posts" className="mt-8 inline-flex text-primary underline underline-offset-4">返回文章列表</Link>
    </div>
  )
}

export function Posts() {
  const { posts, loading, error } = usePosts()
  const { slug } = useParams()
  const selectedPost = slug ? posts.find((post) => post.slug === slug) : null
  const indexablePosts = posts.filter((post) => post.index !== false)

  useEffect(() => {
    if (!slug || loading) {
      return
    }

    if (!selectedPost) {
      applyPageMeta({
        title: '文章未找到 - Flomo Extension',
        description: '你访问的文章不存在。',
        index: false,
      }, `/posts/${slug}`)
      return
    }

    const articleUrl = `${FLOMO_EXTENSION_WEB_URL}/posts/${selectedPost.slug}`
    const imageUrl = new URL(selectedPost.coverImage, FLOMO_EXTENSION_WEB_URL).toString()
    applyPageMeta({
      title: `${selectedPost.title} - Flomo Extension`,
      description: selectedPost.excerpt,
      index: selectedPost.index !== false,
      image: selectedPost.coverImage,
      type: 'article',
      publishedTime: selectedPost.date,
      modifiedTime: selectedPost.updatedDate,
      structuredData: selectedPost.index !== false ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: selectedPost.title,
        description: selectedPost.excerpt,
        image: imageUrl,
        datePublished: selectedPost.date,
        dateModified: selectedPost.updatedDate,
        author: {
          '@type': 'Organization',
          name: selectedPost.author,
          url: `${FLOMO_EXTENSION_WEB_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Flomo Extension',
          url: FLOMO_EXTENSION_WEB_URL,
        },
        mainEntityOfPage: articleUrl,
        inLanguage: 'zh-CN',
      } : undefined,
    }, `/posts/${selectedPost.slug}`)
  }, [loading, selectedPost, slug])

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-8rem)] bg-background">
        {loading && <div className="kami-page py-20 text-sm text-muted-foreground" aria-live="polite">正在整理文章…</div>}
        {error && <div className="kami-page py-20 text-sm text-destructive" role="alert">{error}</div>}
        {!loading && !error && !slug && <PostsIndex posts={indexablePosts} />}
        {!loading && !error && slug && selectedPost && (
          <PostDetail post={selectedPost} relatedPosts={indexablePosts.filter((post) => post.slug !== slug).slice(0, 2)} />
        )}
        {!loading && !error && slug && !selectedPost && <PostNotFound />}
      </main>
      <Footer />
    </>
  )
}
