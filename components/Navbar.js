import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "18px 0",
        background: "#ffd2eb",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Link href="/" style={{ fontWeight: "600", color: "#ff4fa8" }}>
        Blog
      </Link>

      <Link href="/about" style={{ fontWeight: "600", color: "#ff4fa8" }}>
        Hakkımda
      </Link>
    </nav>
  );
}
