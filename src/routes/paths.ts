// ----------------------------------------------------------------------

export const PATHS = {
  // Home
  home: `/`,

  // Info
  caregivers: `/cuidadores`,

  // Services
  services: {
    root: `/servicos`,
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
    root: `/conta`,
    personal: `/conta/pessoal`,
    relatives: `/conta/familiares`,
    orders: `/conta/pedidos`,
    payments: `/conta/pagamentos`,
    settings: `/conta/definicoes`,
  },

  // Order
  orders: {
    view: (id: string) => `/pedidos/${id}`,
    edit: (id: string) => `/pedidos/${id}/edit`,
    checkout: (id: string) => `/pedidos/${id}/checkout`,
    checkoutSucess: (id: string) => `/pedidos/${id}/checkout/sucesso`,
    questionnaire: (query?: string) => `/pedidos/questionario${query || ''}`,
    questionnaireCompleted: (id: string) => `/pedidos/questionario/completo/${id}`,
  },

  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/registo',
    resetPassword: '/auth/redifinir-palavra-passe',
    forgotPassword: '/auth/recuperar-palavra-passe',
    verifyCode: '/auth/confirmar-conta',
    verifyEmail: '/auth/confirmar-email',
    verifyPhone: '/auth/confirmar-telemovel',
  },

  // Common
  afterLogin: '/pesquisar/apoio-domiciliario',
  maintenance: '/manuntencao',
  comingsoon: '/brevemente',
  support: '/suporte',
  getHelp: '/ajuda-gratuita',
  page404: '/404',
  page500: '/500',
  privacyPolicy: '/politica-de-privacidade',
  termsAndConditions: '/termos-e-condicoes',
  contactUs: '/cuidadores',
};
