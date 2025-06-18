import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Clipo</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Simple and secure file sharing. Just drag and drop your file to get a shareable link instantly.
          </p>
        </div>
        <FileUpload />
      </div>
    </main>
  );
}
