/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      'localhost',
      'api.carterbacon.com',
      'www.carterbacon.com',
      'bbs-api-v1-044032d0438d.herokuapp.com'
    ],
  }
}

module.exports = nextConfig
