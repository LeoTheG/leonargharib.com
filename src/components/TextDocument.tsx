import { ApplicationWindow } from "components/ApplicationWindow";
import { IWindow } from "components/TaskbarWindow";

interface ITextWindowProps {
  window: IWindow;
  onClick: (buttonType: "Minimize" | "Maximize" | "Close") => void;
}
const defaultTextValue =
  "- call grandma\n- finish this website\n- walk deeno\n- get into vinyls? (big maybe)";
export const TextDocument = ({
  window: windowProp,
  onClick,
}: ITextWindowProps) => {
  return (
    <ApplicationWindow
      window={{
        ...windowProp,
        title: windowProp.title + " - Notepad",
      }}
      onClick={onClick}
      className="w-[300px] md:w-[500px] h-[300px] md:h-[300px] overflow-hidden"
    >
      <div className="flex w-full bg-[#ECE9D8] h-6 gap-2">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center text-[0.8rem] text-black hover:bg-primary hover:text-white px-1"
          >
            {option}
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white pl-1 pt-1">
        <textarea
          className="resize-none border-none outline-none w-full h-full"
          defaultValue={defaultTextValue}
        />
      </div>
    </ApplicationWindow>
  );
};

const options = ["File", "Edit", "Format", "View", "Help"];
