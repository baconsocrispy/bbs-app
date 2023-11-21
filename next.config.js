/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      'localhost',
      'api.brothers-sonsamerica.com',
      'www.brothers-sonsamerica.com',
      'bbs-api-v1-044032d0438d.herokuapp.com'
    ],
  }
}

module.exports = nextConfig
