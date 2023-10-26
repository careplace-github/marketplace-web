// routes
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const footerLinksLoggedOut = [
  {
    order: '1',
    type: 'Main',
    subheader: 'Careplace',
    items: [
      { title: 'Entrar', path: PATHS.auth.login },
      { title: 'Registar', path: PATHS.auth.register },
      { title: 'Ajuda Gratuita', path: PATHS.getHelp },
      { title: 'Torne-se Cuidador', path: PATHS.contactUs },
      {
        title: 'Instituições de Saúde',
        path: (process.env.NEXT_PUBLIC_BUSINESS_URL as string) || '/',
      },
      { title: 'Suporte', path: PATHS.support },
    ],
  },
  {
    order: '2',
    type: 'Main',
    subheader: 'Encontrar',
    items: [
      { title: 'Apoio Domiciliário', path: PATHS.search.homeCare.companies.root },
      { title: 'Lares de Idosos', path: PATHS.search.nursingHome.companies.root },
      { title: 'Residências Sénior', path: PATHS.search.seniorResidence.companies.root },
      { title: 'Centros de Dia', path: PATHS.search.dayCenter.companies.root },
      { title: 'Equipamentos Médicos', path: PATHS.getHelp },
      { title: 'Serviços', path: PATHS.services.root },
    ],
  },
];

export const footerLinksLoggedIn = [
  {
    order: '1',
    type: 'Main',
    subheader: 'Careplace',
    items: [
      { title: 'Ajuda Gratuita', path: PATHS.getHelp },

      { title: 'Torne-se Cuidador', path: PATHS.contactUs },
      {
        title: 'Instituições de Saúde',
        path: (process.env.NEXT_PUBLIC_BUSINESS_URL as string) || '/',
      },
      { title: 'Suporte', path: PATHS.support },
    ],
  },
  {
    order: '2',
    type: 'Main',
    subheader: 'Encontrar',
    items: [
      { title: 'Apoio Domiciliário', path: PATHS.search.homeCare.companies.root },
      { title: 'Lares de Idosos', path: PATHS.search.nursingHome.companies.root },
      { title: 'Residências Sénior', path: PATHS.search.seniorResidence.companies.root },
      { title: 'Centros de Dia', path: PATHS.search.dayCenter.companies.root },
      { title: 'Equipamentos Médicos', path: PATHS.getHelp },
      { title: 'Serviços', path: PATHS.services.root },
    ],
  },
];

export const navLinks = [
  {
    order: '1',
    type: 'Main',
    subheader: 'Marketplace',
    cover: '/assets/images/menu/careplace_marketplace.png',
    items: [
      { title: 'Cuidadores Domiciliários', path: PATHS.search.homeCare.companies.root },
      { title: 'Equipamentos Médicos', path: PATHS.comingsoon },
      { title: 'Lares', path: PATHS.comingsoon },
      { title: 'Residências Sénior', path: PATHS.comingsoon },
      { title: 'Registar como Cuidador', path: PATHS.comingsoon },
    ],
  },

  {
    order: '2',
    type: 'Main',
    subheader: 'Careplace Business',
    cover: '/assets/images/menu/careplace_sales.png',
    items: [
      { title: 'Funcionamento', path: PATHS.comingsoon as string },
      { title: 'Preçário', path: PATHS.comingsoon },
      { title: 'Apoio Domiciliário', path: PATHS.comingsoon },
      { title: 'Lares', path: PATHS.comingsoon },
      { title: 'Residências Sénior', path: PATHS.comingsoon },
    ],
  },

  {
    order: '3',
    type: 'Common',
    subheader: 'Careplace',
    items: [
      { title: 'Entrar', path: PATHS.auth.login },
      { title: 'Registar', path: PATHS.auth.register },
      { title: 'Suporte', path: PATHS.support },
    ],
  },
];

export const navConfig = [
  {
    title: 'Encontrar Cuidador',
    path: PATHS.search.homeCare.companies.root,
  },
  { title: 'Serviços', path: PATHS.services.root },
  {
    title: 'Produtos',
    children: [navLinks[0], navLinks[1], navLinks[2]],
  },
];

export const navConfigMobile = [
  // { title: 'Serviços', path: PATHS.services.root, icon: "material-symbols:medical-services-outline-rounded" },
  {
    title: 'Conta',
    id: 'account',
    path: PATHS.account.personal,
    isOpener: true,
    subItems: [
      {
        title: 'Dados Pessoais',
        path: PATHS.account.personal,
      },
      {
        title: 'Familiares',
        path: PATHS.account.relatives,
      },
      {
        title: 'Pedidos',
        path: PATHS.account.orders,
      },
      {
        title: 'Pagamentos',
        path: PATHS.account.payments,
      },
      {
        title: 'Definições',
        path: PATHS.account.settings,
      },
    ],
    icon: 'material-symbols:account-circle',
  },

  {
    title: 'Apoio Domiciliário',
    id: 'homeCare',
    path: PATHS.search.homeCare.companies.root,
    icon: 'fa6-solid:user-nurse',
  },
  {
    title: 'Lares de Idosos',
    id: 'nursingHome',
    path: PATHS.search.nursingHome.companies.root,
    icon: 'solar:home-bold',
  },
  {
    title: 'Residências Sénior',
    id: 'seniorResidence',
    path: PATHS.search.seniorResidence.companies.root,
    icon: 'mdi:home-city',
  },
  {
    title: 'Centros de Dia',
    id: 'dayCenter',
    path: PATHS.search.dayCenter.companies.root,
    icon: 'fontisto:day-sunny',
  },
  {
    title: 'Equipamentos Médicos',
    id: 'medicalEquipments',
    path: PATHS.getHelp,
    icon: 'el:wheelchair',
  },
  {
    title: 'Serviços',
    id: 'services',
    path: PATHS.services.root,
    icon: 'material-symbols:medical-services-outline-rounded',
  },
];
