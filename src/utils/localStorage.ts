export const setItem = (key: string, value: string | null) => {
  if (key !== null && value !== null) {
    localStorage.setItem(`${key}`, value);
  } else {
    localStorage.removeItem(`${key}`);
  }
};

export const getItem = (key: string) => localStorage.getItem(key);

// Example of getCookie implementation
export function getCookie(name: string): string {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return '';
}

// Example of setCookie implementation
export function setCookie(name: string, value: string, days: number = 7): void {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}
