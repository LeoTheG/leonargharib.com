import clsx from "clsx";
import windowsXpIconImg from "assets/icons/windows_xp_icon.png";

export const StartButton = () => {
  return (
    <button
      className={clsx(
        "h-full bg-[#54ae4c] text-white flex justify-between",
        "items-center gap-1 pl-2 pr-6 rounded-r-xl rounded-l-md",
        "hover:brightness-[1.1]",
      )}
      style={{
        boxShadow: "inset 0px 0px 2px 0 rgba(255,255,255,0.8)",
      }}
    >
      <img
        src={windowsXpIconImg}
        alt="Windows XP Icon"
        className="w-auto h-[24px]"
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
  );
};
