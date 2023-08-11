import "./App.css";
import backgroundImg from "assets/xp_background.jpg";
import windowsXpIconImg from "assets/windows_xp_icon.png";
import clsx from "clsx";

function App() {
  return (
    <div
      className={clsx(
        "min-h-screen w-full flex items-center gap-4 flex-col justify-between",
      )}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Desktop />
      <Taskbar />
    </div>
  );
}

export default App;

const Desktop = () => {
  return <div className="flex-1" />;
};

const Taskbar = () => {
  return (
    <div className="w-full bg-[#3e74f0] h-[34px]">
      {" "}
      <StartButton />{" "}
    </div>
  );
};

const StartButton = () => {
  return (
    <button
      className={clsx(
        "h-full bg-[#54ae4c] text-white flex justify-between",
        "items-center gap-1 pl-2 pr-6 rounded-r-xl rounded-l-md",
        "hover:bg-[#54ae4c]/90",
      )}
    >
      <img
        src={windowsXpIconImg}
        alt="Windows XP Icon"
        className="w-auto h-[24px]"
      />
      <span className="font-['Franklin Gothic'] font-bold italic">start</span>
    </button>
  );
};
