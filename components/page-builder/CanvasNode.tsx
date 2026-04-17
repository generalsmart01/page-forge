import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ElementContent } from "@/components/page-builder/ElementContent";
import { useBuilderStore } from "@/lib/store";
import type { CanvasElement, ResizeHandle } from "@/lib/types";

export function CanvasNode({ el }: { el: CanvasElement }) {
  const { selectedId, selectElement, moveElement, resizeElement, saveHistory, removeElement, updateElement } =
    useBuilderStore();
  const isSelected = selectedId === el.id;
  const dragRef = useRef<{ startX: number; startY: number; elX: number; elY: number } | null>(null);
  const resizeRef = useRef<{
    pos: ResizeHandle;
    startX: number;
    startY: number;
    elX: number;
    elY: number;
    elW: number;
    elH: number;
  } | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset.handle) return;
      e.preventDefault();
      selectElement(el.id);
      dragRef.current = { startX: e.clientX, startY: e.clientY, elX: el.x, elY: el.y };

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        moveElement(
          el.id,
          Math.max(0, dragRef.current.elX + ev.clientX - dragRef.current.startX),
          Math.max(0, dragRef.current.elY + ev.clientY - dragRef.current.startY)
        );
      };
      const onUp = () => {
        saveHistory();
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [el, moveElement, saveHistory, selectElement]
  );

  const onResizeDown = useCallback(
    (e: React.MouseEvent, pos: ResizeHandle) => {
      e.stopPropagation();
      resizeRef.current = { pos, startX: e.clientX, startY: e.clientY, elX: el.x, elY: el.y, elW: el.w, elH: el.h };

      const onMove = (ev: MouseEvent) => {
        if (!resizeRef.current) return;
        const { pos, startX, startY, elX, elY, elW, elH } = resizeRef.current;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const patch: Partial<CanvasElement> = {};
        if (pos.includes("r")) patch.w = Math.max(40, elW + dx);
        if (pos.includes("l")) {
          patch.w = Math.max(40, elW - dx);
          patch.x = elX + elW - patch.w;
        }
        if (pos.includes("b")) patch.h = Math.max(20, elH + dy);
        if (pos.includes("t")) {
          patch.h = Math.max(20, elH - dy);
          patch.y = elY + elH - patch.h;
        }
        resizeElement(el.id, patch);
      };
      const onUp = () => {
        saveHistory();
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [el, resizeElement, saveHistory]
  );

  const onDblClick = useCallback(
    (e: React.MouseEvent) => {
      if (!["heading", "paragraph", "button", "badge"].includes(el.type)) return;
      const target = e.currentTarget.querySelector("[data-editable]") as HTMLElement | null;
      if (!target) return;
      e.stopPropagation();
      target.contentEditable = "true";
      target.focus();
      const range = document.createRange();
      range.selectNodeContents(target);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      const onBlur = () => {
        target.contentEditable = "false";
        saveHistory();
        updateElement(el.id, { text: target.textContent ?? "" });
      };
      target.addEventListener("blur", onBlur, { once: true });
    },
    [el, saveHistory, updateElement]
  );

  const handles: ResizeHandle[] = ["tl", "tr", "bl", "br", "t", "b", "l", "r"];
  const handleStyle = (pos: ResizeHandle): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      width: 8,
      height: 8,
      background: "#3b82f6",
      border: "1.5px solid #fff",
      borderRadius: 2,
      zIndex: 10,
    };
    if (pos === "tl") return { ...base, top: -4, left: -4, cursor: "nw-resize" };
    if (pos === "tr") return { ...base, top: -4, right: -4, cursor: "ne-resize" };
    if (pos === "bl") return { ...base, bottom: -4, left: -4, cursor: "sw-resize" };
    if (pos === "br") return { ...base, bottom: -4, right: -4, cursor: "se-resize" };
    if (pos === "t") return { ...base, top: -4, left: "50%", transform: "translateX(-50%)", cursor: "n-resize" };
    if (pos === "b") return { ...base, bottom: -4, left: "50%", transform: "translateX(-50%)", cursor: "s-resize" };
    if (pos === "l") return { ...base, left: -4, top: "50%", transform: "translateY(-50%)", cursor: "w-resize" };
    return { ...base, right: -4, top: "50%", transform: "translateY(-50%)", cursor: "e-resize" };
  };

  return (
    <div
      style={{ position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h, cursor: "move" }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDblClick}
    >
      <div className={cn("w-full h-full relative", isSelected && "outline outline-2 outline-blue-500")}>
        <ElementContent el={el} />
        {isSelected && (
          <>
            {handles.map((pos) => (
              <div
                key={pos}
                data-handle={pos}
                style={handleStyle(pos)}
                onMouseDown={(e) => onResizeDown(e, pos)}
              />
            ))}
            <button
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 18,
                height: 18,
                background: "#ef4444",
                borderRadius: "50%",
                border: "1.5px solid #fff",
                color: "#fff",
                fontSize: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
                lineHeight: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(el.id);
              }}
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
}
