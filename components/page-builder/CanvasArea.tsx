import { Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { CanvasNode } from "@/components/page-builder/CanvasNode";
import type { CanvasElement } from "@/lib/types";

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  dragOverCanvas: boolean;
  setDragOverCanvas: (value: boolean) => void;
  onDrop: (e: React.DragEvent) => void;
  elements: CanvasElement[];
  onCanvasMouseDown: (e: React.MouseEvent) => void;
}

export function CanvasArea({
  canvasRef,
  dragOverCanvas,
  setDragOverCanvas,
  onDrop,
  elements,
  onCanvasMouseDown,
}: CanvasAreaProps) {
  return (
    <main className="flex-1 overflow-auto bg-zinc-950 flex items-start justify-center p-6">
      <div
        ref={canvasRef}
        className={cn(
          "relative bg-white rounded-md",
          dragOverCanvas && "ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950"
        )}
        style={{
          width: 800,
          minHeight: 600,
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverCanvas(true);
        }}
        onDragLeave={() => setDragOverCanvas(false)}
        onDrop={onDrop}
        onMouseDown={onCanvasMouseDown}
      >
        {elements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
            <Type className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-400">Drop components here</p>
            <p className="text-xs text-gray-300 mt-1">Drag from the left panel to begin</p>
          </div>
        )}
        {elements.map((el) => (
          <CanvasNode key={el.id} el={el} />
        ))}
      </div>
    </main>
  );
}
