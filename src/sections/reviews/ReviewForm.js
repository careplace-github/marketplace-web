import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Stack, Paper, Button, Rating, TextField, Typography, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled((props) => <Paper variant="outlined" {...props} />)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  rating: Yup.mixed().required('Rating is required'),
  review: Yup.string().required('Review is required'),
  email: Yup.string().required('Email is required').email('That is not an email'),
});

ReviewElearningForm.propTypes = {
  onClose: PropTypes.func,
};

export default function ReviewElearningForm({ onClose }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      rating: null,
      review: '',
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
          rating: Number(data.rating),
        },
        null,
        2
      )
    );
    reset();
    onClose();
  };

  return (
    <RootStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <div>
            <Typography variant="h3" paragraph>
              Partilhe a sua experiência
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Avalie este cuidador:
            </Typography>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => <Rating {...field} value={Number(field.value)} />}
            />
            {Boolean(errors.rating) && (
              <FormHelperText sx={{ px: 2 }} error>
                {errors.rating?.message}
              </FormHelperText>
            )}
          </div>

          <Controller
            name="review"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                multiline
                fullWidth
                rows={3}
                label="Comentário *"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Qual o seu nome? *"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Qual o seu Email? *"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ width: 1 }}
          >
            <Button variant="outlined" onClick={onClose} color="inherit">
              Cancelar
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Submeter Avaliação
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </RootStyle>
  );
}
