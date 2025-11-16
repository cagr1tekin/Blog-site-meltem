import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffe5f2, #ffd1e8)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      {/* Profil Kartı */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "40px 30px",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        {/* Fotoğraf */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 160,
            height: 160,
            margin: "0 auto",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(255, 105, 180, 0.25)",
          }}
        >
          <Image
            src="/fotograf.jpeg"
            alt="Meltem"
            width={160}
            height={160}
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* İsim */}
        <h1
          style={{
            marginTop: "20px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#ff4f9a",
          }}
        >
          Merhaba, ben Meltem 🌸
        </h1>

        {/* Alt Başlık */}
        <p
          style={{
            marginTop: "8px",
            fontSize: "15px",
            color: "#666",
          }}
        >
          Dijital dünyaya küçük ama pembe bir dokunuş bırakmaya çalışıyorum 💗
        </p>

        {/* Hakkımda Metni */}
        <p
          style={{
            marginTop: "26px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "#444",
            maxWidth: "620px",
            margin: "26px auto 0",
          }}
        >
          Hayatım boyunca yazmayı, duygularımı aktarmayı, içimdeki dünyayı
          kelimelere dökmeyi hep çok sevdim. Bu blog da tam olarak bunun için
          var. Bazen günlük anlardan, bazen hissettiklerimden, bazen de sadece
          aklımdan geçen küçük şeylerden burada bahsediyorum.
        </p>

        <p
          style={{
            marginTop: "16px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "#444",
            maxWidth: "620px",
            margin: "16px auto 0",
          }}
        >
          Kendimle ilgili daha fazlasını paylaştığım için mutluyum. Eğer buraya
          kadar okuduysan, teşekkür ederim. Umarım bu küçük pembe dünyam sana da
          iyi gelir ✨
        </p>

        {/* Alt Bar */}
        <div
          style={{
            marginTop: "30px",
            height: "1px",
            background: "#ffd1e8",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        {/* İletişim/ikon alanı */}
        <div style={{ marginTop: "25px" }}>
          <p style={{ color: "#888" }}>Bana ulaşmak istersen 💌</p>

          <a
            href="mailto:meltem@example.com"
            style={{
              color: "#ff4f9a",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            meltem@example.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}
