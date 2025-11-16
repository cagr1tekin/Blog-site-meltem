export default function PostPage({ post }) {
  if (!post) return <div>Yazı bulunamadı</div>;

  return (
    <>
      <main
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#ff4f9a" }}>{post.title}</h1>

        <div style={{ color: "#666", marginBottom: 20 }}>{post.date}</div>

        <div className="post-detail-text">{post.text}</div>

        <div style={{ marginTop: 20 }}>
          <a href="/" style={{ color: "#ff4f9a" }}>← Bloga dön</a>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const BIN_ID = process.env.JSONBIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });

  const data = await res.json();
  const posts = data.record?.posts || [];

  return {
    paths: posts.map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const BIN_ID = process.env.JSONBIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });

  const data = await res.json();
  const posts = data.record?.posts || [];

  const post = posts.find((p) => p.slug === params.slug);

  return {
    props: { post },
  };
}
