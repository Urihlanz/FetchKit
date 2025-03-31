import { createQuery } from "@/core/api";

beforeAll(() => {
  global.fetch = jest.fn() as jest.Mock;
});

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

test("createQuery делает GET-запрос и возвращает данные", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ id: 1, name: "Alice" }),
  });

  const getUser = createQuery<{ id: string }, { id: number; name: string }>({
    path: "/users/:id",
  });

  const result = await getUser({ id: "1" });

  expect(result).toEqual({ id: 1, name: "Alice" });
  expect(global.fetch).toHaveBeenCalledWith(
    "/users/1",
    expect.objectContaining({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
});
