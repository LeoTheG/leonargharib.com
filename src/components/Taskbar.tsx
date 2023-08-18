import { StartButton } from "components/StartButton";

export const Taskbar = () => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full bg-[#3e74f0] h-[34px] z-10"
        style={{
          boxShadow: "inset 0px 0px 4px 0 rgba(255,255,255,0.8)",
        }}
      >
        <StartButton />
      </div>
    </div>
  );
};
