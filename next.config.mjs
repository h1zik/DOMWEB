/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Matikan optimizer image di server agar CPU Railway lebih rendah.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
