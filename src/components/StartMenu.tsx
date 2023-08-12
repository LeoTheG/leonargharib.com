import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import iconFish from "assets/icons/fish.jpg";
import imgIconInternetExplorer from "assets/icons/InternetExplorer.png";
import imgIconOutlook from "assets/icons/Outlook.png";

import imgIconMSN from "assets/icons/MSN.png";
import imgIconWindowsMediaPlayer from "assets/icons/WindowsMediaPlayer.png";
import imgIconWindowsMessenger from "assets/icons/WindowsMessenger.jpeg";
import imgIconTourWindowsXP from "assets/icons/TourWindowsXP.png";
import imgIconFilesAndSettingsTransferWizard from "assets/icons/FilesAndSettingsTransferWizard.png";
import imgIconAllPrograms from "assets/icons/AllPrograms.png";
import imgIconMyDocuments from "assets/icons/MyDocuments.png";
import imgIconMyRecentDocuments from "assets/icons/MyRecentDocuments.png";
import imgIconMyPictures from "assets/icons/MyPictures.png";
import imgIconMyMusic from "assets/icons/MyMusic.png";
import imgIconMyComputer from "assets/icons/MyComputer.png";
import imgIconControlPanel from "assets/icons/ControlPanel.png";
import imgIconSetProgramAccessAndDefaults from "assets/icons/SetProgramAccessAndDefaults.png";
import imgIconPrintersAndFaxes from "assets/icons/PrintersAndFaxes.png";
import imgIconHelpAndSupport from "assets/icons/HelpAndSupport.png";
import imgIconSearch from "assets/icons/Search.png";
import imgIconRun from "assets/icons/Run.png";

export const StartMenu = ({
  isOpen,
  onClickOutside,
}: {
  isOpen: boolean;
  onClickOutside: (eventTarget: any) => void;
}) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event.target);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div
      ref={ref}
      className={clsx(
        "pr-[1px] bg-primary z-[1000] absolute flex-col w-[450px]",
        "h-[600px] bottom-[37px] left-0 rounded-tr-md rounded-tl-md",
      )}
      style={{
        display: isOpen ? "flex" : "none",
        boxShadow: "3px 1px 0px 0 rgba(0,0,0,0.8)",
      }}
    >
      <div
        className={clsx(
          "before:absolute before:top-[2px] ",
          "before:w-[calc(100%)] before:h-[2px] before:bg-gradient-to-br",
          "before:bg-white/40",
          "before:border-[#f0f0f0] before:z-[-1]",
        )}
      />
      <div className="flex w-full h-[90px] items-center pl-2 gap-2 bg-gradient-to-b from-[#0C5FCB] to-[#428EEA]">
        <img
          src={iconFish}
          alt="icon"
          className="w-[60px] h-[60px] rounded-sm"
          style={{ border: "2px solid #eee" }}
        />
        <span className="text-xl text-white">Leo</span>
      </div>
      <div className="flex w-full h-full overflow-y-hidden">
        <div className="flex flex-col items-center w-[50%] h-full bg-white gap-1 pt-2">
          {leftSideIcons.map((item) => (
            <StartMenuIcon key={item.label} item={item} />
          ))}

          <div className="flex flex-col items-center justify-end flex-1 w-full px-2 pb-2">
            <div className="h-[1px] bg-black/20 w-[75%] mb-2" />
            <div className="flex items-center justify-center w-full gap-2 px-2 text-center hover:bg-primary hover:text-white">
              <span className="text-sm font-bold">All Programs</span>
              <img src={imgIconAllPrograms} alt="All Programs" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-[50%] h-full bg-[#D3E5FA] gap-1 pt-2 ">
          {rightSideIcons.map((item) => (
            <StartMenuIcon key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StartMenuIcon = ({ item }: { item: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center w-full p-1 pl-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        key={item.label}
        className="flex items-center w-full hover:bg-primary hover:text-white"
      >
        <img
          src={item.icon}
          alt={item.label}
          className="w-[30px] h-[30px] mr-2"
        />
        <div className="flex flex-col">
          <span
            className="text-sm"
            style={{
              fontWeight: item.description ? "bold" : "normal",
            }}
          >
            {item.label}
          </span>
          <div
            className="text-sm text-black/40"
            style={{
              color: isHovered ? "#fff" : undefined,
            }}
          >
            {item.description}
          </div>
        </div>
      </div>
      {item.hasSeparatorAfter && (
        <div className="h-[1px] bg-black/20 w-[75%] my-2" />
      )}
    </div>
  );
};

const leftSideIcons = [
  {
    label: "Internet",
    description: "Internet Explorer",
    icon: imgIconInternetExplorer,
  },
  {
    label: "E-mail",
    description: "Outlook Express",
    icon: imgIconOutlook,
    hasSeparatorAfter: true,
  },
  {
    label: "MSN",
    icon: imgIconMSN,
  },
  {
    label: "Windows Media Player",
    icon: imgIconWindowsMediaPlayer,
  },
  {
    label: "Windows Messenger",
    icon: imgIconWindowsMessenger,
  },
  {
    label: "Tour Windows XP",
    icon: imgIconTourWindowsXP,
  },
  {
    label: "Files and Settings Transfer Wizard",
    icon: imgIconFilesAndSettingsTransferWizard,
  },
];

const rightSideIcons = [
  {
    label: "My Documents",
    icon: imgIconMyDocuments,
  },
  {
    label: "My Recent Documents",
    icon: imgIconMyRecentDocuments,
  },
  {
    label: "My Pictures",
    icon: imgIconMyPictures,
  },
  {
    label: "My Music",
    icon: imgIconMyMusic,
  },
  {
    label: "My Computer",
    icon: imgIconMyComputer,
    hasSeparatorAfter: true,
  },
  {
    label: "Control Panel",
    icon: imgIconControlPanel,
  },
  {
    label: "Set Program Access and Defaults",
    icon: imgIconSetProgramAccessAndDefaults,
  },
  {
    label: "Printers and Faxes",
    icon: imgIconPrintersAndFaxes,
    hasSeparatorAfter: true,
  },
  {
    label: "Help and Support",
    icon: imgIconHelpAndSupport,
  },
  {
    label: "Search",
    icon: imgIconSearch,
  },
  {
    label: "Run...",
    icon: imgIconRun,
  },
];
