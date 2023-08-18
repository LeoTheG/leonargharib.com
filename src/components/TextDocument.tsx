import { ApplicationWindow } from "components/ApplicationWindow";
import { IWindow } from "components/TaskbarWindow";

interface ITextWindowProps {
  window: IWindow;
  onClick: (buttonType: "Minimize" | "Maximize" | "Close") => void;
}
const defaultTextValue =
  "- Call grandma\n- finish this website\n- walk deeno\n- get into vinyls? (big maybe)";
export const TextDocument = ({
  window: windowProp,
  onClick,
}: ITextWindowProps) => {
  return (
    <ApplicationWindow
      window={windowProp}
      onClick={onClick}
      className="w-[300px] md:w-[500px] h-[300px] md:h-[300px]"
    >
      <div className="flex-1 bg-white pl-1 pt-1">
        <textarea
          className="resize-none border-none outline-none w-full h-full"
          defaultValue={defaultTextValue}
        />
      </div>
    </ApplicationWindow>
  );
};
