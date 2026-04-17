import { AnimatePresence, motion } from "framer-motion";
import { Download, FileJson, RotateCcw, RotateCw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExportJSON: () => void;
  onExportJSX: () => void;
  onSave: () => void;
  elementCount: number;
  toast: string;
}

export function Toolbar({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onExportJSON,
  onExportJSX,
  onSave,
  elementCount,
  toast,
}: ToolbarProps) {
  return (
    <header className="flex items-center gap-2 px-4 h-11 bg-[#0c0e14] border-b border-zinc-900 flex-shrink-0">
      <div className="flex items-center gap-2 mr-2">
        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">
          PB
        </div>
        <span className="text-sm font-bold text-zinc-100">PageForge</span>
      </div>
      <Separator orientation="vertical" className="h-5 bg-zinc-800" />

      {[
        {
          label: "Undo",
          icon: <RotateCcw className="w-3.5 h-3.5" />,
          onClick: onUndo,
          disabled: !canUndo,
          shortcut: "⌘Z",
        },
        {
          label: "Redo",
          icon: <RotateCw className="w-3.5 h-3.5" />,
          onClick: onRedo,
          disabled: !canRedo,
          shortcut: "⌘⇧Z",
        },
      ].map(({ label, icon, onClick, disabled, shortcut }) => (
        <Tooltip key={label}>
          <TooltipTrigger
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-muted hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {icon}
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {label} <span className="text-zinc-500">{shortcut}</span>
            </p>
          </TooltipContent>
        </Tooltip>
      ))}

      <Separator orientation="vertical" className="h-5 bg-zinc-800" />

      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={onClear}
          className="inline-flex h-7 items-center justify-center gap-1 rounded-md px-2 text-xs text-zinc-500 transition-colors hover:bg-muted hover:text-red-400"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear canvas</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-5 bg-zinc-800" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onExportJSON}
        className="h-7 px-2 text-xs text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950 gap-1"
      >
        <FileJson className="w-3.5 h-3.5" /> JSON
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onExportJSX}
        className="h-7 px-2 text-xs text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950 gap-1"
      >
        <Download className="w-3.5 h-3.5" /> JSX
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSave}
        className="h-7 px-2 text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-950 gap-1"
      >
        <Save className="w-3.5 h-3.5" /> Save
      </Button>

      <div className="ml-auto flex items-center gap-3">
        <span className="font-mono text-[10px] text-zinc-700">
          {elementCount} element{elementCount !== 1 ? "s" : ""}
        </span>
        <AnimatePresence>
          {toast && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] text-blue-400 bg-blue-950 border border-blue-900 px-2 py-0.5 rounded"
            >
              {toast}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
