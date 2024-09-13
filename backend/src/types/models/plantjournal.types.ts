export type PlantJournalType = {
  name: string;
  title: string;
  userId: string;
  species: string;
  dateAcquired: Date;
  location: 'Indoor' | 'Outdoor' | 'Greenhouse' | 'Farmland';
  health: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  notes: { date: Date; content: string }[];
  images: { url: string; date: Date }[];
  careHistory: {
    action:
      | 'Watered'
      | 'Fertilized'
      | 'Pruned'
      | 'Repotted'
      | 'Treated for Pests';
  }[];
  updatedAt: Date;
};
