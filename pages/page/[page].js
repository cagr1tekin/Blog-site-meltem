// pages/page/[page].js
import { motion } from "framer-motion";
import BlogCard from "../../components/BlogCard";
import HeroSection from "../../components/HeroSection";
import Link from "next/link";

const PER_PAGE = 15;

export default function PagedBlog({ posts = [], page, totalPages }) {
  return (
    <div className="background-icons">
      {/* HERO – tüm sayfalarda aynı */}
      <HeroSection />

      <div className="page-container">
        <motion.h2
          className="page-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Blog Yazıları – Sayfa {page}
        </motion.h2>

        {posts.length > 0 ? (
          posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <BlogCard
                title={p.title}
                text={p.text}
                date={p.date}
                slug={p.slug}
              />
            </motion.div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>
            Bu sayfada yazı bulunamadı 🌸
          </p>
        )}

        {/* Pagination */}
        <div className="pagination">
          {page > 1 && (
            <Link href={page === 2 ? "/" : `/page/${page - 1}`}>
              ← Önceki
            </Link>
          )}

          <span>
            Sayfa {page} / {totalPages}
          </span>

          {page < totalPages && (
            <Link href={`/page/${page + 1}`}>Sonraki →</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // runtime'da hesaplayacağımız için şu an boş bırakıp blocking yapıyoruz
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10) || 1;

  try {
    const BIN_ID = process.env.JSONBIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });

    const data = await res.json();

    let posts = data.record?.posts || [];
    posts = posts.filter((p) => p.title && p.text && p.slug && p.date);
    posts = posts.reverse();

    const totalPages = Math.ceil(posts.length / PER_PAGE);

    // Geçersiz sayfa → 404
    if (page < 1 || page > totalPages) {
      return { notFound: true };
    }

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const pagePosts = posts.slice(start, end);

    return {
      props: {
        posts: pagePosts,
        page,
        totalPages,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log("JSONBin hata:", err);
    return {
      props: {
        posts: [],
        page,
        totalPages: 1,
      },
      revalidate: 10,
    };
  }
}
