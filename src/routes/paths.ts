// ----------------------------------------------------------------------

export const PATHS = {
  // Home
  home: `/`,

  // Info
  caregivers: `/caregivers`,

  // Services
  services: {
    root: `/services`,
  },

  search: {
    homeCare: {
      companies: {
        root: `/pesquisar/apoio-domiciliario`,
        view: (id: string) => `/pesquisar/apoio-domiciliario/${id}`,
      },
    },
    seniorResidence: {
      companies: {
        root: `/pesquisar/residencias-senior`,
      },
    },
    nursingHome: {
      companies: {
        root: `/pesquisar/lares-de-idosos`,
      },
    },
    dayCenter: {
      companies: {
        root: `/pesquisar/centros-de-dia`,
      },
    },
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
    view: (id: string) => `/orders/${id}`,
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
    verifyEmail: '/auth/verify-email',
    verifyPhone: '/auth/verify-phone',
  },

  // Common
  afterLogin: '/companies',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  support: '/support',
  getHelp: '/get-help',
  page404: '/404',
  page500: '/500',
  privacyPolicy: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
  contactUs: '/caregivers',
};
