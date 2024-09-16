import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Fetch Three Most Recent updated journals
 * @param req
 * @param res
 * @returns Returns an array of the journal and message
 */

const getRecentJournals = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const recentJournals = await PlantJournal.find({ userId })
      .select(['_id', 'title', 'updatedAt'])
      .sort({ updatedAt: -1 })
      .limit(3);

    if (!recentJournals) throw new Error();

    return res.status(200).json({
      message: 'Top three journals retrieved',
      journals: recentJournals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Unable to retrieve user journals',
      journals: [],
    });
  }
};

export default getRecentJournals;
