import { XYCoord, useDrag, useDrop } from "react-dnd";
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import imgIconMyComputer from "assets/icons/MyComputer.png";
import imgIconRecycle from "assets/icons/RecycleBin.png";
import imgIconMyDocuments from "assets/icons/Documents.png";
import imgIconNotepad from "assets/icons/Notepad.png";
import { DesktopIcon } from "components/DesktopIcon";
// import imgIconFolder from "assets/icons/Folder.png";

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

  return (
    <div ref={drop} className="flex-1 w-full h-full">
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
    </div>
  );
};
