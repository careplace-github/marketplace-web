//
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Modal, Box, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
  Avatar,
} from 'src/components/hook-form';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useCallback, useState } from 'react';
// assets
import { countries, genders } from 'src/data';

type Props = {
  action: 'create' | 'edit';
  relative?: Object;
  open: boolean;
  onClose: Function;
};

export default function RelativeInformationModal({ action, relative, open, onClose }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('md', 'up');
  const [fileData, setFileData] = useState<FormData>();

  const defaultValues =
    action === 'edit'
      ? {
          profile_picture: relative.profile_picture,
          name: relative.name,
          phoneNumber: '',
          birthday: relative.birthdate,
          gender: relative.gender,
          streetAddress: relative.address.street,
          zipCode: relative.address.postal_code,
          city: relative.address.city,
          country: relative.address.country,
          medicalConditions: '',
        }
      : {
          profile_picture: null,
          name: 'relative.name',
          phoneNumber: '',
          birthday: '',
          gender: '',
          streetAddress: '',
          zipCode: '',
          city: '',
          country: '',
          medicalConditions: '',
        };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  console.log(defaultValues);
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // If the user didn't select a new image, return
      if (!fileData) {
        enqueueSnackbar('Por favor selecione uma imagem', {
          variant: 'error',
        });

        onClose({}, 'backdropClick');

        return;
      }

      const response = await axios.post('/files', fileData);

      const uploadedFileURL = response.data.url;

      setValue('profile_picture', uploadedFileURL);

      enqueueSnackbar('Imagem de perfil alterada com sucesso', {
        variant: 'success',
      });

      // Close Modal
      onClose({}, 'backdropClick');
    } catch (error) {
      enqueueSnackbar('Erro ao alterar imagem de perfil, por favor tente novamente.', {
        variant: 'error',
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      setFileData(formData);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profile_picture', newFile.preview);
      }
    },
    [setValue]
  );

  const AccountPersonalSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome é obrigatório.')
      .test('name', 'O primeiro e último nome são obrigatórios', (value) => {
        const numberOfNames = value.split(' ');
        return numberOfNames.length >= 2;
      }),
    birthday: Yup.string().required('O aniversário é obrigatório.'),
    gender: Yup.string().required('O género é obrigatório.'),
    streetAddress: Yup.string().required('A morada is required.'),
    city: Yup.string().required('A cidade é obrigatória.'),
    zipCode: Yup.string()
      .required('O código postal é obrigatório.')
      .test('zipCode', 'Insira um código de postal válido (XXXX-XXX)', (value) => {
        const showErrorMessage = value.includes('-') && value.length === 8;
        return showErrorMessage;
      }),
    phoneNumber: Yup.string()
      .test('phoneNumber', 'O número de telemóvel é obrigatório', (value) => {
        console.log('value =', value);
        // If the value is equal to a country phone number, then it is empty
        const code = countries.find((country) => country.phone === value?.replace('+', ''))?.phone;
        const phoneNumber = value?.replace('+', '');

        return code !== phoneNumber;
      })
      .test('phoneNumber', 'O número de telemóvel introduzido não é válido.', (value) => {
        // Portuguese phone number verification
        if (value?.startsWith('+351')) {
          // Remove spaces and the +351 sign
          value = value?.replace(/\s/g, '').replace('+351', '');

          // Check if the phone number is valid
          return value?.length === 9;
        }

        return true;
      }),
  });

  const onFormSubmit = async (data: typeof defaultValues) => {};

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 'auto',
          height: 'auto',
          p: '50px',
          backgroundColor: 'white',
          borderRadius: '16px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onFormSubmit)}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {action === 'edit' ? 'Editar Familiar' : 'Adicionar Familiar'}
          </Typography>
          <RHFUploadAvatar
            name="profile_picture"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Formatos permitidos: *.jpeg, *.jpg, *.png, *.gif
                <br /> tamanho máximo: 3MB
              </Typography>
            }
          />
          <Box
            rowGap={2.5}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            sx={{ mt: '40px' }}
          >
            <RHFTextField name="name" label="Nome" />

            <RHFPhoneField
              name="phoneNumber"
              label="Telemóvel"
              defaultCountry="PT"
              forceCallingCode
            />

            <Controller
              name="birthday"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  format="dd-MM-yyyy"
                  label="Data de nascimento"
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      error: !!error?.message,
                    },
                  }}
                  {...field}
                  value={new Date(field.value)}
                />
              )}
            />

            <RHFSelect native name="gender" label="Género">
              {genders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="streetAddress" label="Morada" />

            <RHFTextField name="zipCode" label="Código Postal" />

            <RHFTextField name="city" label="Cidade" />

            <RHFSelect native name="country" label="País">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField
              sx={{
                gridColumn: 'span 2',
                // height: '100px',
                // '& .MuiInputBase-root': {
                //   height: '100%',
                // },
              }}
              name="medicalConditions"
              label="Condições Médicas (opcional)"
              multiline
              minRows={5}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <LoadingButton
              sx={{
                width: isMdUp ? 'auto' : '100%',
                mt: isMdUp ? '20px' : '40px',
                backgroundColor: 'primary.main',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                },
              }}
              color="inherit"
              disabled={!isDirty}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {action === 'edit' ? 'Guardar' : 'Adicionar'}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
}
