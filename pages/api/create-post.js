export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, text, date } = req.body;

    const BIN_ID = process.env.JSONBIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    if (!BIN_ID || !API_KEY) {
      return res.status(500).json({ error: "API keys missing" });
    }

    // Mevcut veriyi çekiyoruz
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });

    const json = await getRes.json();
    const existing = json.record?.posts || [];

    // Yeni slug üret
    const generatedSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Yeni postu ekle
    const updated = [
      ...existing,
      {
        title,
        text,
        date,
        slug: generatedSlug,
      },
    ];

    // JSONBin'e kaydet
    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ posts: updated }),
    });

    const putData = await putRes.json();

    return res.status(200).json({ success: true, data: putData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
