/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
};
export default nextConfig;
