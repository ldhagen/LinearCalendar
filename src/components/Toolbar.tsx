import React, { useRef } from "react";
import { useCalendarStore } from "../store";

export default function Toolbar() {
  const {
    present,
    undo,
    redo,
    clear,
    exportJson,
    importJson,
    toggleDarkMode,
    setLayoutMode,
    setActiveColor,
    setToolMode,
    setZoom
  } = useCalendarStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calendar-2026.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      importJson(text);
    };
    reader.readAsText(file);
  };

  const isWrapped = present.ui.layoutMode === "wrapped";
  const zoom = present.ui.zoom;

  return (
    <div className="toolbar">
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={clear}>Clear</button>

      <button onClick={handleExport}>Export</button>
      <button onClick={handleImportClick}>Import</button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleImportChange}
      />

      <button onClick={() => window.print()}>Print</button>

      <div className="toolbar-divider" />

      <label>
        <span>Color:</span>
        <input
          type="color"
          value={present.ui.activeColor}
          onChange={(e) => setActiveColor(e.target.value)}
        />
      </label>

      <label>
        <span>Mode:</span>
        <select
          value={present.ui.toolMode}
          onChange={(e) =>
            setToolMode(e.target.value as "text" | "paint" | "eyedropper")
          }
        >
          <option value="text">Text</option>
          <option value="paint">Paint</option>
          <option value="eyedropper">Eyedropper</option>
        </select>
      </label>

      <div className="toolbar-divider" />

      <label>
        <span>Layout:</span>
        <select
          value={present.ui.layoutMode}
          onChange={(e) =>
            setLayoutMode(e.target.value as "wrapped" | "linear")
          }
        >
          <option value="wrapped">By month (wrapped)</option>
          <option value="linear">Full linear year</option>
        </select>
      </label>

      <label>
        <span>Zoom:</span>
        <input
          type="range"
          min={50}
          max={150}
          step={25}
          value={Math.round(zoom * 100)}
          onChange={(e) => setZoom(Number(e.target.value) / 100)}
        />
        <span>{Math.round(zoom * 100)}%</span>
      </label>

      <button onClick={toggleDarkMode}>
        {present.ui.darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

