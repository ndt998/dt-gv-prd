import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Đã xóa dòng output: "export" ở đây */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: [
    'preview-chat-246566f8-3bed-4460-bfab-9c911144657d.space.z.ai',
    '.space.z.ai',
    'localhost',
  ],
};

export default nextConfig;