export default function BlogCard({ title, text, date, slug }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "28px",
        borderLeft: "5px solid #ff4fa8",
      }}
    >
      <h2 style={{ marginBottom: 6, color: "#ff4fa8" }}>{title}</h2>

      <div style={{ color: "#777", marginBottom: 10, fontSize: "14px" }}>
        {new Date(date).toLocaleDateString("tr-TR")}
      </div>

      <p
        className="clamp-text"
        style={{
          marginBottom: 12,
          color: "#444",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {text}
      </p>

      <a
        href={`/posts/${slug}`}
        style={{
          color: "#ff4fa8",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        → Devamını Oku
      </a>
    </div>
  );
}
