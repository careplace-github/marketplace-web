import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
//
import { SupportHero, SupportNav, SupportContent, SupportForm } from '../components';

// ----------------------------------------------------------------------

const _faqsAccount = [
  {
    id: '1',
    question: 'Como faço para criar uma conta?',
    answer:
      'Para criar uma conta, clique em "Entrar" no canto superior direito da página inicial. Em seguida, clique em "Criar uma conta" e preencha as informações solicitadas. Você também pode criar uma conta usando sua conta do Facebook ou Google.',
  },
  {
    id: '2',
    question: 'Como faço para fazer login na minha conta?',
    answer:
      'Para fazer login na sua conta, clique em "Entrar" no canto superior direito da página inicial. Em seguida, insira seu endereço de e-mail e senha e clique em "Entrar".',
  },
  {
    id: '3',
    question: 'Como faço para alterar meu endereço de e-mail?',
    answer:
      'Para alterar seu endereço de e-mail, faça login na sua conta e clique em "Minha conta" no canto superior direito da página inicial. Em seguida, clique em "Editar" ao lado do seu endereço de e-mail e insira seu novo endereço de e-mail. Clique em "Salvar" para salvar suas alterações.',
  },
  {
    id: '4',
    question: 'Como faço para alterar minha senha?',
    answer:
      'Para alterar sua senha, faça login na sua conta e clique em "Minha conta" no canto superior direito da página inicial. Em seguida, clique em "Editar" ao lado da sua senha e insira sua nova senha. Clique em "Salvar" para salvar suas alterações.',
  },
  {
    id: '5',
    question: 'Como faço para alterar meu endereço de cobrança?',
    answer:
      'Para alterar seu endereço de cobrança, faça login na sua conta e clique em "Minha conta" no canto superior direito da página inicial. Em seguida, clique em "Editar" ao lado do seu endereço de cobrança e insira seu novo endereço de cobrança. Clique em "Salvar" para salvar suas alterações.',
  },
];

const _faqsPayment = [
  {
    id: '1',
    question: 'Quais métodos de pagamento você aceita?',
    answer:
      'Aceitamos todos os principais cartões de crédito, incluindo Visa, MasterCard, American Express e Discover. Também aceitamos PayPal, Apple Pay e Google Pay.',
  },
  {
    id: '2',
    question: 'Como faço para aplicar um código de desconto?',
    answer:
      'Para aplicar um código de desconto, insira o código no campo "Código de desconto" na página de checkout e clique em "Aplicar".',
  },
  {
    id: '3',
    question: 'Como faço para alterar meu endereço de cobrança?',
    answer:
      'Para alterar seu endereço de cobrança, faça login na sua conta e clique em "Minha conta" no canto superior direito da página inicial. Em seguida, clique em "Editar" ao lado do seu endereço de cobrança e insira seu novo endereço de cobrança. Clique em "Salvar" para salvar suas alterações.',
  },
];

// ----------------------------------------------------------------------

const TOPICS = [
  {
    title: 'Conta',
    icon: '/assets/icons/faq/ic_faq_account.svg',
    content: <SupportContent contents={_faqsAccount} />,
  },
  {
    title: 'Pagamentos',
    icon: '/assets/icons/faq/ic_faq_payment.svg',
    content: <SupportContent contents={_faqsPayment} />,
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

// ----------------------------------------------------------------------

export default function SupportView() {
  const [topic, setTopic] = useState('Conta');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChangeTopic = (event: React.SyntheticEvent, newValue: string) => {
    setTopic(newValue);
  };

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <>
      <SupportHero />

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
