import { ApplicationWindow } from "components/ApplicationWindow";
import { IWindow } from "components/TaskbarWindow";
import imgDeeno from "assets/deeno.jpg";

interface IImageApplicationProps {
  window: IWindow;
  onClick: (buttonType: "Minimize" | "Maximize" | "Close") => void;
}
export const ImageApplication = ({
  window: windowProp,
  onClick,
}: IImageApplicationProps) => {
  return (
    <ApplicationWindow
      window={{
        ...windowProp,
        title: windowProp.title + " - Windows Picture and Fax Viewer",
      }}
      onClick={onClick}
      className="w-[300px] md:w-[500px] h-[400px] md:h-[550px] overflow-y-hidden bg-white"
    >
      <div className="bg-white pl-1 pt-1 overflow-y-auto flex justify-center">
        <img
          src={imgDeeno}
          className="h-[400px] md:h-[500px] w-auto"
          alt="dog"
        />
      </div>
    </ApplicationWindow>
  );
};
