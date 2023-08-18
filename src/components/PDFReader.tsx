import imgResume from "assets/Resume.png";
import { ApplicationWindow } from "./ApplicationWindow";
import { IWindow } from "./TaskbarWindow";

interface IPDFReaderProps {
  window: IWindow;
  onClick: (button: "Minimize" | "Maximize" | "Close") => void;
}

export const PDFReader = ({ window: windowProp, onClick }: IPDFReaderProps) => {
  const DownloadButton = (
    <a href="/Leonar Gharib Resume.pdf" download className="text-white">
      Download
    </a>
  );
  const ImgResumeWithDownload = (
    <div className="overflow-y-auto bg-[#565656] h-full flex flex-col items-center">
      <img
        src={imgResume}
        className="w-[800px] max-w-full max-h-full"
        alt="resume"
      />
      {DownloadButton}
    </div>
  );

  return (
    <ApplicationWindow
      window={windowProp}
      onClick={onClick}
      className="w-[900px] h-[700px]"
    >
      {window?.innerWidth < 700 ? (
        ImgResumeWithDownload
      ) : (
        <object
          data="/Leonar Gharib Resume.pdf#toolbar=0"
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      )}
    </ApplicationWindow>
  );
};
