import { renderHook, act } from "@testing-library/react";
import { useMutation } from "@hooks/useMutation";

test("useMutation вызывает мутацию", async () => {
  const mockFn = jest.fn().mockResolvedValue({ success: true });
  const { result } = renderHook(() => useMutation(mockFn));

  await act(async () => {
    await result.current.mutate({ data: "test" });
  });

  expect(mockFn).toHaveBeenCalledWith({ data: "test" });
});
