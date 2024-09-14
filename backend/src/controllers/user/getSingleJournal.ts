import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Fetch a single requested journal
 * @param req
 * @param res
 * @returns Returns a PlantJournalType
 */

const getSingleJournal = async (req: Request, res: Response) => {
  const { id } = req.query;

  console.log('QUERY PARAM: ', id);

  try {
    const result = await PlantJournal.findById(id).lean();

    return res
      .status(200)
      .json({ message: 'All user journals retrieved.', data: result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unable to Retrieve User Journals.', data: null });
  }
};

export default getSingleJournal;
