// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryConfig<TInput, TOutput> = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  cacheTime?: number; // Время жизни кеша в ms (опционально)
  validate?: (response: unknown) => TOutput;
};

export type MutationConfig<TInput, TOutput> = {
  path: string;
  method: "POST" | "PUT" | "DELETE";
  headers?: Record<string, string> | ((input: TInput) => Record<string, string>);
  onSuccess?: (data: TOutput) => void;
  onError?: (error: unknown) => void;
};
