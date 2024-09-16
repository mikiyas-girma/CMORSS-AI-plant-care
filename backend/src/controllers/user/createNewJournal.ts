import { Request, Response } from 'express';
import { PlantJournalType } from '../../types/models/plantjournal.types.js';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Create New Journal Modal
 * @param req
 * @param res
 * @returns Success message
 */

const createNewJournal = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { title, name, species, dateAcquired, location, health, message } =
    req.body as PlantJournalType & { message: string };

  const data = {
    name,
    title,
    species,
    dateAcquired,
    location,
    health,
    userId,
    notes: [{ date: new Date(), content: message }],
    images: [],
    careHistory: [],
  };

  try {
    const results = await PlantJournal.create(data);
    console.log(results);

    return res.status(200).json({ message: 'Journal created successfully.' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: 'Unable to create journal with data.' });
  }
};

export default createNewJournal;
