// hooks
import FormProvider, { RHFUploadAvatar } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { Divider, Button, Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import { useSession } from 'next-auth/react';
import axios from 'src/lib/axios';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { useSnackbar } from 'src/components/snackbar';
import fetch from 'src/lib/fetch';

type UploadPictureModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};
type FormValuesProps = {
  open: boolean;
  onClose: VoidFunction;
  profile_picture: string | null;
};

const UploadPictureModal = ({ open, onClose }: UploadPictureModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: user } = useSession();
  const isMdUp = useResponsive('up', 'md');
  const [fileData, setFileData] = useState<FormData>();
  const defaultValues = {
    profile_picture: user?.profile_picture,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
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

      let fileURL;

      const response = await fetch('/api/files', {
        method: 'POST',
        body: fileData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.fileURL) {
        const uploadedFileURL = response.fileURL;

        fileURL = uploadedFileURL;
      }
      if (user) {
        user.profile_picture = fileURL;
        setValue('profile_picture', fileURL);

        await fetch('/api/account', {
          method: 'PUT',
          body: JSON.stringify(user),
        });

        enqueueSnackbar('Imagem de perfil alterada com sucesso', {
          variant: 'success',
        });
      }

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

  // function when the user clicks cancel button (modal opened)
  const handleCancelClick = () => {
    if (user?.profile_picture) {
      const prevImage = Object.assign(user?.profile_picture, {
        preview: user?.profile_picture,
      });
      setValue('profile_picture', prevImage);
    } else {
      setValue('profile_picture', null);
    }
    onClose({}, 'backdropClick');
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setValue('profile_picture', null);
        onClose({}, 'backdropClick');
      }}
    >
      <Box
        sx={{
          outline: 'none',
          width: '500px',
          height: 'auto',
          bgcolor: 'white',
          borderRadius: '16px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '20px',
          gap: '10px',
          ...(!isMdUp && {
            height: '100vh',
            width: '100vw',
            borderRadius: '0px',
          }),
        }}
      >
        <Typography variant="h6">Alterar Imagem de Perfil</Typography>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0px',
            gap: '0px',
            ...(!isMdUp && {
              mb: '200px',
              height: '100%',
              justifyContent: 'center',
            }),
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px',
                mt: '20px',
                ...(!isMdUp && {
                  flexDirection: 'column-reverse',
                  gap: '10px',
                  position: 'fixed',
                  bottom: '50px',
                  left: '50%',
                  transform: 'translatex(-50%)',
                }),
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancelClick}
                sx={{
                  width: '100%',
                  height: '50px',
                  color: 'red',
                  borderColor: 'red',
                  ...(!isMdUp && {
                    width: '80%',
                  }),
                }}
              >
                Cancelar
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  width: '100%',
                  height: '50px',
                  ...(!isMdUp && {
                    width: '80%',
                  }),
                }}
              >
                Guardar
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadPictureModal;
