import { toast } from 'sonner';

export const showToast = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
) => {
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (error) => {
      if (error?.response) {
        const errorKey = Object.keys(error.response.data)[1];
        const firstErrorKey = Object.keys(error.response.data)[0];
        const errorMessage =
          error.response.data[errorKey] || error.response.data[firstErrorKey];

        if (errorMessage) {
          return errorMessage;
        }
      }
      return messages.error;
    },
  });
};
