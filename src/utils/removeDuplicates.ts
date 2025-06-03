export default function removeDuplicates<T, K extends keyof T>(array: T[], key: K): T[] {
  const seen = new Set<T[K]>();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) {
      return false;
    }
    seen.add(val);
    return true;
  });
}
