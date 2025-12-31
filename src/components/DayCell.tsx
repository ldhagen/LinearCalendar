import React, { useState } from "react";
import { LinearDay } from "../types";
import { useCalendarStore } from "../store";

interface Props {
  day: LinearDay;
}

export default function DayCell({ day }: Props) {
  const { present, setDayNote, paintDay } = useCalendarStore();

  const dayState = present.calendar.days[day.id] || {};
  const color = dayState.color;
  const note = dayState.note || "";

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note);

  const isWeekend = day.weekday === 0 || day.weekday === 6;
  const mode = present.ui.toolMode;

  function handleDoubleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (mode === "paint") {
      // Paint this day once on double-click
      paintDay(day.id);
      return;
    }

    if (mode === "text") {
      setDraft(note);
      setEditing(true);
      return;
    }

    if (mode === "eyedropper") {
      // On double-click eyedropper, pick color if any
      paintDay(day.id); // store's paintDay handles eyedropper mode
    }
  }

  function handleClick(e: React.MouseEvent) {
    if (mode === "eyedropper") {
      e.stopPropagation();
      paintDay(day.id); // eyedropper behavior
    }
  }

  function handleBlur() {
    setEditing(false);
    setDayNote(day.id, draft);
  }

  const tooltip =
    day.id + (note ? " – " + note : "");

  return (
    <div
      className={
        "day-cell" +
        (isWeekend ? " day-weekend" : "") +
        (color ? " day-colored" : "")
      }
      style={{ backgroundColor: color || undefined }}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      title={tooltip}
    >
      <div className="day-number">{day.dayOfMonth}</div>

      {editing ? (
        <input
          className="day-note-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="day-note">{note}</div>
      )}
    </div>
  );
}

