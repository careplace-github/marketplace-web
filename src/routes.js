// ----------------------------------------------------------------------

const Routes = {
  // Marketing
  marketing: {
    landing: '/home',
    services: '/marketing/services',
   // caseStudies: '/marketing/case-studies',
   // caseStudy: (slug) => `/marketing/case-studies/${slug}`,
  //  posts: '/marketing/blog',
   // post: (slug) => `/marketing/blog/${slug}`,
   // about: '/marketing/about-us',
   // contact: '/marketing/contact-us',
  },
  // Travel
  travel: {
    landing: '/travel',
    tours: '/travel/tours',
    tour: (id) => `/travel/tours/${id}`,
    checkout: '/travel/checkout',
    checkoutComplete: '/travel/checkout/complete',
    posts: '/travel/blog',
    post: (slug) => `/travel/blog/${slug}`,
    about: '/travel/about-us',
    contact: '/travel/contact-us',
  },
  // Career
 /* career: {
    landing: '/career',
    jobs: '/career/jobs',
    job: (id) => `/career/jobs/${id}`,
    posts: '/career/blog',
    post: (slug) => `/career/blog/${slug}`,
    about: '/career/about-us',
    contact: '/career/contact-us',
  },*/
  // E-Learning
  eLearning: {
    //landing: '/e-learning',
    courses: '/e-learning/empresas',
    course: (id) => `/e-learning/empresas/${id}`,
    //posts: '/e-learning/blog',
    post: (slug) => `/e-learning/blog/${slug}`,
   // about: '/e-learning/about-us',
    //contact: '/e-learning/contact-us',
  },
  // Common
  loginCover: '/auth/login',
  registerCover: '/auth/register',
  loginIllustration: '/auth/login',
  registerIllustration: '/auth/register',
  resetPassword: '/auth/reset-password',
  verifyCode: '/auth/verify-code',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricing01: '/pricing-01',
  pricing02: '/pricing-02',
  checkout: '/checkout',
  appointment:'/appointment',
  support: '/support',
  page404: '/404',
  page500: '/500',
  profile: '/user-profile',
  // Others
  pages: '/pages',
  
  componentsUI: '/components-ui',
  componentUI: (slug) => `/components-ui/${slug}`,
  muiComponents: 'https://mui.com/components',
  docs: 'https://zone-docs.vercel.app',
  license: '',
  minimalDashboard: '',
  buyNow: '',
  figmaPreview:
    '',
};

export default Routes;
