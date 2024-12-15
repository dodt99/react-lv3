import { useEffect, useLayoutEffect, useRef } from "react";

const useClickOutside = (ref, handler) => {
  const savedHandler = useRef(handler);

  useLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        savedHandler.current(e);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref]);
};

export default useClickOutside;
