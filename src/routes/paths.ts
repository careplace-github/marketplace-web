// ----------------------------------------------------------------------

export const PATHS = {
  // Home
  home: `/`,

  // Info
  healthUnits: `/health-units`,
  caregivers: `/caregivers`,

  // Services
  services: {
    root: `/services`,
    view: (id: string) => `/services/${id}`,
  },

  // Companies
  companies: {
    root: `/companies`,
    view: (id: string) => `/companies/${id}`,
  },

  // Account
  account: {
    root: `/account`,
    personal: `/account/personal`,
    relatives: `/account/relatives`,
    orders: `/account/orders`,
    payments: `/account/payments`,
    settings: `/account/settings`,
  },

  // Order
  orders: {
    view: (id: string) => `/orders/${id}/view`,
    edit: (id: string) => `/orders/${id}/edit`,
    checkout: (id: string) => `/orders/${id}/checkout`,
    checkoutSucess: (id: string) => `/orders/${id}/checkout/success`,
    questionnaire: (query: string) => `/orders/questionnaire/${query}`,
    questionnaireCompleted: (id: string) => `/orders/questionnaire/completed/${id}`,
  },

  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    resetPassword: '/auth/reset-password',
    forgotPassword: '/auth/forgot-password',
    verifyCode: '/auth/verify-code',
  },

  // Common
  afterLogin: '/companies',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricing01: '/pricing-01',
  pricing02: '/pricing-02',
  support: '/support',
  page404: '/404',
  page500: '/500',
  privacyPolicy: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
};
