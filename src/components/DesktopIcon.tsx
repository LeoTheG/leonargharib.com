import { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ContextMenu } from "components/ContextMenu";

interface IDesktopIconProps {
  img: string;
  title: string;
  position: { top: number; left: number };
  id: string;
  isSelected: boolean;
  onClicked: () => void;
  isContextMenuOpen: boolean;
  contextMenuPosition: { top: number; left: number };
}

const DesktopIconWithoutContextMenu = ({
  img,
  title,
  position: { top, left },
  id,
  isSelected,
  onClicked,
  isContextMenuOpen,
  contextMenuPosition,
}: IDesktopIconProps) => {
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
    <>
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
        onClick={(e) => {
          onClicked();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <img
          src={img}
          alt={title}
          className="w-[48px] h-[48px]"
          style={{
            filter: isDragging || isSelected ? "brightness(0.8)" : "none",
            userSelect: "none",
          }}
        />
        <span
          className="p-[0 1px] text-xs text-white"
          style={{
            textShadow: "black 0px 0px 5px",
            background: isDragging || isSelected ? "#316AC5" : "transparent",
          }}
        >
          {title}
        </span>
      </div>

      <ContextMenu
        isContextMenuOpen={isContextMenuOpen}
        contextMenuPosition={contextMenuPosition}
      />
    </>
  );
};

const dragStyle: CSSProperties = {
  position: "absolute",
  cursor: "move",
};

export const DesktopIcon = (
  props: Omit<
    IDesktopIconProps,
    "isSelected" | "onClicked" | "isContextMenuOpen" | "contextMenuPosition"
  >,
) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<any>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    if (!isSelected) {
      setIsMenuOpen(false);
    }
  }, [isSelected]);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsSelected(true);
        setIsMenuOpen(true);
        setContextMenuPosition({ left: e.clientX, top: e.clientY });
      }}
    >
      <DesktopIconWithoutContextMenu
        {...props}
        isSelected={isSelected}
        onClicked={() => {
          setIsSelected(true);
        }}
        isContextMenuOpen={isMenuOpen}
        contextMenuPosition={contextMenuPosition}
      />
    </div>
  );
};
