'use client'

import { Button } from '@mui/material'

import { deletePost } from '../actions'
import { type Post } from '../model'

export type PostItemProps = {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li className="flex items-center gap-2">
      <Button className="inline-flex" onClick={() => deletePost(post.id)}>
        -
      </Button>
      {post.title}
    </li>
  )
}
