import React from "react";
import FileUpload from "./components/FileUpload";
import { FiUpload, FiShield, FiZap } from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Share files with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)]">
              Clipo
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            The simplest way to share your files. Just drag and drop to get a shareable link instantly.
          </p>
        </div>

        <FileUpload />

        <div className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            Why choose Clipo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-50)] mb-4">
                <FiZap className="w-6 h-6 text-[var(--primary-500)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-[var(--text-secondary)]">
                Upload and share your files in seconds, no waiting required.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-50)] mb-4">
                <FiShield className="w-6 h-6 text-[var(--primary-500)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Sharing</h3>
              <p className="text-[var(--text-secondary)]">
                Your files are encrypted and securely stored in the cloud.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary-50)] mb-4">
                <FiUpload className="w-6 h-6 text-[var(--primary-500)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-[var(--text-secondary)]">
                No account needed. Just drag, drop, and share instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 