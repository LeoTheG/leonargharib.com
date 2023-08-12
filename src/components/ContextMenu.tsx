import clsx from "clsx";

export const ContextMenu = ({
  isContextMenuOpen,
  contextMenuPosition,
}: {
  isContextMenuOpen: boolean;
  contextMenuPosition: { top: number; left: number };
}) => {
  return (
    <div
      className="px-[4px] py-[2px] bg-white z-[1000] absolute flex-col"
      style={{
        top: contextMenuPosition.top,
        left: contextMenuPosition.left,
        display: isContextMenuOpen ? "flex" : "none",
        boxShadow: "3px 3px 3px 0 rgba(0,0,0,0.8)",
      }}
    >
      {contextMenuItems.map((item) => (
        <div
          key={item.label}
          className={clsx("p-0 m-0 text-sm", item.isBold && "font-bold")}
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
};

const contextMenuItems = [
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
