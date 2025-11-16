import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  async function savePost() {
    const md = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${content}
`;

    const res = await fetch("/.netlify/functions/create-post", {
      method: "POST",
      body: JSON.stringify({ slug, md }),
    });

    const data = await res.json();
    console.log(data);

    alert("Gönderildi! Netlify build ediyor…");
  }

  return (
    <div style={{ padding: "40px", maxWidth: 600, margin: "0 auto" }}>
      <h1>Yeni Yazı Oluştur</h1>

      <input
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <br /><br />

      <input
        placeholder="slug (ör: ilk-yazi)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <br /><br />

      <textarea
        placeholder="Yazı içeriği..."
        rows={12}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <br /><br />

      <button
        onClick={savePost}
        style={{
          background: "black",
          color: "white",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: 8,
        }}
      >
        Kaydet
      </button>
    </div>
  );
}
