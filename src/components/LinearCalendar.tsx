import React from "react";
import { useCalendarStore } from "../store";
import {
  buildYearDays,
  MONTH_LABELS,
  WEEKDAY_LABELS,
  YEAR
} from "../utils/calendarUtils";
import DayCell from "./DayCell";

const days = buildYearDays(YEAR);

export default function LinearCalendar() {
  const present = useCalendarStore((s) => s.present);
  const layoutMode = present.ui.layoutMode;
  const zoom = present.ui.zoom;

  const months = MONTH_LABELS.map((label, monthIndex) => ({
    label,
    days: days.filter((d) => d.monthIndex === monthIndex)
  }));

  /* ============================================================
     WRAPPED MONTH VIEW (with weekday bars above and below)
     ============================================================ */
  if (layoutMode === "wrapped") {
    return (
      <div
        className="calendar-wrapper"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left"
        }}
      >
        <div className="month-rows">
          {months.map((month) => (
            <div key={month.label} className="month-row">
              {/* Month label on the left */}
              <div className="month-label">{month.label}</div>

              {/* Month content */}
              <div className="month-grid-wrapper">

                {/* TOP weekday bar */}
                <div
                  className="weekday-bar-wrapped top"
                  style={{
                    gridTemplateColumns: `repeat(${month.days.length}, 24px)`
                  }}
                >
                  {month.days.map((day) => (
                    <div
                      key={"top-" + day.id}
                      className="weekday-cell-wrapped"
                    >
                      {WEEKDAY_LABELS[day.weekday]}
                    </div>
                  ))}
                </div>

                {/* DAYS GRID */}
                <div
                  className="month-grid"
                  style={{
                    gridTemplateColumns: `repeat(${month.days.length}, 24px)`
                  }}
                >
                  {month.days.map((day) => (
                    <DayCell key={day.id} day={day} />
                  ))}
                </div>

                {/* BOTTOM weekday bar */}
                <div
                  className="weekday-bar-wrapped bottom"
                  style={{
                    gridTemplateColumns: `repeat(${month.days.length}, 24px)`
                  }}
                >
                  {month.days.map((day) => (
                    <div
                      key={"bottom-" + day.id}
                      className="weekday-cell-wrapped"
                    >
                      {WEEKDAY_LABELS[day.weekday]}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ============================================================
     LINEAR YEAR VIEW (full 365‑day strip)
     ============================================================ */
  return (
    <div
      className="calendar-wrapper linear"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "top left"
      }}
    >
      {/* TOP weekday bar */}
      <div className="weekday-bar top">
        {days.map((day) => (
          <div key={"top-" + day.id} className="weekday-cell">
            {WEEKDAY_LABELS[day.weekday]}
          </div>
        ))}
      </div>

      {/* MONTH LABELS */}
      <div className="month-labels-row">
        {MONTH_LABELS.map((label, monthIndex) => {
          const firstDay = days.find(
            (d) => d.monthIndex === monthIndex && d.dayOfMonth === 1
          );
          const index = firstDay ? days.indexOf(firstDay) : 0;

          return (
            <div
              key={label}
              className="month-label-top"
              style={{
                gridColumnStart: index + 1,
                gridColumnEnd: index + 8
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="days-grid-linear">
        {days.map((day) => (
          <DayCell key={day.id} day={day} />
        ))}
      </div>

      {/* BOTTOM weekday bar */}
      <div className="weekday-bar bottom">
        {days.map((day) => (
          <div key={"bottom-" + day.id} className="weekday-cell">
            {WEEKDAY_LABELS[day.weekday]}
          </div>
        ))}
      </div>
    </div>
  );
}

