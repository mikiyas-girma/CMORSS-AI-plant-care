import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

/**
 * Deletes a single requested journal
 * @param req
 * @param res
 * @returns Returns a success message
 */
const deleteJournal = async (req: Request, res: Response) => {
  const { id: _id } = req.query;
  const userId = req.user?._id;

  try {
    const result = await PlantJournal.findOneAndDelete({ _id, userId });
    if (!result) throw new Error();
    return res.status(200).json({ message: 'Journal deleted successfully.' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Unable to delete requested journal.' });
  }
};

export default deleteJournal;
