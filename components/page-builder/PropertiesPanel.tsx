import { SlidersHorizontal } from "lucide-react";
import { useBuilderStore } from "@/lib/store";
import type { CanvasElement } from "@/lib/types";

function PropInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  return (
    <div className="px-3 py-2 border-b border-zinc-800">
      <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
      <input
        type={type}
        value={value}
        step={type === "number" ? 1 : undefined}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:border-blue-500"
      />
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="px-3 py-2 border-b border-zinc-800">
      <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded overflow-hidden border border-zinc-700 flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full border-none p-0 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-200 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export function PropertiesPanel() {
  const { elements, selectedId, updateElement, saveHistory } = useBuilderStore();
  const el = elements.find((entry) => entry.id === selectedId);

  const update = (patch: Partial<CanvasElement>) => {
    if (!el) return;
    saveHistory();
    updateElement(el.id, patch);
  };

  const onImageUpload = (file?: File) => {
    if (!el || el.type !== "image" || !file) return;
    const reader = new FileReader();
    reader.onload = () => {
      saveHistory();
      updateElement(el.id, {
        src: typeof reader.result === "string" ? reader.result : "",
        alt: el.alt || file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  if (!el) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <SlidersHorizontal className="w-8 h-8 text-zinc-700 mb-3" />
        <p className="text-xs text-zinc-600 leading-relaxed">Select an element to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{el.type}</p>
        <p className="text-xs text-zinc-300 font-medium mt-0.5 truncate">{el.id}</p>
      </div>
      <PropInput label="X" type="number" value={el.x} onChange={(v) => update({ x: v as number })} />
      <PropInput label="Y" type="number" value={el.y} onChange={(v) => update({ y: v as number })} />
      <PropInput label="Width" type="number" value={el.w} onChange={(v) => update({ w: v as number })} />
      <PropInput label="Height" type="number" value={el.h} onChange={(v) => update({ h: v as number })} />
      {["heading", "paragraph", "button", "badge"].includes(el.type) && (
        <>
          <PropInput label="Text" type="text" value={el.text ?? ""} onChange={(v) => update({ text: v as string })} />
          <PropInput
            label="Font size"
            type="number"
            value={el.fontSize ?? 14}
            onChange={(v) => update({ fontSize: v as number })}
          />
          <ColorInput label="Text color" value={el.color ?? "#111827"} onChange={(v) => update({ color: v })} />
        </>
      )}
      {["button", "badge", "box"].includes(el.type) && (
        <>
          <ColorInput label="Background" value={el.bg ?? "#ffffff"} onChange={(v) => update({ bg: v })} />
          <PropInput
            label="Border radius"
            type="number"
            value={el.borderRadius ?? 0}
            onChange={(v) => update({ borderRadius: v as number })}
          />
        </>
      )}
      {el.type === "box" && (
        <ColorInput label="Border color" value={el.borderColor ?? "#e5e7eb"} onChange={(v) => update({ borderColor: v })} />
      )}
      {el.type === "divider" && (
        <>
          <ColorInput label="Color" value={el.color ?? "#e5e7eb"} onChange={(v) => update({ color: v })} />
          <PropInput
            label="Thickness"
            type="number"
            value={el.thickness ?? 1}
            onChange={(v) => update({ thickness: v as number })}
          />
        </>
      )}
      {el.type === "input" && (
        <PropInput
          label="Placeholder"
          type="text"
          value={el.placeholder ?? ""}
          onChange={(v) => update({ placeholder: v as string })}
        />
      )}
      {el.type === "image" && (
        <>
          <PropInput
            label="Alt text"
            type="text"
            value={el.alt ?? ""}
            onChange={(v) => update({ alt: v as string })}
          />
          <div className="px-3 py-2 border-b border-zinc-800">
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Image upload</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageUpload(e.target.files?.[0])}
              className="w-full text-xs text-zinc-300 file:mr-2 file:rounded file:border-0 file:bg-blue-600 file:px-2 file:py-1 file:text-xs file:text-white hover:file:bg-blue-500"
            />
            {el.src && (
              <button
                type="button"
                onClick={() => update({ src: "" })}
                className="mt-2 inline-flex rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300 hover:bg-zinc-700"
              >
                Remove image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
