import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Fetch a single requested journal
 * @param req
 * @param res
 * @returns Returns a PlantJournalType
 */

const getSingleJournal = async (req: Request, res: Response) => {
  const { id: _id } = req.query;
  const userId = req.user?._id;

  try {
    const result = await PlantJournal.findOne({ _id, userId });

    if (!result) throw new Error();

    return res
      .status(200)
      .json({ message: 'Journal retrieved.', data: result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unable to retrieve requested journal.', data: null });
  }
};

export default getSingleJournal;
