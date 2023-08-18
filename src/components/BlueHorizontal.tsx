import { PropsWithChildren } from "react";

export const BlueHorizontal: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <div className="flex w-full h-fit pb-1 pt-2 items-center pl-2 gap-2 bg-gradient-to-b from-[#0C5FCB] to-[#428EEA] rounded-tl-lg rounded-tr-lg">
      {children}
    </div>
  );
};
