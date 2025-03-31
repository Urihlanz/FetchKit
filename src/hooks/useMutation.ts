import { useState, useCallback } from "react";

export const useMutation = <TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<TOutput>,
  config?: {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const [data, setData] = useState<TOutput | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await mutationFn(input);
        setData(result);
        setError(null);
        config?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        config?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, config]
  );

  return { mutate, data, error, isLoading };
};
