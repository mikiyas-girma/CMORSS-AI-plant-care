import { z } from 'zod';

// Define Journal Form Schema
export const journalFormSchema = z.object({
  title: z.string().min(10).max(66),
  name: z.string().min(3).max(20),
  species: z.string(),
  //   dateAcquired: z.date(),
  //   location: z.enum(['Indoor', 'Outdoor', 'Greenhouse', 'Farmland']),
  //   health: z.enum(['Excellent', 'Good', 'Fair', 'Poor']),
  message: z.string().min(15),
});

export const journalDefault = {
  title: '',
  name: '',
  species: '',
  //   location: 'Outdoor',
  //   health: 'Excellent',
  message: '',
  //   dateAcquired: '',
};

export const journalFields = [
  {
    name: 'title',
    placeholder: 'Title of the journal',
    label: 'Journal Title',
  },
  {
    name: 'name',
    placeholder: 'Enter Plant Name',
    label: 'Plant Name',
  },
  {
    name: 'species',
    placeholder: 'Species of the Plant',
    label: 'Species (Optional)',
  },
  //   {
  //     name: 'location',
  //     placeholder: 'Where is the plant kept?',
  //     label: 'Location',
  //   },
  // {
  //   name: 'message',
  //   placeholder: 'Enter the first entry',
  //   label: 'Initial Message',
  // },
];
