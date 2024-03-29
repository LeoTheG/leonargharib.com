import { XYCoord, useDrop } from "react-dnd";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";

import imgIconImageApp from "assets/icons/Image App.png";
import imgIconAIMessenger from "assets/icons/AI Messenger.png";
import imgIconRunes from "assets/icons/Runes.jpg";
import imgIconMyComputer from "assets/icons/MyComputer.png";
import imgIconRecycle from "assets/icons/RecycleBin.png";
import imgIconMyDocuments from "assets/icons/Documents.png";
import imgIconTextDocument from "assets/icons/TextDocument.png";
import imgIconInternetExplorer from "assets/icons/InternetExplorer.png";
import imgIconImage from "assets/icons/Image.png";
import imgPDF from "assets/icons/PDF.png";
import { DesktopIcon } from "components/DesktopIcon";
import { ContextMenu, contextMenuItemsDesktop } from "components/ContextMenu";
import { useAppContext } from "App";
import { TextDocument } from "components/TextDocument";
import { PDFReader } from "components/PDFReader";
import { ImageApplication } from "./Image";

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
    img: imgIconTextDocument,
    title: "important notes (dont forget)",
    position: { top: 10, left: 100 },
    id: "text-document",
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
  {
    img: imgIconImage,
    title: "deeno",
    position: { top: 280, left: 10 },
    id: "picture",
  },
  {
    img: imgIconRunes,
    title: "Runes",
    position: { top: 280, left: 100 },
    id: "runes",
  },
  {
    img: imgIconAIMessenger,
    title: "AI Messenger",
    position: { top: 370, left: 10 },
    id: "ai-messenger",
  },
  {
    img: imgIconImageApp,
    title: "Image App",
    position: { top: 370, left: 100 },
    id: "image-app",
  },
];

export const Desktop: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { windows, setWindows } = useAppContext();
  const pdfReader = windows["resume"];
  const textDocument = windows["text-document"];
  const picture = windows["picture"];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    left: 0,
    top: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement>(null);

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

  const moveWindow = useCallback(
    (id: string, left: number, top: number) => {
      setWindows((windows) => {
        return {
          ...windows,
          [id]: {
            ...windows[id],
            position: { left, top },
          },
        };
      });
    },
    [setWindows],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ["desktop-icon", "application"],
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        if (item.isDesktopIcon) {
          moveIcon(item.id, left, top);
        } else if (isValidId(item.id)) {
          moveWindow(item.id, left, top);
        }
        return undefined;
      },
    }),
    [moveIcon],
  );

  const handleClickWindow = (
    id: string,
    action: "Minimize" | "Maximize" | "Close",
  ) => {
    setWindows({
      ...windows,
      [id]: {
        ...windows[id],
        status: action,
      },
    });
  };

  const Icons = Object.keys(desktopIcons).map((key) => {
    const icon = desktopIcons[key];
    return (
      <DesktopIcon
        onClickContextMenuItem={(label) => {
          setIsMenuOpen(false);
          if (label === "Open") {
            if (!isValidId(key)) return;

            console.log({ key, windows });
            if (key === "runes") {
              window.open("https://runes-tcg.com");
              return;
            } else if (key === "ai-messenger") {
              window.open(
                "https://apps.apple.com/us/app/ai-messenger/id6472007820?platform=iphone",
              );
              return;
            } else if (key === "image-app") {
              window.open("https://imageapp.xyz");
              return;
            }

            setWindows({
              ...windows,
              [key]: {
                ...windows[key],
                status: "Normal",
              },
            });
          }
        }}
        key={key}
        id={key}
        img={icon.img}
        title={icon.title}
        position={icon.position}
        onDoubleClicked={() => {
          if (key === "runes") {
            window.open("https://runes-tcg.com");
            return;
          } else if (key === "ai-messenger") {
            window.open(
              "https://apps.apple.com/us/app/ai-messenger/id6472007820?platform=iphone",
            );
            return;
          } else if (key === "image-app") {
            window.open("https://imageapp.xyz");
            return;
          }
          // only handling certain apps for now
          if (!isValidId(key)) return;

          setWindows({
            ...windows,
            [key]: {
              ...windows[key],
              status: "Normal",
            },
          });
        }}
      />
    );
  });

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
      {Icons}

      <ContextMenu
        isContextMenuOpen={isMenuOpen}
        contextMenuPosition={contextMenuPosition}
        contextMenuItems={contextMenuItemsDesktop}
        ref={contextMenuRef}
        onClickOutside={() => {
          setIsMenuOpen(false);
        }}
      />

      {pdfReader.status !== "Close" && pdfReader.status !== "Minimize" && (
        <PDFReader
          onClick={(arg: any) => handleClickWindow(pdfReader.id, arg)}
          window={pdfReader}
        />
      )}

      {textDocument.status !== "Close" &&
        textDocument.status !== "Minimize" && (
          <TextDocument
            window={textDocument}
            onClick={(arg: any) => handleClickWindow(textDocument.id, arg)}
          />
        )}

      {picture.status !== "Close" && picture.status !== "Minimize" && (
        <ImageApplication
          window={picture}
          onClick={(arg: any) => handleClickWindow(picture.id, arg)}
        />
      )}
    </div>
  );
};

const isValidId = (id: string) =>
  [
    "resume",
    "text-document",
    "picture",
    "runes",
    "ai-messenger",
    "image-app",
  ].includes(id);
