import { useState, useEffect } from "react";

// SHA256 hash fonksiyonu
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// DOĞRU HASH (meltemkalpyigit)
const PASSWORD_HASH =
  "8a391204bf16947eeca7dbc47dfec7965899758e951156f4f494c62390887198";

export default function SecretAdmin() {
  // ---- TÜM HOOKLAR HER ZAMAN EN ÜSTE ----
  const [inputPass, setInputPass] = useState("");
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [title, setTitle] = useState(""); // her zaman burada!
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  // LOCALSTORAGE KONTROL
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") setIsLoggedIn(true);
  }, []);

  // GİRİŞ KONTROL
  async function handleLogin(e) {
    e.preventDefault();

    const hashed = await sha256(inputPass);

    if (hashed === PASSWORD_HASH) {
      localStorage.setItem("admin_auth", "true");
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  // POST OLUŞTURMA
async function createPost(title, text) {
  const res = await fetch("/api/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
      date: new Date().toISOString().split("T")[0],
    }),
  });

  return res.json();
}



  // ---- UI ----
  if (!isLoggedIn) {
    return (
      <div
        style={{
          background: "#ffe6f2",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
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
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
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
              border: "1px solid #ff8cba"
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
              cursor: "pointer"
            }}
          >
            Giriş Yap
          </button>

          {error && (
            <p style={{ marginTop: "10px", color: "red" }}>
              Şifre yanlış 💔
            </p>
          )}
        </form>
      </div>
    );
  }

  // ---- ADMIN PANEL ----
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Paneli 🌸</h2>

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
          border: "1px solid #ff8cba"
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
          border: "1px solid #ff8cba"
        }}
      />

      <button
        onClick={() => createPost(title, text)}
        style={{
          marginTop: "15px",
          background: "#ff4f9a",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
      >
        Yazıyı Kaydet
      </button>

      {result && <p style={{ marginTop: "10px" }}>{result}</p>}
    </div>
  );
}
