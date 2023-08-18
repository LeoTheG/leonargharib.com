import { useDrag } from "react-dnd";
import imgIconMinimize from "assets/icons/Minimize.png";
import imgIconMaximize from "assets/icons/Maximize.png";
import imgIconClose from "assets/icons/Close.png";
import { BlueHorizontal } from "components/BlueHorizontal";
import { IWindow } from "./TaskbarWindow";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

interface IApplicationWindowProps {
  window: IWindow;
  onClick: (buttonType: "Minimize" | "Maximize" | "Close") => void;
  className?: string;
}

export const ApplicationWindow: React.FC<
  PropsWithChildren<IApplicationWindowProps>
> = ({ window: windowProp, onClick, children, className }) => {
  const { id, img, title } = windowProp;
  const { left, top } = windowProp.position;

  const [, drag] = useDrag(
    () => ({
      type: "application",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );
  return (
    <div
      className={clsx(
        className,
        "flex flex-col w-[900px] max-w-[calc(100%-25px)]",
        "h-[510px] md:h-[783px] max-h-[calc(100%-25px)] border-2 border-blue-700",
        "border-solid rounded-tr-lg rounded-tl-lg absolute cursor-move",
      )}
      style={{
        left,
        top,
        transform: "translate(0,0)",
      }}
    >
      <BlueHorizontal>
        <div className="flex justify-between w-full" ref={drag}>
          <div className="flex flex-row gap-2">
            <img src={img} alt="PDF" className="w-5 h-5" />
            <div className="text-white text-[0.8rem]">{title}</div>
          </div>

          <div className="flex flex-row gap-1 pr-1">
            {[
              { name: "Minimize", img: imgIconMinimize },
              { name: "Maximize", img: imgIconMaximize },
              { name: "Close", img: imgIconClose },
            ].map(({ name, img }) => (
              <img
                key={name}
                src={img}
                alt={name}
                className="w-5 h-5 hover:filter hover:brightness-125"
                onClick={() => onClick(name as any)}
              />
            ))}
          </div>
        </div>
      </BlueHorizontal>
      {children}
    </div>
  );
};
