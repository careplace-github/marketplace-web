/** @type {import("next").NextConfig} */

const dotenv = require('dotenv');

if (process.env.ENV) {
  // configure dotenv
  dotenv.config({ path: `.env.${process.env.ENV}` });
}

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
        // Only use while home page is under construction
        destination: '/companies',
        permanent: true,
      },
    ];
  },

  env: {
    // https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_MICROSOFT_CLARITY_ID: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID,
  },
};
