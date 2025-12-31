import { CalendarState, HistoryState, DayId } from "../types";

type Action =
  | { type: "SET_DAY_COLOR"; dayId: DayId; color?: string }
  | { type: "CLEAR_ALL" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "IMPORT_STATE"; state: CalendarState };

export function useHistoryReducer(initial: HistoryState) {
  function reducer(state: HistoryState, action: Action): HistoryState {
    switch (action.type) {
      case "SET_DAY_COLOR": {
        const { dayId, color } = action;
        const newPresent: CalendarState = {
          days: {
            ...state.present.days,
            [dayId]: { ...(state.present.days[dayId] || {}), color }
          }
        };
        return {
          past: [...state.past, state.present],
          present: newPresent,
          future: []
        };
      }

      case "CLEAR_ALL": {
        const newPresent: CalendarState = { days: {} };
        return {
          past: [...state.past, state.present],
          present: newPresent,
          future: []
        };
      }

      case "UNDO": {
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        return {
          past: state.past.slice(0, -1),
          present: previous,
          future: [state.present, ...state.future]
        };
      }

      case "REDO": {
        if (state.future.length === 0) return state;
        const next = state.future[0];
        return {
          past: [...state.past, state.present],
          present: next,
          future: state.future.slice(1)
        };
      }

      case "IMPORT_STATE":
        return { past: [], present: action.state, future: [] };

      default:
        return state;
    }
  }

  return reducer;
}

