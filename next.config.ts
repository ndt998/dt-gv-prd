import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Thêm lại dòng này để chạy chế độ trang tĩnh
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;