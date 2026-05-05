import { cookies } from 'next/headers'
import { Link } from 'react-transition-progress/next'

export default async function PostPage({
  params,
}: PageProps<'/post/[postId]'>) {
  const { postId } = await params
  const _cookies = await cookies()

  console.info(`Rerender post ${postId} page`)

  return (
    <div>
      <h1>Post ID: {postId}</h1>
      <Link href="/post/hello">To Hello</Link>
      <code>
        <pre>Cookies: {JSON.stringify(_cookies.getAll(), null, 2)}</pre>
      </code>
    </div>
  )
}
