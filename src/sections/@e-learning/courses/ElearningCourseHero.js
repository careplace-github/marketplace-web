import PropTypes from 'prop-types';
// icons
import documentIcon from '@iconify/icons-carbon/document';
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';


// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Divider, Container, Grid, Chip, Avatar, TextField, Card, Autocomplete, Select, Button } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils

import { getLevelIcon } from '../../../utils/getIcon';

// components
import {  Breadcrumbs,  TextIconLabel, Iconify } from '../../../components';
import { MobileDateTimePicker, TimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

ElearningCourseHero.propTypes = {
  course: PropTypes.shape({
    learnList: PropTypes.array,
    bestSeller: PropTypes.bool,
    category: PropTypes.string,
    coverImg: PropTypes.string,
    description: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    lessons: PropTypes.array,
    level: PropTypes.string,
    quizzes: PropTypes.number,
    ratings: PropTypes.number,
    reviews: PropTypes.number,
    slug: PropTypes.string,
    students: PropTypes.number,
    teachers: PropTypes.array,
    totalHours: PropTypes.number,
  }),
};

export default function ElearningCourseHero({ course }) {
  const {
    slug,
    level,
    learnList,
    quizzes,
    lessons,
    category,
    languages,
    bestSeller,
    totalHours,
    description,
    reviews,
    students,
    teachers = [],
  } = course;

  /*
  {teachers?.length > 0 && (
                      <Link underline="always" color="text.secondary" variant="body2">
                        + {teachers?.length} teachers
                      </Link>
                    )}
  */
  const WEEK_DAYS = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    "Domingo",
  ];
  const recorrencia = [
    {classify:['Sem Recorrência', 'Semanal', 'Quinzenal']}
  ]
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);

  return (
    <RootStyle>
      <Container>
        <Breadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Empresas SAD', href: Routes.eLearning.courses },
            { name: course.slug || '' },
          ]}
          
          sx={{ mb: 8 }}
        />

        <Grid
          container
          rowSpacing={{ xs: 6, md: 0 }}
          columnSpacing={{ md: 10 }}
          direction="row-reverse"
        >
          <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}> 
            
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
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
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
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
            <Button>Submeter Pedido</Button>
          </Grid> 
              </Stack>
              
            </Card>
          </Stack>
        </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography variant="h3" component="h1">
                  {slug}
                </Typography>
                <Typography variant="overline" sx={{ color: 'secondary.main' }}>
                  {category}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
              </Stack>

              <TextIconLabel
                icon={<Avatar src={teachers[0]?.picture} />}
                value={
                  <>
                    <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
                      {teachers[0]?.name}
                    </Typography>
                  </>
                }
              />
              

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack spacing={2}>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  sx={{
                    '& > *': { my: 0.5, mr: 3 },
                  }}
                >
                  <TextIconLabel
                    icon={<Iconify icon={documentIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
                    value={`${lessons?.length} Serviços`}
                  />
                  <TextIconLabel icon={getLevelIcon(level)} value={level} />
                  <TextIconLabel
                    icon={
                      <Iconify
                        icon={contentDeliveryNetwork}
                        sx={{ width: 20, height: 20, mr: 1 }}
                      />
                    }
                    value={typeof languages === 'string' ? languages : languages?.join(', ')}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
