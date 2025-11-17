import { useState, useEffect } from "react";

// SHA256 HASH
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ŞİFRE = meltemkalpyigit
const PASSWORD_HASH =
  "8a391204bf16947eeca7dbc47dfec7965899758e951156f4f494c62390887198";

export default function SecretAdmin() {
  const [inputPass, setInputPass] = useState("");
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const [posts, setPosts] = useState([]); // ← TÜM YAZILAR BURAYA GELECEK

  // LOCALSTORAGE GİRİŞ KONTROL
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") setIsLoggedIn(true);

    if (auth === "true") fetchPosts(); // giriş yaptıysa yazıları çek
  }, []);

  // GİRİŞ KONTROL
  async function handleLogin(e) {
    e.preventDefault();
    const hashed = await sha256(inputPass);

    if (hashed === PASSWORD_HASH) {
      localStorage.setItem("admin_auth", "true");
      setIsLoggedIn(true);
      fetchPosts();
    } else {
      setError(true);
    }
  }

  // JSONBIN’den yazıları çek
async function fetchPosts() {
  try {
    const res = await fetch("/api/get-post");
    const data = await res.json();
    setPosts(data.posts || []);
  } catch (err) {
    console.log("fetch error", err);
    setPosts([]);
  }
}


  // POST OLUŞTUR
  async function createPost() {
    const res = await fetch("/api/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        text,
        date: new Date().toISOString().split("T")[0],
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Yazı kaydedildi 💗");
      setTitle("");
      setText("");
      fetchPosts(); // yeniden yükle
    }
  }

  // POST SİL
  async function deletePost(slug) {
    if (!confirm("Bu yazıyı silmek istediğine emin misin?")) return;

    const res = await fetch("/api/delete-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    const data = await res.json();

    if (data.ok) {
      alert("Yazı silindi 🌸");
      fetchPosts();
    } else {
      alert("Silme hatası!");
    }
  }

  // -----------------------------------------------------
  //                 LOGIN SAYFASI
  // -----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div
        style={{
          background: "#ffe6f2",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            width: "300px",
            textAlign: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Admin Girişi 🔐</h3>

          <input
            type="password"
            placeholder="Şifre"
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              borderRadius: "8px",
              border: "1px solid #ff8cba",
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "15px",
              width: "100%",
              background: "#ff4f9a",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Giriş Yap
          </button>

          {error && <p style={{ marginTop: "10px", color: "red" }}>Şifre yanlış 💔</p>}
        </form>
      </div>
    );
  }

  // -----------------------------------------------------
  //               ADMIN PANELİ
  // -----------------------------------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Paneli 🌸</h2>

      {/* YAZI EKLEME */}
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "8px",
          border: "1px solid #ff8cba",
        }}
      />

      <textarea
        placeholder="Yazı"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          height: "200px",
          borderRadius: "8px",
          border: "1px solid #ff8cba",
        }}
      />

      <button
        onClick={createPost}
        style={{
          marginTop: "15px",
          background: "#ff4f9a",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Yazıyı Kaydet
      </button>

      {/* TÜM YAZILAR */}
      <h3 style={{ marginTop: "40px" }}>Yazılar</h3>

      {posts.map((p, i) => (
        <div
          key={i}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "15px",
            border: "1px solid #ffd1e8",
          }}
        >
          <b>{p.title}</b> — <small>{p.slug}</small>

          <button
            onClick={() => deletePost(p.slug)}
            style={{
              float: "right",
              background: "#ff5c8a",
              color: "white",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}
