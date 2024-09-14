import { Request, Response } from 'express';
import PlantJournal from '../../models/PlantJournal.js';

interface AddNoteRequest extends Request {
  body: {
    userId: string;
    journalId: string;
    content: string;
    type: 'text' | 'image';
  };
}

const addNoteToPlantJournal = async (req: AddNoteRequest, res: Response) => {
  const { userId, journalId, content, type } = req.body;

  try {
    const noteToAdd = {
      date: new Date(),
      content,
      type,
    };

    const updatedJournal = await PlantJournal.findOneAndUpdate(
      { _id: journalId, userId: userId },
      { $push: { notes: noteToAdd } },
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      res
        .status(404)
        .json({ message: 'Plant journal not found for this user' });
      return;
    }

    res.status(200).json({
      message: 'Journal note added successfully',
      journal: updatedJournal,
    });
  } catch (error) {
    console.error('Error adding note to plant journal:', error);
    res
      .status(500)
      .json({ message: 'Failed to add note to plant journal', journal: null });
  }
};

export default addNoteToPlantJournal;
