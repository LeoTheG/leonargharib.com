import clsx from "clsx";
import { useEffect, useRef } from "react";

export const StartMenu = ({
  isOpen,
  onClickOutside,
}: {
  isOpen: boolean;
  onClickOutside: (eventTarget: any) => void;
}) => {
  const ref = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside(event.target);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "px-[4px] py-[2px] bg-primary z-[1000] absolute flex-col w-[400px]",
        "h-[600px] bottom-[37px] left-0",
      )}
      style={{
        display: isOpen ? "flex" : "none",
        boxShadow: "3px 1px 0px 0 rgba(0,0,0,0.8)",
      }}
    ></div>
  );
};
