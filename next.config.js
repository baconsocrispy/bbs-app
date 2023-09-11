/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      'localhost',
      'bbs-api-v1-044032d0438d.herokuapp.com'
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'bbs-api-v1-044032d0438d.herokuapp.com',
    //     port: '',
    //     pathname: '/rails/active_storage/blobs/redirect/**'
    //   }
    // ]
  }
}

module.exports = nextConfig
