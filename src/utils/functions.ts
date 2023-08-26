export default function isObjectEmpty(obj: any): boolean {
  return Object.values(obj).every((value) => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return isObjectEmpty(value);
    }
    return false;
  });
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength)}...`;
}
