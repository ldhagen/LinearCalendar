export type DayId = string;

export interface LinearDay {
  id: DayId;
  date: Date;
  year: number;
  monthIndex: number; // 0-11
  dayOfMonth: number; // 1-31
  weekday: number; // 0-6, Sun=0
  weekOfYear: number;
}

export interface DayState {
  color?: string;
  note?: string;
}

export type LayoutMode = "wrapped" | "linear";

export type ToolMode = "text" | "paint" | "eyedropper";

export interface CalendarState {
  days: Record<DayId, DayState>;
}

export interface UIState {
  darkMode: boolean;
  layoutMode: LayoutMode;
  activeColor: string;
  toolMode: ToolMode;
  isPainting: boolean; // kept for future drag features, but not used for paint now
  zoom: number; // 1.0 = 100%
}

export interface RootState {
  calendar: CalendarState;
  ui: UIState;
}

export interface HistoryState {
  past: RootState[];
  present: RootState;
  future: RootState[];
}

