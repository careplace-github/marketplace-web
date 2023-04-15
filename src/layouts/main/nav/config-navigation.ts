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

  /**
   * {
    order: '3',
    subheader: 'Careplace Jobs',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'Encontrar Emprego / Turno', path: PATHS.home },
      { title: 'Anunciar Emprego / Turno', path: PATHS.home},
      { title: 'Funcionamento', path: PATHS.home},
      { title: 'Preçário', path: PATHS.home },
 
    ],
  },

   */

  /**
   *  {
    order: '4',
    subheader: 'Careplace Learning',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'Cursos', path: PATHS.home },
      { title: 'Instrutores', path: PATHS.home},
      { title: 'Vantagens', path: PATHS.home},
      { title: 'Funcionamento', path: PATHS.home},
      { title: 'Preçário', path: PATHS.home },
 
    ],
  },
   */

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
  { title: 'Serviços', path: PATHS.services.root },
  {
    title: 'Produtos',
    path: 'https://www.careplace.pt',
    children: [navLinks[0], navLinks[1], navLinks[2]],
  },
  { title: 'Unidades de Saúde', path: PATHS.healthUnits },
  { title: 'Profissionais', path: PATHS.caregivers },
];
