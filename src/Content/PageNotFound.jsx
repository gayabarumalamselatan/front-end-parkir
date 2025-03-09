import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-800">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
    <p className="mb-6 text-gray-600">Halaman sing panjenengan goleki ora ditemokake.</p>
    <Link
      to="/"
      className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      Bali menyang Beranda
    </Link>
  </div>
  )
}

export default PageNotFound