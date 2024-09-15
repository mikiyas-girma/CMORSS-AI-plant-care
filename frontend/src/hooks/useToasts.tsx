// Define Toast took that returns
// The different toast types.

import { useMemo } from 'react';
import { toast } from 'sonner';

const useToasts = () => {
  const toastSuccess = toast.success;
  const toastError = toast.error;
  const toastInfo = toast.info;
  const toastWarning = toast.warning;

  const data = useMemo(
    () => ({ toastSuccess, toastError, toastInfo, toastWarning }),
    [toastError, toastInfo, toastSuccess, toastWarning]
  );

  //   Return the functions
  return data;
};

export default useToasts;
