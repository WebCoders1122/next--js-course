/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/webcoders1122/mdx-blogposts/main/images/**",
      },
    ],
  },
};

export default nextConfig;
