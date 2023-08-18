import { XYCoord, useDrop } from "react-dnd";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";

import imgIconMyComputer from "assets/icons/MyComputer.png";
import imgIconRecycle from "assets/icons/RecycleBin.png";
import imgIconMyDocuments from "assets/icons/Documents.png";
import imgIconNotepad from "assets/icons/Notepad.png";
import imgIconInternetExplorer from "assets/icons/InternetExplorer.png";
import imgPDF from "assets/icons/PDF.png";
import { DesktopIcon } from "components/DesktopIcon";
import { ContextMenu, contextMenuItemsDesktop } from "./ContextMenu";
import { PDFReader } from "./PDFReader";

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
    position: { top: 100, left: 100 },
    id: "internet-explorer",
  },
  {
    img: imgPDF,
    title: "My Resume",
    position: { top: 190, left: 100 },
    id: "resume",
  },
];

export const Desktop: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [pdfReaderStatus, setPdfReaderStatus] = useState<
    "Minimize" | "Maximize" | "Close" | "Normal"
  >("Normal");
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [pdfReaderPosition, setPdfReaderPosition] = useState({
    top: 10,
    left: 130,
  });

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

  const movePdfReader = useCallback(
    (left: number, top: number) => {
      setPdfReaderPosition({ left, top });
    },
    [setPdfReaderPosition],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ["desktop-icon", "application"],
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        if (item.id === "pdf-reader") {
          movePdfReader(left, top);
        } else {
          moveIcon(item.id, left, top);
        }
        return undefined;
      },
    }),
    [moveIcon],
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    left: 0,
    top: 0,
  });

  const handleClickPDFReader = (button: "Minimize" | "Maximize" | "Close") => {
    setPdfReaderStatus(button);
  };

  return (
    <div
      ref={drop}
      className="flex-1 w-full h-full"
      id="desktop"
      onContextMenu={(e) => {
        e.preventDefault();
        //@ts-ignore
        if (e.target.id !== "desktop") return;
        setIsMenuOpen(true);
        setContextMenuPosition({ left: e.clientX, top: e.clientY });
      }}
    >
      {Object.keys(desktopIcons).map((key) => {
        const icon = desktopIcons[key];
        return (
          <DesktopIcon
            onClickContextMenuItem={(label) => {
              setIsMenuOpen(false);
              if (label === "Open") {
                if (key === "resume") {
                  setPdfReaderStatus("Normal");
                }
              }
            }}
            key={key}
            id={key}
            img={icon.img}
            title={icon.title}
            position={icon.position}
            onDoubleClicked={() => {
              if (key === "resume") {
                setPdfReaderStatus("Normal");
              }
            }}
          />
        );
      })}

      <ContextMenu
        isContextMenuOpen={isMenuOpen}
        contextMenuPosition={contextMenuPosition}
        contextMenuItems={contextMenuItemsDesktop}
        ref={contextMenuRef}
        onClickOutside={() => {
          setIsMenuOpen(false);
        }}
      />

      {pdfReaderStatus !== "Close" && (
        <PDFReader
          position={pdfReaderPosition}
          id="pdf-reader"
          onClick={handleClickPDFReader}
        />
      )}
    </div>
  );
};
