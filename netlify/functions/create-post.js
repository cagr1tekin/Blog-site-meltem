import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const { slug, md } = JSON.parse(event.body);

    const filePath = `content/posts/${slug}.md`;

    const commitBody = {
      message: `Yeni yazı: ${slug}`,
      content: Buffer.from(md).toString("base64"),
    };

    const githubRes = await fetch(
      "https://api.github.com/repos/cagr1tekin/Blog-site-meltem/contents/" + filePath,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commitBody),
      }
    );

    if (!githubRes.ok) {
      const msg = await githubRes.text();
      console.log("GitHub Error:", msg);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: msg }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
