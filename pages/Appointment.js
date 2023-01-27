import React, { useState } from 'react';
import { Grid, TextField, Card, Stack, Typography, Autocomplete, Chip, Select, Container, Button } from '@mui/material';
import {  FormProvider } from 'react-hook-form';
import { MobileDateTimePicker, TimePicker } from '@mui/lab';

// @mui
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
import Footer from '../src/layouts/footer/Footer';


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
 

// ----------------------------------------------------------------------

export default function AppointmentPage() {
  return (
    <Page title="Novo Pedido">
      <Container style={{marginTop:'5%', marginBottom:'30px'}}>
        <MyPage />        
      </Container>
      <Footer />
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
      <Typography variant='h3' style={{paddingBottom:'10px'}} > Novo Pedido </Typography>
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
                        <TextField name="name" label="Nome" variant='outlined'/> 
                    </Grid>
                    <Grid item xs>
                        <TextField name="phoneNumber" label="Contacto" variant='outlined' />
                    </Grid>
                </Grid>
                <TextField name="address" label="Morada" variant='outlined' />
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
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option}  />
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
                  variant='outlined'
                />
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Informações do Familiar
                </Typography>
                <TextField name="familyMember" label="Nome" variant='outlined'/>
                <Grid container direction="row" gap={1}>
                    <Grid item >
                        <TextField name="parentesco" label="Grau de Parentesco" variant='outlined' /> 
                    </Grid>
                    <Grid item >
                        <TextField name="contactoFamiliar" label="Contacto" variant='outlined' />
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
                      renderInput={(params) => <TextField {...params} fullWidth variant='outlined'/>}
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
              <Button href='/checkout'>Checkout</Button>
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

