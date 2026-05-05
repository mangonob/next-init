'use server'

import { refresh } from 'next/cache'

export async function deletePost(id: number) {
  console.info('Deleting post with id:', id)
  refresh()
}
