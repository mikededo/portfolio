import matter from 'gray-matter';
import * as v from 'valibot';
import { dev } from '$app/environment';
const getBaseUrl = () => dev ? 'http://localhost:5173' : 'https://mikededo.com';
export const blogPosts = import.meta.glob('/blog/*.mdx', {
  eager: true,
  import: 'default',
  query: '?raw'
});
export const PostMetaSchema = v.object({
  date: v.pipe(
    v.string(),
    v.transform((i) => new Date(i)),
    v.date()
  ),
  description: v.pipe(v.string(), v.trim()),
  id: v.pipe(v.string(), v.trim()),
  tags: v.pipe(
    v.optional(v.string(), ''),
    v.transform((v) => v.split(',').map((v) => v.trim())),
    v.array(v.string())
  ),
  title: v.pipe(v.string(), v.trim())
});
export type PostMeta = {
  relativeURL: string;
  canonicalURL: string;
} & v.InferOutput<typeof PostMetaSchema>;

export const getPostsMetadata = () => {
  const posts = Object.entries(blogPosts)
    .reduce((agg: PostMeta[], [filePath, rawContent]) => {
      const parsed = v.safeParse(v.string(), rawContent);
      if (!parsed.success) {
        return agg;
      }

      const { data } = matter(parsed.output);
      const id = filePath
        .split('/')
        .pop()
        ?.replace(/\.mdx$/, '') as string;

      const post = v.parse(PostMetaSchema, { id, ...data });

      return [
        ...agg,
        {
          ...post,
          canonicalURL: new URL(`/blog/${post.id}`, getBaseUrl()).toString(),
          relativeURL: `/blog/${post.id}`
        }
      ];
    }, [])
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return posts;
};

