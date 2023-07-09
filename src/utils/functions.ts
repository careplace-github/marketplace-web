export default function isObjectEmpty(obj: any): boolean {
  const values = Object.values(obj);

  for (let value of values) {
    if (value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        if (!isObjectEmpty(value)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
}
