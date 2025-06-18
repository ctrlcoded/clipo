# Clipo - Simple File Sharing

A minimalistic file sharing application built with Next.js and ImageKit.

## Features

- Drag and drop file uploads
- Instant shareable links
- Simple black and white UI
- File size limit of 10MB
- No account required

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your ImageKit credentials:
```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
IMAGEKIT_PRIVATE_KEY=your_private_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- ImageKit
- React Icons
