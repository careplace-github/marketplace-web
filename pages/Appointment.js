import React, { useState } from 'react';
import { Grid, TextField, FormControl, Card, Stack, Typography, Autocomplete, Chip, Select, Button, Box, Container } from '@mui/material';
import { Controller, FormProvider } from 'react-hook-form';
import { MobileDateTimePicker, TimePicker } from '@mui/lab';
import { Iconify } from '../src/components';

// @mui
import { styled } from '@mui/material/styles';
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';


// ----------------------------------------------------------------------

const GENDER_OPTION = [
    { label: 'Homem', value: 'Men' },
    { label: 'Mulher', value: 'Women' },
    { label: 'Casal', value: 'Kids' },
  ];
  
  const CATEGORY_OPTION = [
    { group: 'Higienização', classify: ['Carlos', 'Rita', 'Maria', 'Manuel'] },
    { group: 'Alimentação', classify: ['Carlos', 'Rita', 'Maria', 'Manuel'] },
    { group: 'Acomp. Diário', classify: ['Carlos', 'Rita', 'Maria', 'Manuel'] },
  ];
  const recorrencia = [
    {classify:['Sem Recorrência', 'Semanal', 'Quinzenal']}
  ]
  
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
  const WEEK_DAYS = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    "Domingo",
  ];
 
const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <Page title="Novo Pedido">
      <Container>
        <Typography variant="h3" align="center" paragraph>
          {`Marcação`}
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Defina a sua marcação
        </Typography>
        <MyPage />        
      </Container>
    </Page>
  );
}
/*
<Card
          sx={{
            boxShadow: (theme) => ({
              xs: 0,
              md: theme.customShadows.z16,
            }),
          }}
        > </Card>
<CheckoutBillingAddress />
            <CheckoutMethods />
            <CheckoutSummary />
*/
// ----------------------------------------------------------------------

AppointmentPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};


function MyPage (){
    const [selectedWeekDays, setSelectedWeekDays] = useState([]);
    return(
      <>
      <h1>Novo Pedido</h1>
      <FormProvider spacing={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Cliente
                </Typography>
                
                <Grid container direction="row" gap={1}>
                    <Grid item xs={8}>
                        <TextField name="name" label="Nome" /> 
                    </Grid>
                    <Grid item xs>
                        <TextField name="phoneNumber" label="Contacto"  />
                    </Grid>
                </Grid>
                <TextField name="address" label="Morada" />
                <Stack spacing={3}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Serviço
                </Typography>
                <Autocomplete
                  name="tags"
                  multiple
                  freeSolo
                 // onChange={(event, newValue) => setValue('tags', newValue)}
                  options={TAGS_OPTION.map((option) => option)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Serviços Pretendidos" {...params} />}
                />
                <TextField
                  id="info-medicas"
                  label="Infromações Médicas"
                  multiline
                  minRows={5}
                  maxRows={10}
                />
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Informações do Familiar
                </Typography>
                <TextField name="familyMember" label="Nome" />
                <Grid container direction="row" gap={1}>
                    <Grid item xs={8}>
                        <TextField name="parentesco" label="Grau de Parentesco"  /> 
                    </Grid>
                    <Grid item xs>
                        <TextField name="contactoFamiliar" label="Contacto"  />
                    </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}> 
            
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Recorrência
              </Typography>
              <Stack spacing={3} mt={2}>
              <MobileDateTimePicker
                      //{}
                      
                      //onChange={(newValue) => field.onChange(newValue)}
                      label="Início Pretendido"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                <Select name="category" label="Recorrência">
                  {recorrencia.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
              <Autocomplete
                name="week_days"
                multiple
                freeSolo
                onChange={(event, newValue) => {
                 // setValue('week_days', newValue);
                  setSelectedWeekDays(newValue);
                }}
                options={WEEK_DAYS.map((option) => option)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                }
                renderInput={(params) => <TextField label="Dias do Serviço" {...params} />}
              />
           <Grid container direction="row" gap={1}>
            {selectedWeekDays.map((day, index) => (
              <React.Fragment key={day}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {`${day}`}
              </Typography>
                <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={6}>
                    <TimePicker
                        //{...field}
                        //onChange={(newValue) => field.onChange(newValue)}
                        label={`Hora de início`}
                        inputFormat="hh:mm"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                </Grid>
                <Grid item xs={6}>
                <TimePicker
                       // {...field}
                        //onChange={(newValue) => field.onChange(newValue)}
                        label={`Hora de fim`}
                        inputFormat="hh:mm"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                </Grid>
                </Grid>
                {(index + 1) % 2 === 0 ? <Grid item xs={12}/> : null}
              </React.Fragment>
            ))}
          </Grid> 
              </Stack>
              
            </Card>
          </Stack>
        </Grid>
      </Grid>
      </FormProvider>
      </>
    ) }
/*

<Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Ficheiros
              </Typography>

              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.log('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Criar Pedido' : 'Aceitar Pedido'}
              </LoadingButton>

<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Observações
              </Typography>
              <RHFEditor simple name="description" />
              
  <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3} mb={2}>
                  <TextField
                    name="priceSale"
                    label="Orçamento"
                    placeholder="0.00"
                    value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                    onChange={(event) => setValue('price', Number(event.target.value))}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box component="span" sx={{ color: 'text.disabled' }}>
                            €
                          </Box>
                        </InputAdornment>
                      ),
                      type: 'number',
                    }}
                  />
                </Stack>

                <RHFSwitch name="taxes" label="Incluir IVA" />
              </Card>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Aceitar Pedido' : 'Guardar Alterações'}
              </LoadingButton>
            </Stack>




<TextField
                name="price"
                label="Regular Price"
                placeholder="0.00"
                value={getValues('price') === 0 ? '' : getValues('price')}
                onChange={(event) => setValue('price', Number(event.target.value))}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                  type: 'number',
                }}
              />



              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Para quem?
                </Typography>

                <RHFRadioGroup
                  name="gender"
                  options={GENDER_OPTION}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Stack>
              */

