import { Request, Response } from 'express';
import Fact from '../../models/Fact.js';

const getDailyPlantFact = async (req: Request, res: Response) => {
  const dateString = new Date().toISOString().split('T')[0];

  // Query for documents with timestamp that starts
  // with Today's Date
  const query = {
    timestamp: {
      $regex: `^${dateString}`,
    },
  };
  try {
    const results = await Fact.find(query);

    if (results.length === 0) throw new Error();

    return res.status(200).json(results[0]);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unable to retrieve daily plant fact. ' });
  }
};

export default getDailyPlantFact;
