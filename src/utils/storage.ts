export const setItem = (item: string) => {
    if (item) {
      localStorage.setItem(`${item}` , item);
    } else {
      localStorage.removeItem(`${item}`);
    }
  };