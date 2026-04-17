import type { ReactNode } from "react";
import {
  AlignLeft,
  Box,
  Circle,
  Heading1,
  Image,
  Minus,
  SlidersHorizontal,
  TextCursor,
} from "lucide-react";
import type { CanvasElement, ElementType } from "@/lib/types";

export interface ComponentDef {
  type: ElementType;
  label: string;
  icon: ReactNode;
  defaults: Partial<CanvasElement>;
}

export const COMPONENTS: ComponentDef[] = [
  {
    type: "heading",
    label: "Heading",
    icon: <Heading1 className="w-4 h-4" />,
    defaults: {
      text: "Heading",
      fontSize: 28,
      color: "#111827",
      fontWeight: "bold",
      w: 300,
      h: 48,
    },
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: <AlignLeft className="w-4 h-4" />,
    defaults: {
      text: "Double-click to edit this paragraph.",
      fontSize: 14,
      color: "#374151",
      fontWeight: "normal",
      w: 300,
      h: 80,
    },
  },
  {
    type: "button",
    label: "Button",
    icon: <Box className="w-4 h-4" />,
    defaults: {
      text: "Click me",
      fontSize: 14,
      color: "#ffffff",
      bg: "#3b82f6",
      borderRadius: 6,
      w: 140,
      h: 42,
    },
  },
  {
    type: "image",
    label: "Image",
    icon: <Image className="w-4 h-4" />,
    defaults: { alt: "Image placeholder", bg: "#e5e7eb", w: 280, h: 180 },
  },
  {
    type: "divider",
    label: "Divider",
    icon: <Minus className="w-4 h-4" />,
    defaults: { color: "#e5e7eb", thickness: 2, w: 300, h: 20 },
  },
  {
    type: "box",
    label: "Box / Card",
    icon: <SlidersHorizontal className="w-4 h-4" />,
    defaults: { bg: "#f9fafb", borderColor: "#e5e7eb", borderRadius: 8, w: 280, h: 160 },
  },
  {
    type: "badge",
    label: "Badge",
    icon: <Circle className="w-4 h-4" />,
    defaults: {
      text: "Badge",
      fontSize: 12,
      color: "#1d4ed8",
      bg: "#dbeafe",
      borderRadius: 20,
      w: 100,
      h: 30,
    },
  },
  {
    type: "input",
    label: "Input field",
    icon: <TextCursor className="w-4 h-4" />,
    defaults: { placeholder: "Type here...", fontSize: 13, w: 240, h: 40 },
  },
];
