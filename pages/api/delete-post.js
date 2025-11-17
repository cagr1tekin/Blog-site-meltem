export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  try {
    const BIN_ID = process.env.JSONBIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    const { slug } = req.body;

    // Mevcut veriyi çek
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });

    const data = await response.json();
    let posts = data.record?.posts || [];

    // Slug eşleşeni kaldır
    posts = posts.filter(p => p.slug !== slug);

    // Geri JSONBIN'e kaydet
    const updateRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posts }),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false });
  }
}
