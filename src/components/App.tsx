import React from "react";
import { useCalendarStore } from "../store";
import Toolbar from "./Toolbar";
import LinearCalendar from "./LinearCalendar";

export default function App() {
  const present = useCalendarStore((s) => s.present);

  const darkMode = present.ui.darkMode;

  return (
    <div className={darkMode ? "app app-dark" : "app"}>
      <Toolbar />
      <LinearCalendar />
    </div>
  );
}

