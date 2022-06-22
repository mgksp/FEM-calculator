import { useState } from "react";
import { motion } from "framer-motion";
import { themes } from "./enums/themes";

function App() {
  const [selectedTheme, setSelectedTheme] = useState<themes>(themes.darkBlue);

  return (
    <main
      className={`${selectedTheme} min-h-screen bg-main px-6 grid place-items-center font-bold`}
    >
      <div className="w-full max-w-[33.75rem]">
        <div className="flex justify-between items-center text-text2">
          <h1 className="text-[2rem]">calc</h1>
          <div className="flex items-end gap-6 text-xs">
            <p className="tracking-[1px] mb-1">THEME</p>
            <div className="w-[4.375rem]">
              <div className="p-1 flex justify-between items-center text-center">
                <span className="w-[1.125rem]">1</span>
                <span className="w-[1.125rem]">2</span>
                <span className="w-[1.125rem]">3</span>
              </div>
              <div className="w-full h-[1.625rem] bg-keypad rounded-full p-1 flex items-center justify-between">
                {[themes.darkBlue, themes.creame, themes.violet].map(
                  (theme) => (
                    <label
                      htmlFor={theme}
                      className="h-[1.125rem] w-[1.125rem] relative"
                    >
                      <input
                        className="invisible"
                        onChange={() => setSelectedTheme(theme)}
                        checked={selectedTheme === theme}
                        type="checkbox"
                        id={theme}
                      />
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: selectedTheme === theme ? 1 : 0 }}
                        className="absolute top-0 left-0 h-full w-full rounded-full bg-red-500"
                      ></motion.span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
