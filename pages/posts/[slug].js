import { getAllPosts, getPostBySlug } from "../../lib/posts"
import Link from "next/link"
import Layout from "../../components/Layout"
import { marked } from "marked"

export default function PostPage({ post }) {
  const html = marked(post.content || "")

  return (
    <Layout>
      <article className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-pink-500 mb-2">{post.title}</h1>

        {post.date && (
          <p className="text-sm text-gray-500 mb-6">
            {new Date(post.date).toLocaleDateString("tr-TR")}
          </p>
        )}

        <div
          className="prose prose-pink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Link
          href="/"
          className="block mt-6 text-pink-500 hover:underline"
        >
          ← Bloga geri dön
        </Link>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return { props: { post: getPostBySlug(params.slug) } }
}
