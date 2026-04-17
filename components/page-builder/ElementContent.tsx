import { Image } from "lucide-react";
import type { CanvasElement } from "@/lib/types";

export function ElementContent({ el }: { el: CanvasElement }) {
  switch (el.type) {
    case "heading":
      return (
        <div
          data-editable="true"
          style={{ fontSize: el.fontSize, color: el.color, fontWeight: el.fontWeight, lineHeight: 1.2 }}
          className="w-full h-full flex items-center px-1 overflow-hidden"
        >
          {el.text}
        </div>
      );
    case "paragraph":
      return (
        <div
          data-editable="true"
          style={{ fontSize: el.fontSize, color: el.color, fontWeight: el.fontWeight, lineHeight: 1.6 }}
          className="w-full h-full px-1 overflow-hidden"
        >
          {el.text}
        </div>
      );
    case "button":
      return (
        <button
          style={{
            background: el.bg,
            color: el.color,
            fontSize: el.fontSize,
            borderRadius: el.borderRadius,
            fontWeight: 600,
          }}
          className="w-full h-full border-none cursor-pointer"
        >
          <span data-editable="true">{el.text}</span>
        </button>
      );
    case "image":
      if (el.src) {
        return (
          <img
            src={el.src}
            alt={el.alt ?? "Uploaded image"}
            className="w-full h-full rounded object-cover"
            draggable={false}
          />
        );
      }
      return (
        <div
          style={{ background: el.bg }}
          className="w-full h-full flex items-center justify-center rounded border border-dashed border-gray-300"
        >
          <Image className="w-8 h-8 text-gray-400" />
        </div>
      );
    case "divider":
      return (
        <div className="w-full h-full flex items-center">
          <div style={{ background: el.color, height: el.thickness }} className="w-full" />
        </div>
      );
    case "box":
      return (
        <div
          style={{ background: el.bg, border: `1px solid ${el.borderColor}`, borderRadius: el.borderRadius }}
          className="w-full h-full"
        />
      );
    case "badge":
      return (
        <div
          data-editable="true"
          style={{ background: el.bg, color: el.color, fontSize: el.fontSize, borderRadius: el.borderRadius, fontWeight: 600 }}
          className="w-full h-full flex items-center justify-center"
        >
          {el.text}
        </div>
      );
    case "input":
      return (
        <input
          placeholder={el.placeholder}
          style={{ fontSize: el.fontSize }}
          className="w-full h-full border border-gray-300 rounded-md px-3 bg-white text-gray-900 outline-none"
          onClick={(e) => e.stopPropagation()}
        />
      );
    default:
      return <div className="w-full h-full bg-gray-100" />;
  }
}
