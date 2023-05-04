/** @type {import("next").NextConfig} */

module.exports = {
  swcMinify: false,
  trailingSlash: false,
  reactStrictMode: true, // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  images: {
    domains: ['images.unsplash.com'], // https://nextjs.org/docs/basic-features/image-optimization#domains
  },
  async redirects() {
    // https://nextjs.org/docs/api-reference/next.config.js/redirects
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ];
  },
};
