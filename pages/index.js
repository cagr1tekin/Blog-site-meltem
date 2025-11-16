import Layout from "../components/Layout"
import Link from "next/link"
import { getAllPosts } from "../lib/posts"

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-pink-500">🌸 Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold text-pink-500 hover:underline">
                {post.title}
              </h2>
            </Link>

            {post.date && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString("tr-TR")}
              </p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return { props: { posts } }
}
