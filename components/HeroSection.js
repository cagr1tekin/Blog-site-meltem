// components/HeroSection.js
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Meltem’in Dünyasına Hoş Geldin 🌸
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Düşüncelerim, hislerim ve küçük dijital dünyam 💗
      </motion.p>
    </section>
  );
}
