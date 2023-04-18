// routes
import { PATHS } from 'src/routes/paths';




// ----------------------------------------------------------------------



export const footerLinks = [
  {
    order: '1',
    type: 'Main',
    subheader: 'Careplace',
    items: [
      { title: 'Entrar', path: '/' },
      { title: 'Registar', path: '/' },
      { title: 'Suporte', path: '/' },
      { title: 'Equipa', path: '/' },
      { title: 'Perguntas Frequentes', path: '/' },
    ],
  },
  {
    order: '2',
    type: 'Main',
    subheader: 'Para Quem',
    items: [
      { title: 'Cuidadores', path: PATHS.caregivers },
      { title: 'Empresas SAD', path: PATHS.healthUnits },
      { title: 'Lares', path: PATHS.healthUnits },
      { title: 'Residências Sénior', path: PATHS.healthUnits },
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
      { title: 'Cuidadores Domiciliários', path: PATHS.companies.root },
      { title: 'Equipamentos Médicos', path: PATHS.comingsoon },
      { title: 'Lares', path: PATHS.comingsoon },
      { title: 'Residências Sénior', path: PATHS.comingsoon },
      { title: 'Registar como Cuidador', path: PATHS.comingsoon },
    ],
  },

  {
    order: '2',
    type: 'Main',
    subheader: 'Careplace Sales',
    cover: '/assets/images/menu/careplace_sales.png',
    items: [
      { title: 'Funcionamento', path: PATHS.comingsoon },
      { title: 'Preçário', path: PATHS.comingsoon },
      { title: 'Empresas SAD', path: PATHS.comingsoon },
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
      { title: 'Suporte', path: PATHS.comingsoon },
    ],
  },
];

export const navConfig = [
  {
    title: 'Encontrar Cuidador', path: PATHS.companies.root
  },
  { title: 'Serviços', path: PATHS.services.root },
  {
    title: 'Produtos',
    children: [navLinks[0], navLinks[1], navLinks[2]],
  },
];

export const navConfigMobile = [
  {
    title: 'Encontrar Cuidador', path: PATHS.companies.root, icon: "fa6-solid:user-nurse"
  },
  { title: 'Serviços', path: PATHS.services.root, icon: "material-symbols:medical-services-outline-rounded" },
  {
    title: 'Dados Pessoais',
    path: PATHS.account.personal,
    icon: "material-symbols:account-circle"
  },
  {
    title: 'Pedidos',
    path: PATHS.account.orders,
    icon: "material-symbols:reorder-rounded"
  },
  {
    title: 'Familiares',
    path: PATHS.account.relatives,
    icon: "material-symbols:family-restroom-rounded"
  },
  {
    title: 'Informações de Pagamento',
    path: PATHS.account.payment,
    icon: "ic:round-payment"
  },
  {
    title: 'Definições',
    path: PATHS.account.settings,
    icon: "material-symbols:settings-outline-rounded"
  },

  {
    title: 'Produtos',
    icon: "nimbus:ecosystem",
    children: [navLinks[0], navLinks[1], navLinks[2]],
  },
];
