import "./App.css";
import backgroundImg from "assets/xp_background.jpg";
import clsx from "clsx";
import { Desktop } from "components/Desktop";
import { Taskbar } from "components/Taskbar";

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
