import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
//
import { SupportHero, SupportNav, SupportContent, SupportForm } from '../components';

// ----------------------------------------------------------------------

const _generalFaqs = [
  {
    id: '1',
    question: 'Como funciona a Careplace?',
    answer: (
      <p>
        A Careplace é uma plataforma inovadora que simplifica a procura por cuidados domiciliários
        de alta qualidade e confiança. Ligamos indivíduos que necessitam de cuidados a prestadores
        de serviços altamente qualificados, incluindo empresas especializadas em cuidados
        domiciliários e cuidadores individuais dedicados.
        <br /> <br />A nossa missão é tornar o processo de encontrar e contratar serviços de
        cuidados domiciliários mais simples e transparente. Facilitamos a comparação de diferentes
        prestadores de serviços, assegurando que tenha acesso a uma seleção criteriosamente avaliada
        de profissionais de cuidados que correspondam às suas necessidades específicas.
      </p>
    ),
  },

  {
    id: '2',
    question: 'Por que devo escolher a Careplace?',
    answer: (
      <p>
        Escolher a Careplace torna-se uma decisão fácil pelos seguintes motivos: <br /> <br />{' '}
        <br />
        <b>1. Transparência e Confiança</b>: A Careplace é dedicada a fornecer um ambiente
        transparente e confiável para encontrar serviços de cuidados domiciliares. Todos os
        prestadores de serviços são criteriosamente avaliados e verificados, garantindo que você
        receba cuidados de alta qualidade. <br /> <br />
        <b>2. Variedade de Opções</b>: Nossa plataforma oferece uma ampla variedade de opções de
        cuidados, desde empresas especializadas até cuidadores individuais, para atender às suas
        necessidades específicas. Você pode escolher o prestador que melhor se adapte às suas
        preferências. <br /> <br />
        <b>3. Facilidade de Uso</b>: A Careplace torna o processo de encontrar e contratar serviços
        de cuidados simples e conveniente. Com apenas alguns cliques, você pode explorar diferentes
        opções e tomar decisões informadas. <br />
        <br />
        <b>4. Expansão de Ofertas</b>: Além dos cuidados domiciliares, estamos expandindo nossa
        plataforma para incluir lares de idosos e equipamentos médicos essenciais, proporcionando um
        conjunto abrangente de soluções para suas necessidades geriátricas.
        <br />
        <br />
        <b>5. Compromisso com a Qualidade</b>: A nossa dedicação à qualidade do atendimento garante
        que você e os seus entes queridos recebam cuidados de excelência. <br />
        <br /> <br />
        Estamos empenhados em melhorar continuamente a experiência de cuidados. Escolher a Careplace
        significa ter acesso a cuidados de qualidade com conveniência e tranquilidade, além de uma
        variedade de opções para atender às suas necessidades específicas.
      </p>
    ),
  },

  {
    id: '3',
    question: 'Como funcionam os preços dos serviços de apoio domiciliário?',
    answer: (
      <p>
        Em geral, os preços dos serviços de apoio domiciliário são determinados com base no tempo e
        nos dias da semana em que um cuidador precisa estar presente para prestar assistência. Isso
        significa que o preço mensal não depende apenas da quantidade de serviços necessários, mas
        também do número de horas e dos dias em que um cuidador está programado para cuidar do seu
        familiar. <br /> <br />
        Cada empresa de cuidados domiciliares pode ter a sua própria estrutura de preços e políticas
        de faturação. Portanto, ao avaliar as opções, é importante discutir os detalhes dos custos
        com a empresa escolhida para garantir que compreenda completamente como os preços são
        calculados. <br /> <br />
        Na Careplace, esforçamo-nos por fornecer informações transparentes sobre preços e políticas
        de faturação dos prestadores de serviços. Ao solicitar orçamentos e falar diretamente com as
        empresas de cuidados, pode obter informações detalhadas sobre os custos associados aos
        serviços de apoio domiciliário que necessita.
      </p>
    ),
  },

  {
    id: '4',
    question: 'Como contrato um serviço?',
    answer: (
      <p>
        Contratar um serviço através da Careplace é simples e conveniente. Aqui estão os passos a
        seguir: <br /> <br /> <br />
        <b>Pesquisa e Exploração</b>: Comece por navegar na nossa plataforma para encontrar os
        serviços de cuidados domiciliários que melhor correspondem às necessidades do seu familiar.
        Pode utilizar os filtros de pesquisa para refinar os resultados com base em critérios como
        localização, tipo de serviço e muito mais.
        <br /> <br />
        <b>Obtenção de Orçamentos</b>: Depois de identificar as opções que lhe interessam, pode
        solicitar orçamentos diretamente a empresas de cuidados domiciliários. Esta é uma forma de
        obter informações detalhadas sobre os serviços oferecidos e os custos associados.
        <br /> <br />
        <b>Escolha e Reserva</b>: Com base nos orçamentos recebidos e nas suas preferências, pode
        escolher a empresa de cuidados domiciliários que melhor se adapte às suas necessidades. Uma
        vez feita a seleção, pode proceder à reserva dos serviços diretamente através da nossa
        plataforma.
        <br /> <br />
        <b>Acompanhamento e Assistência</b>: Após a reserva, a empresa de cuidados domiciliários
        escolhida entrará em contacto consigo para organizar os detalhes finais, como horários e
        datas de início dos serviços. Estamos aqui para ajudar durante todo o processo e garantir
        que tudo corra sem problemas.
        <br /> <br /> <br />
        Lembramos que, na Careplace, o uso da plataforma para pesquisa e reserva de serviços é
        gratuito. Os custos associados aos serviços dependerão da empresa de cuidados domiciliários
        escolhida e dos termos acordados durante o processo de reserva. Estamos comprometidos em
        tornar o processo o mais simples e transparente possível, para que possa obter os cuidados
        de que precisa com facilidade.
      </p>
    ),
  },

  {
    id: '5',
    question: 'Posso pedir mais de um serviço?',
    answer: (
      <p>
        Sim, pode certamente pedir mais de um serviço através da Careplace. Entendemos que as
        necessidades de cuidados podem variar e que pode precisar de serviços diferentes para
        atender às diversas necessidades do seu familiar. A Careplace está aqui para simplificar o
        processo de pesquisa e reserva de serviços de cuidados, tornando-o conveniente para si.{' '}
        <br /> <br />
        Ao utilizar a nossa plataforma, pode solicitar e reservar vários serviços de cuidados, como
        assistência médica, cuidados pessoais, acompanhamento, entre outros, de empresas diferentes,
        se necessário. Isso permite que adapte os serviços às necessidades específicas do seu
        familiar e obtenha o suporte necessário de forma abrangente. <br /> <br />
        Lembre-se de que estamos aqui para ajudar a tornar o processo o mais simples e transparente
        possível. Se tiver dúvidas sobre como solicitar vários serviços ou precisar de assistência
        na reserva, não hesite em entrar em contacto connosco. Estamos à disposição para ajudar a
        encontrar as soluções de cuidados mais adequadas para si e para o seu familiar.
      </p>
    ),
  },

  {
    id: '6',
    question:
      'Não sei qual empresa ou serviço escolher. Posso obter ajuda da Careplace para encontrar a empresa adequada?',
    answer: (
      <p>
        Sim, claro! Estamos aqui para ajudar a simplificar o processo de escolha para si. <br />{' '}
        <br />
        Se estiver indeciso sobre qual empresa de cuidados domiciliares escolher ou precisar de
        orientação personalizada, não hesite em entrar em contacto direto connosco. Os nossos
        especialistas terão todo o prazer em ouvir as suas necessidades específicas e as
        preferências do seu familiar e, com base nisso, ajudarão a encontrar a empresa de cuidados
        domiciliares mais adequada para si. A nossa missão é facilitar o acesso a cuidados de alta
        qualidade e garantir que obtenha a assistência de que precisa. <br /> <br /> <br />
        Pode entrar em contacto connosco através do seguinte: <br /> <br />
        <b>Email</b>: suporte@careplace.pt
        <br />
        <b>Telemóvel</b>: (+351) 930 413 131
      </p>
    ),
  },

  {
    id: '7',
    question: 'Vou pagar mais ao contratar pela Careplace?',
    answer: (
      <p>
        Não, não terá custos adicionais ao contratar através da Careplace. <br />
        A nossa plataforma atua como um serviço de pesquisa e conexão entre indivíduos e prestadores
        de serviços qualificados. Não cobramos taxas adicionais aos clientes pelo uso da nossa
        plataforma de pesquisa e reserva. Os custos associados ao serviço dependerão do prestador de
        serviços escolhido e dos termos acordados durante o processo de reserva.
        <br /> <br />A Careplace esforça-se por fornecer informações transparentes sobre preços e
        políticas de faturação dos prestadores de serviços, para que possa tomar decisões informadas
        sem custos adicionais pela utilização da plataforma.
      </p>
    ),
  },

  {
    id: '8',
    question:
      'Posso ter a oportunidade de conhecer o meu cuidador antes de tomar uma decisão de contratação?',
    answer: (
      <p>
        Sim, tem a oportunidade de conhecer o seu cuidador antes de tomar uma decisão de
        contratação. <br />
        Muitos prestadores de serviços de cuidados domiciliares oferecem a opção de realizar uma
        reunião inicial ou uma visita prévia. Isso permite que se familiarize com o cuidador, faça
        perguntas e avalie se existe uma boa compatibilidade antes de prosseguir com a contratação.
        <br />
        <br /> Além disso, na Careplace, pode solicitar vários orçamentos a diferentes empresas de
        cuidados domiciliares, sem qualquer custo adicional. Isso permite que compare diferentes
        opções, avalie as tarifas e os serviços oferecidos por várias empresas e tome uma decisão
        informada que corresponda às suas necessidades de cuidados. Estamos aqui para facilitar o
        processo de escolha do cuidador que melhor se adapte a si ou ao seu ente querido.
      </p>
    ),
  },

  {
    id: '9',
    question: 'Contratar a empresa significa que não terei um cuidador fixo para meu familiar?',
    answer: (
      <p>
        Não necessariamente. A contratação de uma empresa de cuidados domiciliares não significa
        automaticamente que não terá um cuidador fixo para o seu familiar. Muitas empresas de
        cuidados oferecem a opção de designar um cuidador específico para atender às necessidades do
        seu ente querido de forma consistente.
        <br /> <br /> Ao contratar uma empresa de cuidados domiciliares, pode discutir as suas
        preferências com a empresa. Muitas empresas farão o possível para designar um cuidador fixo,
        o que pode ser benéfico para estabelecer uma relação de confiança e familiaridade.
        <br /> <br /> No entanto, é importante lembrar que a disponibilidade de um cuidador fixo
        pode depender de vários fatores, incluindo a programação do cuidador e as necessidades
        específicas do seu familiar. Certifique-se de discutir essas preferências com a empresa de
        cuidados durante o processo de contratação para que possam atender às suas expectativas da
        melhor forma possível.
      </p>
    ),
  },

  {
    id: '10',
    question: 'Os serviços contratados através da Careplace podem ser subsidiados?',
    answer: (
      <p>
        Sim, os serviços contratados através da Careplace podem, em alguns casos, ser subsidiados
        pela ADSE, dependendo da sua situação e dos critérios de elegibilidade.
        <br /> Além disso, trabalhamos em estreita colaboração com uma ampla rede de parceiros de
        seguros que podem oferecer comparticipações e benefícios para os serviços de cuidados
        domiciliares. Estas parcerias podem ajudar a tornar o acesso a cuidados de qualidade mais
        acessível e acessível a um público mais amplo. <br />
        <br />
        Recomendamos que entre em contato conosco para obter informações específicas sobre como você
        pode aproveitar esses subsídios e comparticipações.
      </p>
    ),
  },
];
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SupportView() {
  const [generalFaqs, setGeneralFaqs] = useState(_generalFaqs);

  const TOPICS = [
    {
      title: 'Geral',
      icon: '/assets/icons/faq/ic_faq_general.svg',
      content: <SupportContent contents={generalFaqs} />,
    },

    {
      title: 'Conta',
      icon: '/assets/icons/faq/ic_faq_account.svg',
      content: <SupportContent contents={[]} />,
    },
    {
      title: 'Pagamentos',
      icon: '/assets/icons/faq/ic_faq_payment.svg',
      content: <SupportContent contents={[]} />,
    },
    {
      title: 'Delivery',
      icon: '/assets/icons/faq/ic_faq_delivery.svg',
      content: <SupportContent contents={[]} />,
    },
    {
      title: 'Product',
      icon: '/assets/icons/faq/ic_faq_package.svg',
      content: <SupportContent contents={[]} />,
    },
    {
      title: 'Return & Refund',
      icon: '/assets/icons/faq/ic_faq_refund.svg',
      content: <SupportContent contents={[]} />,
    },
    {
      title: 'Assurances',
      icon: '/assets/icons/faq/ic_faq_assurances.svg',
      content: <SupportContent contents={[]} />,
    },
  ];

  const [topic, setTopic] = useState('Geral');
  const [searchQuery, setSearchQuery] = useState('');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChangeTopic = (event: React.SyntheticEvent, newValue: string) => {
    setTopic(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    if (searchQuery === '') {
      setGeneralFaqs(_generalFaqs);
      return;
    }
    setGeneralFaqs(
      _generalFaqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <>
      <SupportHero query={searchQuery} onSearch={handleSearch} onReset={handleReset} />

      <Stack
        alignItems="flex-end"
        sx={{
          py: 1.5,
          px: 2.5,
          display: { md: 'none' },
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={() => setMobileOpen(true)}>
          <Iconify icon="carbon:menu" />
        </IconButton>
      </Stack>

      <Container>
        <Typography variant="h3" sx={{ py: { xs: 3, md: 10 } }}>
          Perguntas Frequentes
        </Typography>

        <Stack direction="row" sx={{ pb: { xs: 10, md: 15 } }}>
          <SupportNav
            sidebarConfig={TOPICS}
            topic={topic}
            isOpenSidebar={mobileOpen}
            onChangeTopic={handleChangeTopic}
            onCloseSidebar={() => setMobileOpen(false)}
          />

          {TOPICS.map((item) => item.title === topic && <div key={item.title}>{item.content}</div>)}
        </Stack>
      </Container>

      <Container sx={{ pb: { xs: 10, md: 15 } }}>
        <SupportForm />
      </Container>
    </>
  );
}
