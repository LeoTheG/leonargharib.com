import { useAppContext } from "App";
import { StartButton } from "components/StartButton";
import { TaskbarWindow } from "components/TaskbarWindow";
import imgTaskbar from "assets/Taskbar.png";
import React, { useState, useEffect } from "react";

export const Taskbar = () => {
  const { windows } = useAppContext();
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update the time every minute

    return () => clearInterval(timer); // Clear the interval when the component unmounts
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full h-[34px] z-10 flex gap-4 justify-between"
        style={{
          backgroundImage: `url(${imgTaskbar})`,
        }}
      >
        <StartButton />
        <div className="flex-1">
          <div className="flex py-[0.30rem] gap-1 h-full">
            {Object.keys(windows).map((key) => {
              const window = windows[key];
              if (window.status === "Close") return null;
              return <TaskbarWindow key={window.id} window={window} />;
            })}
          </div>
        </div>

        <div className="pl-8 p-2 flex justify-center items-center text-white text-xs bg-[#639af8]">
          <div>{currentTime}</div>
        </div>
      </div>
    </div>
  );
};

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes: any = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const timeStr = hours + ":" + minutes + " " + ampm;
  return timeStr;
}
