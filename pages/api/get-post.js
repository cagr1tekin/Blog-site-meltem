export default async function handler(req, res) {
  try {
    const BIN_ID = process.env.JSONBIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });

    const data = await response.json();

    let posts = data.record?.posts || [];

    posts = posts.filter(p => p.title && p.text && p.slug && p.date);

    posts = posts.reverse();

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ posts: [], error: "Fetch error" });
  }
}
