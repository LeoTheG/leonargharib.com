import clsx from "clsx";
import windowsXpIconImg from "assets/icons/windows_xp_icon.png";
import { useRef, useState } from "react";
import { StartMenu } from "./StartMenu";

export const StartButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        ref={buttonRef}
        className={clsx(
          "h-full bg-[#54ae4c] text-white flex justify-between",
          "items-center gap-1 pl-2 pr-6 rounded-r-xl ",
          "hover:brightness-[1.1]",
        )}
        style={{
          backgroundColor: isMenuOpen ? "#188B18" : undefined,
        }}
        onClick={() => {
          console.log("clicked start button");
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <img
          src={windowsXpIconImg}
          alt="Windows XP Icon"
          className="w-auto h-[20px]"
        />
        <span
          className="font-['Franklin Gothic'] font-bold italic"
          style={{
            textShadow: "black 0px 0px 5px",
          }}
        >
          start
        </span>
      </button>
      <StartMenu
        isOpen={isMenuOpen}
        onClickOutside={(target) => {
          const clickedStartButton = buttonRef.current?.contains(target);
          if (!clickedStartButton) {
            setIsMenuOpen(false);
          }
        }}
      />
    </>
  );
};
