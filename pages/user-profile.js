// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack, TextField, Autocomplete, Select, Box, Card, Grid, Avatar, Chip } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page, Image } from '../src/components';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'react-hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function UserProfilePage() {

   /* const { servicesList } = useAuthContext();

  const language = currentUser?.settings?.language || 'pt';

  const gendersList = genders[language];

  let file;
  let newFile;
  let formData;

  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });
  const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
  ];
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      gender: currentUser?.gender || '',

      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',

      street: currentUser?.address.street || '',
      postalCode: currentUser?.address.postalCode || '',

      city: currentUser?.address.city || '',
      state: currentUser?.address.state || '',
      country: currentUser?.address.country || '',

      services: currentUser?.caregiverInformation?.services || [],

      profilePicture: currentUser?.profilePicture || '',
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
      //tags: '' || [TAGS_OPTION[0]],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async () => {
    try {
      let fileURL;

      if (file) {
        const response = await axios.post('/files', formData);

        const uploadedFileURL = response.data.data.Location;
        currentUser.profilePicture = uploadedFileURL;
        setValue('profilePicture', uploadedFileURL);
      }

      axios.put('/users/' + currentUser._id, methods.getValues());
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      file = acceptedFiles[0];

      formData = new FormData();
      formData.append('file', file, file.name);

      newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profilePicture', newFile);
      }
    },
    [setValue]
  );

*/


  return (
    <Page title="UserProfilePage">
      <RootStyle>
        <Stack alignItems="center" sx={{ maxWidth: 480 }}>
        <FormProvider //</Stack>methods={} onSubmit={handleSubmit(onSubmit)}>
        >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/*isEdit*/}

            <Box sx={{ mb: 5 }}>
              <Avatar
                name="profilePicture"
                maxSize={3145728}
               // onDrop={/*handleDrop*/}
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
                    Permitido *.jpeg, *.jpg, *.png, *.gif
                    <br /> tamanho máximo de ____
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField name="name" label="Nome" />
              <Select name="gender" label="Género" placeholder="Gender">
                <option value="" />
                {/*gendersList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))*/}
              </Select>

              <TextField name="email" label="Email" />

              <TextField name="phoneNumber" label="Telefone" />

              <TextField name="address" label="Morada" />
              <TextField name="postalCode" label="Código Postal" />

              <TextField name="city" label="Cidade" />

              <Autocomplete
                name="tags"
                multiple
                freeSolo
                //onChange={(event, newValue) => setValue('tags', newValue)}
                //options={TAGS_OPTION.map((option) => option)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                }
                renderInput={(params) => <TextField label="Serviços" {...params} />}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <Button variant="contained" color="primary">Guardar</Button>

            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
        </Stack>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

UserProfilePage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
