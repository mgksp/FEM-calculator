import { useReducer, useRef, useState } from "react";
import { motion } from "framer-motion";
import { themes } from "./enums/themes";
import { keys } from "./keys";
import { keyVariant } from "./enums/keyVariant";
import { keyType } from "./enums/keyType";
import { reducer, ReducerActions } from "./reducer";

function App() {
  const [selectedTheme, setSelectedTheme] = useState<themes>(themes.darkBlue);

  const [state, dispatch] = useReducer(reducer, { curr: null, prev: null });

  const screenInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <main
        className={`${selectedTheme} min-h-screen bg-main px-6 grid place-items-center font-bold`}
      >
        <div className="w-full max-w-[33.75rem]">
          <div className="flex justify-between items-center text-headerTxt mb-8">
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
                        key={theme}
                        htmlFor={theme}
                        className="h-[1.125rem] w-[1.125rem] relative cursor-pointer"
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
                          className="absolute top-0 left-0 h-full w-full rounded-full bg-accentKey"
                        ></motion.span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <input
            ref={screenInput}
            type="text"
            aria-label="screen"
            className="text-[2.5rem] bg-screen text-headerTxt text-right rounded-lg px-5 py-6 w-full outline-none mb-6 md:px-7 md:py-8 md:text-[3.5rem]"
            readOnly
            value={`${state.prev || ""} ${state.curr || ""}`}
          />

          <div className="bg-screen rounded-lg w-full p-6 grid grid-cols-4 gap-3 md:gap-6 md:p-8">
            {keys.map((key) => {
              let keyVariantStyle = "";
              if (key.variant === keyVariant.primary) {
                keyVariantStyle =
                  "bg-primaryKey primaryKeyShadow text-primaryTxt text-[2rem] md:text-[2.5rem]";
              } else if (key.variant === keyVariant.secondary) {
                keyVariantStyle =
                  "bg-secondaryKey secondaryKeyShadow text-secondaryTxt text-xl md:text-[1.75rem]";
              } else if (key.variant === keyVariant.accent) {
                keyVariantStyle =
                  "bg-accentKey accentKeyShadow text-accentTxt text-xl md:text-[1.75rem]";
              }

              let handleClick = (type: keyType) => {
                screenInput.current!.scrollLeft =
                  screenInput.current!.scrollWidth;
                if (type === keyType.NUM) {
                  dispatch({
                    type: ReducerActions.NUM,
                    payload: key.value.toString(),
                  });
                }
                if (type === keyType.OP) {
                  dispatch({
                    type: ReducerActions.OP,
                    payload: key.value.toString(),
                  });
                }
                if (type === keyType.DELETE) {
                  dispatch({ type: ReducerActions.DELETE });
                }
                if (type === keyType.RESET) {
                  dispatch({ type: ReducerActions.RESET });
                }
              };

              return (
                <button
                  key={key.value}
                  className={`h-16 grid place-content-center cursor-pointer rounded ${keyVariantStyle} ${
                    key.colSpan ? "col-span-2" : ""
                  } md:rounded-lg`}
                  onClick={() => handleClick(key.keyType)}
                >
                  {key.value.toString()}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer
        className={`${selectedTheme} bg-main text-center text-headerTxt text-xs`}
      >
        Challenge by{" "}
        <a
          className="text-sm text-accentKey font-bold"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          className="text-sm text-accentKey font-bold"
          href="https://www.github.com/mgksp"
          target="_blank"
        >
          Prabu
        </a>
        .
      </footer>
    </>
  );
}

export default App;
