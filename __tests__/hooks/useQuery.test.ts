import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@hooks/useQuery";
import { createQuery } from "@core/api";

beforeEach(() => {
  global.fetch = jest.fn();
});

test("должен правильно обрабатывать успешный запрос", async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ id: 1, name: "Test User" }),
  });

  const testQuery = createQuery<{ id: string }, { id: number; name: string }>({
    path: "/users/:id",
  });

  const { result } = renderHook(() => useQuery(testQuery, { id: "1" }));

  expect(result.current.isLoading).toBe(true);
  expect(result.current.data).toBeNull();

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ id: 1, name: "Test User" });
  });
});
