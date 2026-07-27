export function useJson(data: string | null | undefined) {
  return useMemo(() => {
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON', e);
      return null;
    }
  }, [data])
}