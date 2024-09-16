/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosForApiCall } from './axios';
import { toast } from 'sonner';

async function deleteJournal(journalId: string) {
  try {
    await axiosForApiCall.delete(`/user/journal/delete?id=${journalId}`);
    return true;

    // Catch Error
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Connectivity error. Check your network.');
    }
    return false;
  }
}

export default deleteJournal;
