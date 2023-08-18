import { useAppContext } from "App";
import { StartButton } from "components/StartButton";
import { TaskbarWindow } from "components/TaskbarWindow";
import imgTaskbar from "assets/Taskbar.png";

export const Taskbar = () => {
  const { windows } = useAppContext();
  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full h-[34px] z-10 flex gap-4"
        style={{
          backgroundImage: `url(${imgTaskbar})`,
        }}
      >
        <StartButton />
        <div className="flex py-[0.30rem]">
          {Object.keys(windows).map((key) => {
            const window = windows[key];
            if (window.status === "Close") return null;
            return <TaskbarWindow key={window.id} window={window} />;
          })}
        </div>
      </div>
    </div>
  );
};
