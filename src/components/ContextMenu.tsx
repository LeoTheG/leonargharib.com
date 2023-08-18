import clsx from "clsx";
import { forwardRef, useEffect, useRef } from "react";

interface IContextMenuProps {
  contextMenuItems: IContextMenuItem[];
  isContextMenuOpen: boolean;
  contextMenuPosition: { top: number; left: number };
  onClickOutside?: () => void;
  onClickItem?: (item: IContextMenuItem) => void;
}

export const ContextMenu = forwardRef<HTMLDivElement | null, IContextMenuProps>(
  (props, _ref) => {
    const {
      onClickOutside,
      contextMenuItems,
      isContextMenuOpen,
      contextMenuPosition,
    } = props;
    const ref = useRef<any>();

    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref?.current && !ref.current.contains(event.target)) {
          if (onClickOutside) onClickOutside();
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
        className="px-[4px] py-[2px] bg-white z-[1000] absolute flex-col"
        style={{
          top: contextMenuPosition.top,
          left: contextMenuPosition.left,
          display: isContextMenuOpen ? "flex" : "none",
          boxShadow: "3px 3px 3px 0 rgba(0,0,0,0.8)",
        }}
        ref={ref}
      >
        {contextMenuItems.map((item) => (
          <div
            key={item.label}
            className={clsx("p-0 m-0 text-sm", item.isBold && "font-bold")}
            onClick={(e) => {
              if (props.onClickItem) props.onClickItem(item);
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="px-3 w-[150px] hover:bg-primary hover:text-white">
              <span className="select-none">{item.label}</span>
            </div>
            {item.hasSeparatorAfter && (
              <div className="my-1 border-b border-gray-400" />
            )}
          </div>
        ))}
      </div>
    );
  },
);

interface IContextMenuItem {
  label: string;
  isBold?: boolean;
  hasSeparatorAfter?: boolean;
}

export const contextMenuItemsDesktop: IContextMenuItem[] = [
  {
    label: "Arrange Icons By",
  },
  {
    label: "Refresh",
    hasSeparatorAfter: true,
  },
  {
    label: "Paste",
  },
  {
    label: "Paste Shortcut",
  },
  {
    // TODO undo...
    label: "Undo",
  },
  {
    label: "New",
  },
  {
    label: "Properties",
  },
];

export const contextMenuItemsDesktopIcon: IContextMenuItem[] = [
  {
    label: "Open",
    isBold: true,
  },
  {
    label: "Run as...",
  },
  {
    label: "Pin to Start Menu",
    hasSeparatorAfter: true,
  },
  {
    label: "Send To",
    hasSeparatorAfter: true,
  },
  {
    label: "Cut",
  },
  {
    label: "Copy",
    hasSeparatorAfter: true,
  },
  {
    label: "Create Shortcut",
  },
  {
    label: "Delete",
  },
  {
    label: "Rename",
    hasSeparatorAfter: true,
  },
  {
    label: "Properties",
  },
];
