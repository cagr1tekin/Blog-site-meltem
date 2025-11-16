import Layout from "../components/Layout"

export default function About() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Hakkımda</h1>

        <p className="text-gray-700 leading-relaxed">
          Buraya arkadaşının hakkında tatlı bir yazı gelecek. 💖  
          İstersek bunu ileride admin panelden düzenlenebilir yaparız.
        </p>
      </div>
    </Layout>
  )
}
