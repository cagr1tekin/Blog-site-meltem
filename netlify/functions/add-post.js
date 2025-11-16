import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const { title, slug, content } = JSON.parse(event.body);

    const binId = process.env.JSONBIN_ID;
    const apiKey = process.env.JSONBIN_API_KEY;

    // Şu anki JSON'ı çek
    const current = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { "X-Master-Key": apiKey }
    }).then(res => res.json());

    const posts = current.record.posts || [];

    // Yeni post ekle
    posts.push({
      title,
      slug,
      content,
      date: new Date().toISOString()
    });

    // Yeni JSON'ı yaz
    await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify({ posts })
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
