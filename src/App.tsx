import "./App.css";
import backgroundImg from "assets/xp_background.jpg";
import clsx from "clsx";
import { Desktop } from "components/Desktop";
import { Taskbar } from "components/Taskbar";
import { createContext, useContext, useState } from "react";
import imgPDF from "assets/icons/PDF.png";
import { IWindow } from "components/TaskbarWindow";

const AppContext = createContext<{
  windows: {
    [key: string]: IWindow;
  };
  setWindows: React.Dispatch<
    React.SetStateAction<{
      [key: string]: IWindow;
    }>
  >;
}>({ windows: {}, setWindows: () => {} });

function App() {
  const [windows, setWindows] = useState<{
    [key: string]: IWindow;
  }>({
    resume: {
      id: "resume",
      title: "My Resume",
      position: {
        top: 10,
        left: window?.innerWidth < 600 ? 10 : 130,
      },
      img: imgPDF,
      status: "Normal",
    },
  });

  return (
    <AppContext.Provider
      value={{
        windows,
        setWindows,
      }}
    >
      <div
        className={clsx(
          "min-h-screen w-full flex items-center gap-4 flex-col justify-between max-h-screen h-screen select-none overflow-hidden max-w-[100vw]",
        )}
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "-webkit-fill-available",
        }}
      >
        <Desktop />
        <Taskbar />
      </div>
    </AppContext.Provider>
  );
}

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
