export async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<T> {
  const response = await fetch(input, init);
  return await response.json();
}
