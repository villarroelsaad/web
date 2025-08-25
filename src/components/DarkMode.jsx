import { useDarkMode } from "../hooks/useDarkMode";
import { HiSun, HiMoon } from "react-icons/hi2";

export const DarkMode = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className="flex justify-end w-full p-1  pr-6">
      <button onClick={toggleDarkMode} className="mt-3 hover:opacity-70">
        {darkMode ? (
          <HiMoon size={30} color="#f3f4f6 " />
        ) : (
          <HiSun size={30} color="#27272a" />
        )}
      </button>
    </div>
  );
};