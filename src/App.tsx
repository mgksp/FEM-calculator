import { useReducer, useRef, useState } from "react";
import { motion } from "framer-motion";
import { themes } from "./enums/themes";
import { keys } from "./keys";
import { keyVariant } from "./enums/keyVariant";
import { keyType } from "./enums/keyType";

function App() {
  const [selectedTheme, setSelectedTheme] = useState<themes>(themes.darkBlue);

  enum ReducerActions {
    NUM = "NUM",
    OP = "OP",
    RESET = "RESET",
    DELETE = "DELETE",
    CALC = "CALC",
  }

  interface ReducerState {
    prev: string | null;
    op?: string | null;
    curr: string | null;
  }

  interface ReducerAction {
    type: ReducerActions;
    payload?: string;
  }

  const reducer = (
    state: ReducerState,
    { type, payload }: ReducerAction
  ): ReducerState => {
    switch (type) {
      case ReducerActions.NUM:
        if (payload === "0" && state.curr === "0") return state;
        if (payload === "." && state.curr!.includes(".")) return state;
        return {
          ...state,
          curr: `${state.curr || ""}${payload}`,
        };

      case ReducerActions.OP:
        if (state.curr === null && state.prev === null) return state;
        if (state.curr === null) {
          return {
            ...state,
            prev: `${state.prev?.slice(0, -1)}${payload}`,
            op: payload,
          };
        }
        if (state.prev === null) {
          return {
            ...state,
            prev: `${state.curr} ${payload}`,
            op: payload,
            curr: null,
          };
        }
        if (payload === "=") {
          return {
            ...state,
            prev: null,
            op: null,
            curr: calculate(state),
          };
        }
        return {
          ...state,
          prev: `${calculate(state)} ${payload}`,
          op: payload,
          curr: null,
        };

      case ReducerActions.DELETE:
        return {
          ...state,
          curr: state.curr?.slice(0, -1) || null,
        };

      case ReducerActions.RESET:
        return {
          curr: null,
          prev: null,
        };

      default:
        return state;
    }
  };

  const calculate = ({ curr, op, prev }: ReducerState) => {
    const num1 = parseFloat(prev!);
    const num2 = parseFloat(curr!);

    if (isNaN(num1) || isNaN(num2)) return "";

    let result = 0;

    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
    }

    return result.toString();
  };

  const [state, dispatch] = useReducer(reducer, { curr: null, prev: null });

  const screenInput = useRef<HTMLInputElement>(null);

  return (
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

            let handleClick = () => {};
            if (key.keyType === keyType.NUM) {
              handleClick = () => {
                screenInput.current!.scrollLeft =
                  screenInput.current!.scrollWidth;
                dispatch({
                  type: ReducerActions.NUM,
                  payload: key.value.toString(),
                });
              };
            }
            if (key.keyType === keyType.OP) {
              handleClick = () => {
                screenInput.current!.scrollLeft =
                  screenInput.current!.scrollWidth;
                dispatch({
                  type: ReducerActions.OP,
                  payload: key.value.toString(),
                });
              };
            }
            if (key.keyType === keyType.DELETE) {
              handleClick = () => dispatch({ type: ReducerActions.DELETE });
            }
            if (key.keyType === keyType.RESET) {
              handleClick = () => dispatch({ type: ReducerActions.RESET });
            }

            return (
              <button
                key={key.value}
                className={`h-16 grid place-content-center cursor-pointer rounded ${keyVariantStyle} ${
                  key.colSpan ? "col-span-2" : ""
                } md:rounded-lg`}
                onClick={handleClick}
              >
                {key.value.toString()}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
