/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'riantavares.s3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ]
  }
}

module.exports = nextConfig