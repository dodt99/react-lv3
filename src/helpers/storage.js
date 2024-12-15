export const getLocalStorageItem = (key) => {
  const rawValue = window.localStorage.getItem(key);

  if (rawValue === "undefined") {
    return undefined;
  }
  if (rawValue === "null") {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return rawValue;
  }
};

export const setLocalStorageItem = (key, value) => {
  window.localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  );
};

export const removeLocalStorageItem = (key) => {
  window.localStorage.removeItem(key);
};
