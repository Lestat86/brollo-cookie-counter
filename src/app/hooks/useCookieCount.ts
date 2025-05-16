import useSWR from 'swr'

const fetcher = (url: string, opts?: RequestInit) =>
  fetch(url, opts).then(r => r.json())

export function useCookieCounts() {
  const { data, mutate, error } = useSWR('/api/counts', fetcher, {
    revalidateOnFocus: true,
  })

  const update = async (cls: string, action: 'inc'|'dec') => {
    const json = await fetcher(`/api/counts/${cls}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })

    mutate({ ...data, ...json }, false)
  }

  return {
    counts: data ?? { Azzurri:0, Gialli:0, Rossi:0 },
    inc:  (cls: string) => update(cls, 'inc'),
    dec:  (cls: string) => update(cls, 'dec'),
    isLoading: !error && !data,
    isError: error,
  }
}
