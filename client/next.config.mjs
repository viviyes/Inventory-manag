/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stockmngt-img.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      // for image url in products (local)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/assets/**",
      },
      // for image url in products (production)
      {
        protocol: "https",
        hostname: "stockmngtapi.vivicoding.com",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
