import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h2 className="text-4xl font-bold mb-4">Not Found</h2>
            <p className="mb-4">Could not find requested resource</p>
            <Link href="/" className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
                Return Home
            </Link>
        </div>
    )
}
