import Link from "next/link"

export function IdentifyButton() {
  return (
    <Link
      href="/identify"
      className="inline-block bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
    >
      Start Identification
    </Link>
  )
}
