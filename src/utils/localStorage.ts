export const setItem = (key: string, value: string | null) => {
    if (key !== null && value !== null) {
      localStorage.setItem(`${key}` , value);
    } else {
      localStorage.removeItem(`${key}`);
    }
  };