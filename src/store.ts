import { create } from "zustand";
import { CalendarState, DayId, DayState, HistoryState, RootState } from "./types";

const STORAGE_KEY = "linear-calendar-2026-state";

function createEmptyState(): RootState {
  return {
    calendar: {
      days: {}
    },
    ui: {
      darkMode: false,
      layoutMode: "wrapped",
      activeColor: "#ff0000",
      toolMode: "text", // default mode
      isPainting: false,
      zoom: 1.0
    }
  };
}

function loadInitialState(): RootState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw) as RootState;
    return parsed;
  } catch {
    return createEmptyState();
  }
}

function saveState(state: RootState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

interface Store extends HistoryState {
  setDayColor: (dayId: DayId, color?: string) => void;
  setDayNote: (dayId: DayId, note?: string) => void;
  setActiveColor: (color: string) => void;
  setToolMode: (mode: "text" | "paint" | "eyedropper") => void;
  setLayoutMode: (mode: "wrapped" | "linear") => void;
  toggleDarkMode: () => void;
  setZoom: (zoom: number) => void;

  startPainting: () => void;
  stopPainting: () => void;
  paintDay: (dayId: DayId) => void;

  clear: () => void;
  undo: () => void;
  redo: () => void;
  exportJson: () => string;
  importJson: (json: string) => void;
}

function withNewPresent(state: Store, newPresent: RootState): HistoryState {
  return {
    past: [...state.past, state.present],
    present: newPresent,
    future: []
  };
}

export const useCalendarStore = create<Store>((set, get) => {
  const initialPresent = loadInitialState();

  const base: Store = {
    past: [],
    present: initialPresent,
    future: [],

    setDayColor(dayId, color) {
      const state = get();
      const prev = state.present;
      const dayPrev = prev.calendar.days[dayId] || {};
      const newDay: DayState = { ...dayPrev, color };
      const newPresent: RootState = {
        ...prev,
        calendar: {
          ...prev.calendar,
          days: {
            ...prev.calendar.days,
            [dayId]: newDay
          }
        }
      };
      const history = withNewPresent(state, newPresent);
      saveState(history.present);
      set(history);
    },

    setDayNote(dayId, note) {
      const state = get();
      const prev = state.present;
      const dayPrev = prev.calendar.days[dayId] || {};
      const newDay: DayState = { ...dayPrev, note };
      const newPresent: RootState = {
        ...prev,
        calendar: {
          ...prev.calendar,
          days: {
            ...prev.calendar.days,
            [dayId]: newDay
          }
        }
      };
      const history = withNewPresent(state, newPresent);
      saveState(history.present);
      set(history);
    },

    setActiveColor(color) {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          activeColor: color
        }
      };
      saveState(present);
      set({ ...state, present });
    },

    setToolMode(mode) {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          toolMode: mode
        }
      };
      saveState(present);
      set({ ...state, present });
    },

    setLayoutMode(mode) {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          layoutMode: mode
        }
      };
      saveState(present);
      set({ ...state, present });
    },

    toggleDarkMode() {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          darkMode: !state.present.ui.darkMode
        }
      };
      saveState(present);
      set({ ...state, present });
    },

    setZoom(zoom) {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          zoom
        }
      };
      saveState(present);
      set({ ...state, present });
    },

    startPainting() {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          isPainting: true
        }
      };
      set({ ...state, present });
    },

    stopPainting() {
      const state = get();
      const present: RootState = {
        ...state.present,
        ui: {
          ...state.present.ui,
          isPainting: false
        }
      };
      set({ ...state, present });
    },

    paintDay(dayId) {
      const state = get();
      const { toolMode, activeColor } = state.present.ui;
      const currentDay = state.present.calendar.days[dayId] || {};

      if (toolMode === "paint") {
        base.setDayColor(dayId, activeColor);
      } else if (toolMode === "eyedropper") {
        if (currentDay.color) {
          base.setActiveColor(currentDay.color);
        }
      }
    },

    clear() {
      const state = get();
      const prev = state.present;
      const newPresent: RootState = {
        ...prev,
        calendar: {
          days: {}
        }
      };
      const history = withNewPresent(state, newPresent);
      saveState(history.present);
      set(history);
    },

    undo() {
      const state = get();
      if (state.past.length === 0) return;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      const newFuture = [state.present, ...state.future];
      saveState(previous);
      set({
        past: newPast,
        present: previous,
        future: newFuture
      });
    },

    redo() {
      const state = get();
      if (state.future.length === 0) return;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      const newPast = [...state.past, state.present];
      saveState(next);
      set({
        past: newPast,
        present: next,
        future: newFuture
      });
    },

    exportJson() {
      const state = get();
      return JSON.stringify(state.present);
    },

    importJson(json: string) {
      try {
        const parsed = JSON.parse(json) as RootState;
        const newHistory: HistoryState = {
          past: [],
          present: parsed,
          future: []
        };
        saveState(parsed);
        set(newHistory);
      } catch {
        // ignore bad import
      }
    }
  };

  return base;
});

