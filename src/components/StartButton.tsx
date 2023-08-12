import clsx from "clsx";
import windowsXpIconImg from "assets/icons/windows_xp_icon.png";

export const StartButton = () => {
  return (
    <button
      className={clsx(
        "h-full bg-[#54ae4c] text-white flex justify-between",
        "items-center gap-1 pl-2 pr-6 rounded-r-xl rounded-l-md",
        "hover:bg-[#54ae4c]/90",
      )}
    >
      <img
        src={windowsXpIconImg}
        alt="Windows XP Icon"
        className="w-auto h-[24px]"
      />
      <span className="font-['Franklin Gothic'] font-bold italic">start</span>
    </button>
  );
};
