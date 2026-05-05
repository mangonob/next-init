import * as z from 'zod'

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().nullish(),
  content: z.string().nullish(),
  author: z.string().nullish(),
  date: z.string().nullish(),
  category: z.string().nullish(),
})

export const PostListSchema = z.array(PostSchema)

export type Post = z.infer<typeof PostSchema>
