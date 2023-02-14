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
    DEV_API: 'http://localhost:7777',
    PRODUCTION_API: 'https://www.staging.api.careplace.pt/api/v1',
    GOOGLE_API: '',
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
