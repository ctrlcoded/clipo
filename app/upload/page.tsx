"use client";

import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { FiCheck, FiCopy, FiShare2, FiVideo, FiImage } from "react-icons/fi";

export default function UploadPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");

  const handleUploadSuccess = (res: any) => {
    setUploadedUrl(res.url);
  };

  const handleCopy = async () => {
    if (uploadedUrl) {
      await navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share your {activeTab === "video" ? "videos" : "photos"}
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Upload and share your {activeTab === "video" ? "videos" : "photos"} with anyone, anywhere. Fast, secure, and easy to use.
          </p>
          
          {/* Tab switcher */}
          <div className="flex gap-2 mt-8 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab("image")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === "image"
                  ? "bg-white text-primary-500 shadow-sm"
                  : "text-gray-600 hover:text-primary-500"
              }`}
            >
              <FiImage className="w-5 h-5" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === "video"
                  ? "bg-white text-primary-500 shadow-sm"
                  : "text-gray-600 hover:text-primary-500"
              }`}
            >
              <FiVideo className="w-5 h-5" />
              <span>Video</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <FileUpload
              onSuccess={handleUploadSuccess}
              onProgress={setUploadProgress}
              fileType={activeTab}
            />
          </div>

          <div className="space-y-6">
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-2 flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadedUrl && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Ready to share! 🎉
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={uploadedUrl}
                      readOnly
                      className="flex-1 p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleCopy}
                      className="p-3 text-gray-600 hover:text-primary-500 transition-colors"
                      title={copied ? "Copied!" : "Copy link"}
                    >
                      {copied ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        <FiCopy className="w-5 h-5" />
                      )}
                    </button>
                    <a
                      href={uploadedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-600 hover:text-primary-500 transition-colors"
                      title="Open link"
                    >
                      <FiShare2 className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Features section */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Why choose Clipo?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-primary-500" />
                  <span>Fast and secure uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-primary-500" />
                  <span>Share with anyone instantly</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5 text-primary-500" />
                  <span>High-quality {activeTab === "video" ? "video" : "image"} preservation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 