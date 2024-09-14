/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlantJournalType } from '@/types';
import { axiosForApiCall } from './axios';
import { toast } from 'sonner';

async function getSingleJournal(journalId: string) {
  try {
    const res = await axiosForApiCall.get(`/user/journal?id=${journalId}`);
    return res.data.data as PlantJournalType;

    // Catch Error
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Connectivity error. Check your network.');
    }
    return undefined;
  }
}

export default getSingleJournal;
