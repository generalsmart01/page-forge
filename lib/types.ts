export type ElementType =
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "divider"
  | "box"
  | "badge"
  | "input";

export type ResizeHandle = "tl" | "tr" | "bl" | "br" | "t" | "b" | "l" | "r";

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  bg?: string;
  borderColor?: string;
  borderRadius?: number;
  thickness?: number;
  alt?: string;
  src?: string;
  placeholder?: string;
}
