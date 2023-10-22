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
};
