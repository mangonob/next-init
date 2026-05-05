import { Suspense } from 'react'

import PostItem from './children/PostItem'
import { PostListSchema } from './model'

export default function PostListPage() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostList />
    </Suspense>
  )
}

async function PostList() {
  console.info('Rerendering PostList')

  const blogResp = await fetch('https://api.vercel.app/blog')
  const posts = PostListSchema.parse(await blogResp.json())

  return (
    <ul className="space-y-2">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  )
}
