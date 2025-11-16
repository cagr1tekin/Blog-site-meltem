import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 mb-8">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-pink-500">
          🌸 My Blog
        </Link>

        <div className="space-x-4 text-gray-600">
          <Link href="/about" className="hover:text-pink-500 transition">Hakkımda</Link>
          <Link href="/admin" className="hover:text-pink-500 transition">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
