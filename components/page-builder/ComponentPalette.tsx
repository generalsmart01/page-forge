import { COMPONENTS } from "@/components/page-builder/constants";
import type { ElementType } from "@/lib/types";

interface ComponentPaletteProps {
  setDraggingType: (type: ElementType | null) => void;
}

export function ComponentPalette({ setDraggingType }: ComponentPaletteProps) {
  return (
    <aside className="w-48 bg-[#151820] border-r border-zinc-900 flex-shrink-0 overflow-y-auto py-2">
      <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest px-3 pb-2">Components</p>
      {COMPONENTS.map((comp) => (
        <div
          key={comp.type}
          draggable
          onDragStart={() => setDraggingType(comp.type)}
          onDragEnd={() => setDraggingType(null)}
          className="flex items-center gap-2.5 mx-2 my-1 px-3 py-2 rounded-md border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 cursor-grab active:cursor-grabbing hover:border-blue-800 hover:text-blue-300 hover:bg-blue-950/30 transition-all"
        >
          <span className="text-blue-400 flex-shrink-0">{comp.icon}</span>
          {comp.label}
        </div>
      ))}
    </aside>
  );
}
