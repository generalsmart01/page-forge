"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CanvasArea } from "@/components/page-builder/CanvasArea";
import { COMPONENTS } from "@/components/page-builder/constants";
import { ComponentPalette } from "@/components/page-builder/ComponentPalette";
import { exportJSON, exportJSX } from "@/lib/export";
import { PropertiesPanel } from "@/components/page-builder/PropertiesPanel";
import { Toolbar } from "@/components/page-builder/Toolbar";
import { uid, useBuilderStore } from "@/lib/store";
import type { CanvasElement, ElementType } from "@/lib/types";

export default function PageBuilder() {
  const {
    elements, selectedId, history, future,
    addElement, selectElement, undo, redo, clearCanvas,
    saveToStorage, loadFromStorage,
  } = useBuilderStore();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragOverCanvas, setDragOverCanvas] = useState(false);
  const [toast, setToast] = useState("");
  const [draggingType, setDraggingType] = useState<ElementType | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); saveToStorage(); showToast("Saved"); }
      if (e.key === "Delete" || e.key === "Backspace") {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || (active as HTMLElement).contentEditable === "true")) return;
        if (selectedId) useBuilderStore.getState().removeElement(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, undo, redo, saveToStorage]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOverCanvas(false);
      if (!draggingType || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const comp = COMPONENTS.find((c) => c.type === draggingType)!;
      const x = Math.max(0, e.clientX - rect.left - (comp.defaults.w ?? 100) / 2);
      const y = Math.max(0, e.clientY - rect.top - (comp.defaults.h ?? 50) / 2);
      addElement({
        id: uid(),
        type: draggingType,
        x: Math.round(x / 10) * 10,
        y: Math.round(y / 10) * 10,
        ...comp.defaults,
      } as CanvasElement);
      setDraggingType(null);
      showToast("Component added");
    },
    [draggingType, addElement]
  );

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-[#0f1117] text-zinc-300 select-none">
        <Toolbar
          canUndo={history.length > 0}
          canRedo={future.length > 0}
          onUndo={undo}
          onRedo={redo}
          onClear={() => {
            clearCanvas();
            showToast("Canvas cleared");
          }}
          onExportJSON={() => {
            exportJSON(elements);
            showToast("JSON exported");
          }}
          onExportJSX={() => {
            exportJSX(elements);
            showToast("JSX exported");
          }}
          onSave={() => {
            saveToStorage();
            showToast("Saved to localStorage");
          }}
          elementCount={elements.length}
          toast={toast}
        />

        <div className="flex flex-1 min-h-0">
          <ComponentPalette setDraggingType={setDraggingType} />

          <CanvasArea
            canvasRef={canvasRef}
            dragOverCanvas={dragOverCanvas}
            setDragOverCanvas={setDragOverCanvas}
            onDrop={onDrop}
            elements={elements}
            onCanvasMouseDown={(e) => {
              if (e.target === canvasRef.current) selectElement(null);
            }}
          />

          <aside className="w-52 bg-[#151820] border-l border-zinc-900 flex-shrink-0">
            <div className="px-3 py-2 border-b border-zinc-800">
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Properties</p>
            </div>
            <div className="h-[calc(100%-37px)]">
              <PropertiesPanel />
            </div>
          </aside>
        </div>
      </div>
    </TooltipProvider>
  );
}
