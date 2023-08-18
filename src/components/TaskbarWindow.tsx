import { useAppContext } from "App";

export interface IWindow {
  id: string;
  title: string;
  position: { top: number; left: number };
  img: string;
  status: "Minimize" | "Maximize" | "Close" | "Normal";
}
export const TaskbarWindow = ({ window: windowProp }: { window: IWindow }) => {
  const { windows, setWindows } = useAppContext();
  const { img, title, status } = windowProp;
  const handleClick = () => {
    setWindows({
      ...windows,
      [windowProp.id]: {
        ...windowProp,
        status: status === "Minimize" ? "Normal" : "Minimize",
      },
    });
  };
  return (
    <div
      className="h-full w-[200px] bg-[#397DF3] flex items-center gap-2 text-white text-[0.75rem] pl-2 hover:brightness-[110%]"
      style={{
        backgroundColor: status === "Minimize" ? "#174DB9" : undefined,
      }}
      onClick={handleClick}
    >
      <img src={img} alt="taskbar window" className="w-4 h-4" />
      <div>{title}</div>
    </div>
  );
};
