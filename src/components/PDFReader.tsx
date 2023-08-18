import imgPDF from "assets/icons/PDF.png";
import React, { CSSProperties, PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import imgIconMinimize from "assets/icons/Minimize.png";
import imgIconMaximize from "assets/icons/Maximize.png";
import imgIconClose from "assets/icons/Close.png";
import imgResume from "assets/Resume.png";

interface IPDFReaderProps {
  position: { top: number; left: number };
  id: string;
  onClick: (button: "Minimize" | "Maximize" | "Close") => void;
}

export const PDFReader = ({
  position: { top, left },
  id,
  onClick,
}: IPDFReaderProps) => {
  const [, drag] = useDrag(
    () => ({
      type: "application",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  return (
    <div
      className="flex flex-col w-[900px] max-w-[calc(100%-25px)] h-[783px] max-h-[calc(100%-25px)] border-2 border-blue-700 border-solid rounded-tr-lg rounded-tl-lg "
      style={{
        ...dragStyle,
        left,
        top,
        transform: "translate(0,0)",
      }}
    >
      <HorizontalBar>
        <div className="flex justify-between w-full" ref={drag}>
          <div className="flex flex-row gap-2">
            <img src={imgPDF} alt="PDF" className="w-5 h-5" />
            <div className="text-white text-[0.8rem]">
              My Resume.pdf - Adobe Reader
            </div>
          </div>

          <div className="flex flex-row gap-1 pr-1">
            {[
              { name: "Minimize", img: imgIconMinimize },
              { name: "Maximize", img: imgIconMaximize },
              { name: "Close", img: imgIconClose },
            ].map(({ name, img }) => (
              <img
                key={name}
                src={img}
                alt={name}
                className="w-5 h-5 hover:filter hover:brightness-125"
                onClick={() => onClick(name as any)}
              />
            ))}
          </div>
        </div>
      </HorizontalBar>
      <object
        data="/Leonar Gharib Resume.pdf#toolbar=0"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <div className="overflow-y-auto bg-[#565656] h-full flex flex-col items-center">
          <img src={imgResume} className="w-[800px]" alt="resume" />
          <a href="/Leonar Gharib Resume.pdf" download className="text-white">
            Download
          </a>
        </div>
      </object>
    </div>
  );
};

const dragStyle: CSSProperties = {
  position: "absolute",
  cursor: "move",
};

const HorizontalBar: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className="flex w-full h-fit pb-1 pt-2 items-center pl-2 gap-2 bg-gradient-to-b from-[#0C5FCB] to-[#428EEA] rounded-tl-lg rounded-tr-lg">
      {children}
    </div>
  );
};
