import { useLayoutEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "../helpers/storage";

export const useStorageSelector = (key) => {
  const [value, setValue] = useState(getLocalStorageItem(key));

  useLayoutEffect(() => {
    setValue(getLocalStorageItem(key));

    const handleStorageChange = (e) => {
      if (e && (e.key === null || e.key === key)) {
        setValue(getLocalStorageItem(key));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key]);

  return value;
};

export const useStorageDispatch = () => {
  const dispatch = (key, value) => {
    setLocalStorageItem(key, value);
    window.dispatchEvent(new StorageEvent("local-storage", { key }));
  };

  return dispatch;
};
