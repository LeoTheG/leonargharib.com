import { XYCoord, useDrop } from "react-dnd";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import imgIconMyComputer from "assets/icons/MyComputer.png";
import imgIconRecycle from "assets/icons/RecycleBin.png";
import imgIconMyDocuments from "assets/icons/Documents.png";
import imgIconNotepad from "assets/icons/Notepad.png";
import imgIconInternetExplorer from "assets/icons/InternetExplorer.png";
import { DesktopIcon } from "components/DesktopIcon";
// import { ContextMenu, contextMenuItemsDesktop } from "./ContextMenu";

const initialDesktopIcons = [
  {
    img: imgIconMyComputer,
    title: "My Computer",
    position: { top: 10, left: 10 },
    id: "my-computer",
  },
  {
    img: imgIconMyDocuments,
    title: "My Documents",
    position: { top: 100, left: 10 },
    id: "my-documents",
  },
  {
    img: imgIconRecycle,
    title: "Recycle Bin",
    position: { top: 190, left: 10 },
    id: "recycle-bin",
  },
  {
    img: imgIconNotepad,
    title: "Notepad",
    position: { top: 10, left: 100 },
    id: "notepad",
  },
  {
    img: imgIconInternetExplorer,
    title: "Internet Explorer",
    position: { top: 100, left: 80 },
    id: "internet-explorer",
  },
];

export const Desktop: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [desktopIcons, setDesktopIcons] = useState(
    initialDesktopIcons.reduce<{
      [key: string]: (typeof initialDesktopIcons)[0];
    }>((acc, icon) => {
      acc[icon.id] = icon;
      return acc;
    }, {}),
  );

  const moveIcon = useCallback(
    (id: string, left: number, top: number) => {
      setDesktopIcons((desktopIcons) => {
        return {
          ...desktopIcons,
          [id]: {
            ...desktopIcons[id],
            position: { left, top },
          },
        };
      });
    },
    [setDesktopIcons],
  );

  useEffect(() => {
    const onClickOutside = (target: any) => {
      // setIsMenuOpen(false);
    };
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("CLICKED OUTSIDE");
        onClickOutside(event.target);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, []);

  const [, drop] = useDrop(
    () => ({
      accept: "desktop-icon",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveIcon(item.id, left, top);
        return undefined;
      },
    }),
    [moveIcon],
  );

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<any>(null);
  // const [contextMenuPosition, setContextMenuPosition] = useState({
  //   left: 0,
  //   top: 0,
  // });

  return (
    <div
      ref={drop}
      className="flex-1 w-full h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        // setIsMenuOpen(true);
        // setContextMenuPosition({ left: e.clientX, top: e.clientY });
      }}
    >
      {Object.keys(desktopIcons).map((key) => {
        const icon = desktopIcons[key];
        return (
          <DesktopIcon
            key={key}
            id={key}
            img={icon.img}
            title={icon.title}
            position={icon.position}
          />
        );
      })}

      {/* <ContextMenu
        isContextMenuOpen={isMenuOpen}
        contextMenuPosition={contextMenuPosition}
        contextMenuItems={contextMenuItemsDesktop}
      /> */}
    </div>
  );
};
