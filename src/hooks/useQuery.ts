import { useState, useEffect } from "react";

// Типы для возвращаемого значения хука
type QueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useQuery = <TInput extends Record<string, unknown>, TOutput>(
  queryFn: (params: TInput) => Promise<TOutput>,
  params: TInput
): QueryResult<TOutput> => {
  const [data, setData] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setIsLoading(true);
    queryFn(params)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]); // Реагируем на изменение params

  return { data, isLoading, error, refetch: fetchData };
};
