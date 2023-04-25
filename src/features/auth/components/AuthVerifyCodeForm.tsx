//
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFCodes, RHFTextField } from 'src/components/hook-form';
import useCountdown from 'src/hooks/useCountdown';
import { useSnackbar } from 'src/components/snackbar';

// contexts
import { useAuthContext } from 'src/contexts';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function AuthVerifyCodeForm() {
  const theme = useTheme();

  const router = useRouter();

  const { confirmationCode, confirmUser } = useAuthContext();

  const [emailRecovery, setEmailRecovery] = useState(router.query.email as string | null);
  const [email, setEmail] = useState(router.query.email as string);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('O código é obrigatório.'),
    code2: Yup.string().required('O código é obrigatório.'),
    code3: Yup.string().required('O código é obrigatório.'),
    code4: Yup.string().required('O código é obrigatório.'),
    code5: Yup.string().required('O código é obrigatório.'),
    code6: Yup.string().required('O código é obrigatório.'),

    email: Yup.string().required('O email é obrigatório.').email('O email inserido é inválido.'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',

    email: emailRecovery || '',
  };

  let resendTimer = useCountdown(new Date(Date.now() + 10000)).seconds;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const code =
        getValues('code1') +
        getValues('code2') +
        getValues('code3') +
        getValues('code4') +
        getValues('code5') +
        getValues('code6');

      await confirmUser(email, code);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.email) {
        setEmailRecovery(router.query.email as string);
        setValue('email', router.query.email as string);
      }
    }
  }, [router.isReady, router.query?.email, emailRecovery]);

  useEffect(() => {
    // The countdown is initialized with 00 so we can't use it to check if the countdown is over
    // We need to check if the seconds are 01 to know if the countdown is over and wait 1 second to show the button again
    if (resendTimer == '01') {
      // wait 1 second before showing the button again
      setTimeout(() => setResendAvailable(true), 1000);
    }

    if (resendTimer == '00' && resetTimer) {
      resendTimer = useCountdown(new Date(Date.now() + 10000)).seconds;
      setResetTimer(false);
    }
  }, [resendTimer]);

  /**
   * Resend the reset password code
   */
  const onResendCode = async () => {
    try {
      setResetTimer(true);
      setResendAvailable(false);

      await confirmationCode(email);

      // Show success message popup
      enqueueSnackbar('Code sent successfully!');
    } catch (error) {
      // Show error message popup
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" disabled={!!emailRecovery} />

        <RHFCodes
          keyName="code"
          inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
          sx={{
            justifyContent: 'space-between',
          }}
        />

        {resendAvailable && (
          <Typography variant="body2" sx={{ my: 3, justifyContent: 'space-between' }}>
            Não recebeu o código? &nbsp;
            <Link
              variant="subtitle2"
              onClick={() => onResendCode()}
              sx={{
                cursor: 'pointer',
              }}
            >
              Pedir novo código
            </Link>
          </Typography>
        )}

        {!resendAvailable && (
          // Add margin bottom to the text
          <Typography variant="body2" sx={{ justifyContent: 'space-between' }}>
            Poderá pedir um novo código em:
          </Typography>
        )}

        {!resendAvailable && (
          // Add margin bottom to the text
          <Typography
            variant="body2"
            color="primary"
            sx={{
              fontWeight: 'bold',
              mt: -20,
              justifyContent: 'space-between',
            }}
          >
            {resendTimer} segundos
          </Typography>
        )}

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            O código é obrigatório.
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          color="inherit"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            px: 4,
            bgcolor: 'primary.main',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Confirmar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
