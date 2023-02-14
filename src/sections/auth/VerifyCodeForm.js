import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, FilledInput, FormHelperText } from '@mui/material';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  code: Yup.array().of(Yup.string().required()),
});

export default function VerifyCodeForm({ email }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      code: ['', '', '', '', '', ''],
    },
  });

  const onSubmit = async (data) => {
   
    let dataToSend = {
      email: {email},
      code: data.code.join('')
    }
    await axios.post('/api/v1/auth/marketplace/verify/confirmation-code', dataToSend)
  .then(response => {
    //await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify(dataToSend.code, null, 2));
  })
  .catch(error => {
    //await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify(dataToSend.code, null, 2));
  });
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 5, mb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {[...Array(6)].map((_, index) => (
            <Controller
              key={`code-${index}`}
              name={`code.${index}`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FilledInput
                  {...field}
                  fullWidth
                  placeholder="-"
                  error={Boolean(error)}
                  sx={{
                    maxWidth: { xs: 48, sm: 56 },
                    '& .MuiFilledInput-input': {
                      px: 0,
                      py: { xs: '14px', sm: '18px' },
                      textAlign: 'center',
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>

        {Boolean(errors.code) && (
          <FormHelperText sx={{ px: 2 }} error>
            Insira o código
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Verificar
        </LoadingButton>
      </Stack>
    </form>
  );
}
