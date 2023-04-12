import { add } from 'date-fns';

import _mock from '../_mock';

// ----------------------------------------------------------------------
const CONTINENTS = [
  'Asia',
  'Europe',
  'Africa',
  'Australia',
  'North America',
  'South America',
  'Antarctica',
  'Asia',
  'Europe',
  'Africa',
  'Australia',
  'North America',
  'South America',
  'Antarctica',
  'South America',
  'Antarctica',
];

const teachers = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.name.fullName(index),
  picture: _mock.image.avatar(index),
  courses: 48,
  reviews: 3458,
  students: 18000,
  ratings: 3.5 + index / 10,
}));

const lessons = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  description: _mock.text.sentence(index),
  videoPath: _mock.video(index),
  duration: 60 - index,
  title: `Lesson ${index + 1}`,
  isUnLock: index !== 0 && index !== 1,
}));

export const _courses = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: new Date(),
  slug: _mock.text.courseTitle(index),
  coverImg: _mock.image.course(index),
  category: _mock.text.jobCategories(index),
  description: _mock.text.description(index),
  price: (index % 2 && 159.99) || 269.99,
  priceSale: (index === 2 && 89.99) || (index === 5 && 69.99) || 0,
  lessons,
  teachers,
  quizzes: 100,
  resources: 12,
  totalHours: 100,
  reviews: 3458,
  students: 180000,
  ratings: 3.5 + index / 10,
  bestSeller: index === 2 || false,
  level:
    (index % 2 && 'Intermediate') ||
    (index % 4 && 'Expert') ||
    (index % 5 && 'All Levels') ||
    'Beginner',
  languages: ['Russian', 'Spanish', 'English'],
  skills: ['Photography', 'Design', 'Art', 'History', 'Museums', 'Creativity', 'Art History'],
  learnList: [
    'A fermentum in morbi pretium aliquam adipiscing donec tempus.',
    'Vulputate placerat amet pulvinar lorem nisl.',
    'Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.',
    'Etiam duis lobortis in fames ultrices commodo nibh.',
    'Fusce neque. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit.',
    'Curabitur a felis in nunc fringilla tristique. Praesent congue erat at massa.',
  ],
  shareLinks: _mock.shareLinks,





  heroImg: [
    '/assets/images/travel/travel_post_hero.jpg',
    '/assets/images/travel/travel_post_01.jpg',
    '/assets/images/travel/travel_post_02.jpg',
    '/assets/images/travel/travel_post_03.jpg',
    '/assets/images/travel/travel_post_04.jpg',
  ][index],
  availableStart: add(new Date(), { months: 2 }),
  availableEnd: add(new Date(), { months: 4 }),
  location: _mock.address.country(index),
  continent: CONTINENTS[index],
  duration: '3 days 2 nights',
  favorited: index === 2 || index === 4 || false,
  tourGuide: {
    name: _mock.name.fullName(index),
    role: _mock.role(index),
    picture: _mock.image.avatar(index),
    phoneNumber: _mock.phoneNumber(index),
    quotes: 'Member since Mar 15, 2021',
    verified: true,
    ratings: 5,
    reviews: 345,
    about:
      'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
    shareLinks: _mock.shareLinks,
  },
  includes: [
    { label: 'Audio guide', enabled: true },
    { label: 'Entrance fees', enabled: true },
    { label: 'Food and drinks', enabled: true },
    { label: 'Gratuities', enabled: true },
    { label: 'Lunch', enabled: true },
    { label: 'Pick-up and drop off', enabled: false },
    { label: 'Private tour', enabled: false },
    { label: 'Professional guide', enabled: false },
    { label: 'Special activities', enabled: false },
    { label: 'Transport by air-conditioned', enabled: false },
  ],
  gallery: [...Array(6)].map((__, itemIndex) => _mock.image.travel(itemIndex + 2)),
  highlights: [...Array(6)].map((__, itemIndex) => _mock.text.sentence(itemIndex)),
  program: [...Array(3)].map((__, itemIndex) => ({
    label: `Day ${itemIndex + 1}`,
    text: _mock.text.description(itemIndex),
  })),
 


}));


// ----------------------------------------------------------------------

const CATEGORY_NAMES = [
  'Python',
  'Design',
  'History',
  'Photoshop',
  'Management',
  'Cyber Security',
  'Web Development',
  'Machine Learning',
  'Photography',
];

export const _coursesByCategories = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  name: CATEGORY_NAMES[index],
  students: 101 + index,
}));
