import { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import {
  ContextMenu,
  contextMenuItemsDesktopIcon,
} from "components/ContextMenu";

interface IDesktopIconProps {
  img: string;
  title: string;
  position: { top: number; left: number };
  id: string;
  isSelected: boolean;
  onClicked: () => void;
  isContextMenuOpen: boolean;
  contextMenuPosition: { top: number; left: number };
  onContextMenu?: (e: any) => void;
  onDoubleClicked?: () => void;
  onClickContextMenuItem: (item: any) => void;
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
  onContextMenu,
  onDoubleClicked,
  onClickContextMenuItem,
}: IDesktopIconProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "desktop-icon",
      item: { id, left, top, isDesktopIcon: true },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  return (
    <>
      <div
        className="flex flex-col items-center gap-1 w-[100px] overflow-x-hidden"
        ref={drag}
        style={{
          ...dragStyle,
          left,
          top,
          transform: "translate(0,0)",
        }}
        onClick={(e) => {
          if (window.innerWidth < 700) {
            if (onContextMenu) {
              onContextMenu(e);
              return;
            }
          }
          if (e.detail === 1) {
            onClicked();
          } else if (onDoubleClicked) {
            onDoubleClicked();
          }
          e.stopPropagation();
          e.preventDefault();
        }}
        onContextMenu={onContextMenu}
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
        <div
          className="p-[0 1px] text-xs text-white text-center max-w-[90px] flex"
          style={{
            textShadow: "black 0px 0px 5px",
            background:
              isDragging || isSelected ? "hsl(var(--primary))" : "transparent",
          }}
        >
          {title}
        </div>
      </div>

      <ContextMenu
        isContextMenuOpen={isContextMenuOpen}
        contextMenuPosition={contextMenuPosition}
        contextMenuItems={contextMenuItemsDesktopIcon}
        onClickItem={onClickContextMenuItem}
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
    <div ref={ref}>
      <DesktopIconWithoutContextMenu
        {...props}
        isSelected={isSelected}
        onClicked={() => {
          setIsSelected(true);
        }}
        isContextMenuOpen={isMenuOpen}
        contextMenuPosition={contextMenuPosition}
        onClickContextMenuItem={(item) => {
          props.onClickContextMenuItem(item.label);
          setIsMenuOpen(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsSelected(true);
          setIsMenuOpen(true);
          setContextMenuPosition({ left: e.clientX, top: e.clientY });
        }}
      />
    </div>
  );
};
