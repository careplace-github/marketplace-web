//
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Modal, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
import FormProvider, { RHFTextField, RHFSelect, RHFUploadAvatar } from 'src/components/hook-form';

// axios
import axios from 'src/lib/axios';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useCallback, useState } from 'react';
// assets
import { countries, genders, kinshipDegrees } from 'src/data';
// types
import { IRelativeProps } from 'src/types/relative';

type Props = {
  action: 'add' | 'edit';
  relative?: IRelativeProps;
  open: boolean;
  onActionMade: Function;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

type FormProps = {
  profile_picture: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  kinshipDegree: string;
  birthday: string;
  gender: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
  medicalConditions: string;
};

export default function RelativeInformationModal({
  action,
  relative,
  open,
  onClose,
  onActionMade,
}: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const [fileData, setFileData] = useState<FormData>();
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [isSubmitting, setIsSubmiting] = useState(false);

  const defaultValues =
    relative && action === 'edit'
      ? {
          profile_picture: relative && relative.profile_picture,
          firstName: relative && relative.name.split(' ')[0],
          lastName: relative && relative.name.split(' ').pop(),
          phoneNumber: relative && relative.phone_number,
          kinshipDegree: relative && relative.kinship,
          birthday: relative && relative.birthdate,
          gender: relative && relative.gender,
          streetAddress: relative && relative.address.street,
          zipCode: relative && relative.address.postal_code,
          city: relative && relative.address.city,
          country: relative && relative.address.country,
          medicalConditions: relative && relative.medical_conditions,
        }
      : {
          profile_picture: '',
          firstName: '',
          lastName: '',
          kinshipDegree: '',
          phoneNumber: '+351',
          birthday: '',
          gender: '',
          streetAddress: '',
          zipCode: '',
          city: '',
          country: '',
          medicalConditions: '',
        };

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('O nome é obrigatório.')
      .test('name', 'Retire todos os espaços', (value) => !value.includes(' ')),
    kinshipDegree: Yup.string().required('O Grau de Parentesco é obrigatório'),
    lastName: Yup.string()
      .required('O nome é obrigatório.')
      .test('name', 'Retire todos os espaços', (value) => !value.includes(' ')),
    birthday: Yup.string()
      .required('O aniversário é obrigatório.')
      .test('birthday', 'Insira uma data válida', (value) => {
        const date = new Date(value);
        const today = new Date();

        // Check if the date is in the future
        if (date < today) {
          return true;
        }

        return false;
      }),
    gender: Yup.string().required('O género é obrigatório.'),
    streetAddress: Yup.string().required('A morada is required.'),
    city: Yup.string().required('A cidade é obrigatória.'),
    country: Yup.string().required('O país é obrigatório.'),
    zipCode: Yup.string()
      .required('O código postal é obrigatório.')
      .test('zipCode', 'Insira um código de postal válido (XXXX-XXX)', (value) => {
        const showErrorMessage = value.includes('-') && value.length === 8;
        return showErrorMessage;
      }),
    phoneNumber: Yup.string()
      .test('phoneNumber', 'O número de telemóvel é obrigatório', (value) => {
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

  const methods = useForm<FormProps>({
    resolver: yupResolver(AccountPersonalSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file, file.name);

      setFileData(formData);
      setImageChanged(true);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profile_picture', newFile.preview);
      }
    },
    [setValue]
  );

  const onFormSubmit = async (data: typeof defaultValues) => {
    setIsSubmiting(true);
    if (action === 'edit') {
      if (relative && relative._id) {
        let uploadedFileURL = data.profile_picture;
        if (fileData) {
          const response = await axios.post('/files', fileData);
          uploadedFileURL = response.data.url;
        }
        try {
          const updateRelative: IRelativeProps = {
            _id: relative._id,
            profile_picture: uploadedFileURL,
            name: `${data.firstName} ${data.lastName}`,
            phone_number: data.phoneNumber,
            birthdate: data.birthday,
            address: {
              street: data.streetAddress,
              city: data.city,
              country: data.country,
              postal_code: data.zipCode,
            },
            kinship: data.kinshipDegree,

            gender: data.gender,
            medical_conditions: data.medicalConditions,
          };

          await axios.put(`/customers/patients/${relative._id}`, updateRelative);
          onActionMade(action, 'success');
        } catch (error) {
          setIsSubmiting(false);
          onActionMade(action, 'error');
          return null;
        }
      }
    }
    if (action === 'add') {
      let uploadedFileURL = '';
      if (fileData) {
        const response = await axios.post('/files', fileData);
        uploadedFileURL = response.data.url;
      }
      try {
        const createRelative: IRelativeProps = {
          profile_picture: uploadedFileURL,
          name: `${data.firstName} ${data.lastName}`,
          phone_number: data.phoneNumber,
          birthdate: data.birthday,
          address: {
            street: data.streetAddress,
            city: data.city,
            country: data.country,
            postal_code: data.zipCode,
          },
          kinship: data.kinshipDegree,
          medical_conditions: data.medicalConditions,
          gender: data.gender,
        };

        await axios.post(`/customers/patients/`, createRelative);
        onActionMade(action, 'success');
      } catch (error) {
        setIsSubmiting(false);
        onActionMade(action, 'error');
        return null;
      }
    }
    setIsSubmiting(false);
    onClose({}, 'backdropClick');
    return true;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: isMdUp ? 'auto' : '100vw',
          height: isMdUp ? 'auto' : '100vh',
          minWidth: isMdUp ? '800px' : undefined,
          maxHeight: isMdUp ? '90vh' : '100vh',
          p: isMdUp ? '50px' : '20px',
          pt: isMdUp ? '50px' : '75px',
          pb: isMdUp ? '50px' : '75px',
          backgroundColor: 'white',
          borderRadius: isMdUp ? '16px' : '0',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflowY: 'auto',
        }}
      >
        <Iconify
          width={30}
          height={30}
          icon="material-symbols:close-rounded"
          sx={{
            position: 'absolute',
            top: isMdUp ? '50px' : '72px',
            right: isMdUp ? '50px' : '20px',
            cursor: 'pointer',
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.mode === 'light' ? 'grey.400' : 'white',
            },
          }}
          onClick={() => onClose({}, 'backdropClick')}
        />
        <Typography variant="h5" sx={{ mb: 3, width: '100%', alignText: 'left' }}>
          {action === 'edit' ? 'Editar Familiar' : 'Adicionar Familiar'}
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onFormSubmit)}>
          <RHFUploadAvatar
            name="profile_picture"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
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
            <RHFTextField name="firstName" label="Nome*" />
            <RHFTextField name="lastName" label="Apelido*" />

            <RHFPhoneField
              name="phoneNumber"
              label="Telemóvel*"
              defaultCountry="PT"
              forceCallingCode
              onChange={(value: string) => {
                /**
                 * Portuguese Number Validation
                 */

                // If the value is +351 9123456780 -> 15 digits and has no spaces, add the spaces. (eg: +351 9123456780 -> +351 912 345 678)
                if (value.length === 15 && value[8] !== ' ' && value[12] !== ' ') {
                  // (eg: +351 9123456780 -> +351 912 345 678)
                  const newValue = `${value.slice(0, 8)} ${value.slice(8, 11)} ${value.slice(
                    11,
                    14
                  )}`;
                  setValue('phoneNumber', newValue);
                  return;
                }

                // Limit the phone to 16 digits. (eg: +351 912 345 678 -> 16 digits)
                if (value.length > 16) {
                  return;
                }

                setValue('phoneNumber', value);
              }}
            />

            <Controller
              name="birthday"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  format="dd-MM-yyyy"
                  label="Data de nascimento*"
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

            <RHFSelect native name="gender" label="Género*">
              {genders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFSelect
              native
              name="kinshipDegree"
              label="Grau de Parentesco*"
              onChange={(e) => {
                const { value } = e.target;
                setValue('kinshipDegree', value);
              }}
            >
              <option value="" />
              {kinshipDegrees.map((kinship) => (
                <option key={kinship.value} value={kinship.value}>
                  {kinship.label}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="streetAddress" label="Morada*" />

            <RHFTextField
              name="zipCode"
              label="Código Postal*"
              onChange={(e) => {
                const { value } = e.target;

                /**
                 * Only allow numbers and dashes
                 */
                if (!/^[0-9-]*$/.test(value)) {
                  return;
                }

                /**
                 * Portugal Zip Code Validation
                 */
                if (getValues('country') === 'PT' || getValues('country') === '') {
                  // Add a dash to the zip code if it doesn't have one. Format example: XXXX-XXX
                  if (value.length === 5 && value[4] !== '-') {
                    setValue('zipCode', `${value[0]}${value[1]}${value[2]}${value[3]}-${value[4]}`);
                    return;
                  }

                  // Do not allow the zip code to have more than 8 digits (XXXX-XXX -> 8 digits)
                  if (value.length > 8) {
                    return;
                  }
                }

                setValue('zipCode', value);
              }}
            />

            <RHFTextField name="city" label="Cidade*" />

            <RHFSelect native name="country" label="País*">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
            <Box
              sx={{
                gridColumn: isMdUp ? 'span 2' : null,
              }}
            >
              <RHFTextField
                name="medicalConditions"
                label="Condições Médicas (opcional)"
                multiline
                minRows={isMdUp ? 3 : 5}
              />
            </Box>
          </Box>
          <Typography sx={{ fontSize: '12px', color: '#91A0AD', marginTop: '20px' }}>
            *Campo obrigatório
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <LoadingButton
              sx={{
                width: '100%',
                mt: isMdUp ? '20px' : '40px',
                backgroundColor: 'primary.main',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                },
              }}
              color="inherit"
              disabled={action === 'add' ? !isValid : (!isValid || !isDirty) && !imageChanged}
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
