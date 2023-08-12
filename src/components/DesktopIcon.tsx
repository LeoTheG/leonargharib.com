import { CSSProperties } from "react";
import { useDrag } from "react-dnd";

export const DesktopIcon = ({
  img,
  title,
  position: { top, left },
  id,
}: {
  img: string;
  title: string;
  position: { top: number; left: number };
  id: string;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "desktop-icon",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  return (
    <div
      className="flex flex-col items-center gap-1"
      ref={drag}
      style={{
        ...dragStyle,
        left,
        top,
        transform: "translate(0,0)",
        cursor: "default",
      }}
    >
      <img
        src={img}
        alt={title}
        className="w-[48px] h-[48px]"
        style={{
          filter: isDragging ? "brightness(0.8)" : "none",
        }}
      />
      <span
        className="p-[1px] text-xs text-white"
        style={{
          textShadow: "black 0px 0px 5px",
          background: isDragging ? "#316AC5" : "transparent",
          border: isDragging ? "1px #eee dashed" : "none",
        }}
      >
        {title}
      </span>
    </div>
  );
};

const dragStyle: CSSProperties = {
  position: "absolute",
  cursor: "move",
};
