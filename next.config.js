/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/quant-desk-theses',
  assetPrefix: '/quant-desk-theses',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
