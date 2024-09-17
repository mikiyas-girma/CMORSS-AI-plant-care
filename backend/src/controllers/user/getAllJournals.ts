import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Fetch All Journals made the the user
 * @param req
 * @param res
 * @returns Returns an array of the journal and message
 */

const getAllJournals = async (req: Request, res: Response) => {
  //   Retreive user identification from cookies or header.
  const userId = req.user?._id;

  try {
    const result = await PlantJournal.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: '$_id',
          title: 1,
          messageCount: { $size: '$notes' },
          lastUpdate: '$updatedAt',
        },
      },
      { $sort: { lastUpdate: -1 } },
    ]);

    return res
      .status(200)
      .json({ message: 'All user journals retrieved.', data: result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unable to Retrieve User Journals.', data: null });
  }
};

export default getAllJournals;
