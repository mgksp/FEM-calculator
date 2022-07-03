export enum ReducerActions {
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

export const reducer = (
  state: ReducerState,
  { type, payload }: ReducerAction
): ReducerState => {
  switch (type) {
    case ReducerActions.NUM:
      if (payload === "0" && state.curr === "0") return state;

      if (payload === "." && (state.curr === null || state.curr === "")) {
        return {
          ...state,
          curr: `0${payload}`,
        };
      }
      if (payload === "." && state.curr?.includes(".")) return state;

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
