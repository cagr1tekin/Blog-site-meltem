import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4">
        {children}
      </main>
    </>
  )
}
