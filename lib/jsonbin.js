export async function getPosts() {
  const BIN_ID = process.env.JSONBIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await res.json();

  // Eğer bin daha önce hiç oluşturulmamışsa boş posts dön
  if (!data.record) return [];
  if (!data.record.posts) return [];

  return data.record.posts;
}

export async function createPost(newPost) {
  const BIN_ID = process.env.JSONBIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  // mevcut veriyi çek
  const resGet = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await resGet.json();

  // eğer bin boşsa sıfırdan oluştur
  let current = data.record || {};
  if (!current.posts) current.posts = [];

  current.posts.push(newPost);

  // güncelleme gönder
  const resUpdate = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(current)
  });
  console.log("BIN ID:", BIN_ID);
console.log("API KEY:", API_KEY);
  return await resUpdate.json();
}
