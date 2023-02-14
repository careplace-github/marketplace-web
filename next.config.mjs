// ----------------------------------------------------------------------


const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/marketing',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:8080',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
  },
  images: {
    domains: ['flagcdn.com'],
  },
};


export default nextConfig;
