import { MutationConfig, QueryConfig } from "@/types";
import cache from "./cache";

// Основная функция для создания запроса
export const createQuery = <TInput extends Record<string, unknown>, TOutput>(
  config: QueryConfig<TInput, TOutput>
) => {
  return async (params: TInput): Promise<TOutput> => {
    const cacheKey = `${config.path}-${JSON.stringify(params)}`;

    // Проверяем кеш для GET-запросов
    if (config.method === "GET" || !config.method) {
      const cachedData = cache.get<TOutput>(cacheKey);
      if (cachedData) return cachedData;
    }

    // Заменяем :param в path на значения из params
    const resolvedPath = config.path.replace(/:(\w+)/g, (_, key) =>
      String(params[key as keyof TInput])
    );

    // Делаем запрос
    const response = await fetch(resolvedPath, {
      method: config.method || "GET",
      headers: { "Content-Type": "application/json" },
      body: config.method !== "GET" ? JSON.stringify(params) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as TOutput;

    // Кешируем GET-запросы
    if (config.method === "GET" || !config.method) {
      cache.set(cacheKey, data);
    }

    return data;
  };
};

export const createMutation = <TInput, TOutput>(config: MutationConfig<TInput, TOutput>) => {
  return async (input: TInput): Promise<TOutput> => {
    try {
      const headers = typeof config.headers === "function" ? config.headers(input) : config.headers;

      const response = await fetch(config.path, {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw await response.json();
      }

      const data = (await response.json()) as TOutput;
      config.onSuccess?.(data);
      return data;
    } catch (error) {
      config.onError?.(error);
      throw error;
    }
  };
};
