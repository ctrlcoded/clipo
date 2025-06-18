import Link from 'next/link';
import { FiUpload, FiUser } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Clipo</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FiUpload className="mr-2" />
              Upload
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-primary-200 text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FiUser className="mr-2" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 