import type { CanvasElement } from "@/lib/types";

function download(name: string, content: string, type: string) {
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(new Blob([content], { type }));
  anchor.download = name;
  anchor.click();
}

export function exportJSON(elements: CanvasElement[]) {
  const data = elements.map(({ id: _id, ...rest }) => rest);
  download("layout.json", JSON.stringify(data, null, 2), "application/json");
}

export function exportJSX(elements: CanvasElement[]) {
  const indent = "  ";
  const lines = [
    "export default function Page() {",
    `${indent}return (`,
    `${indent}${indent}<div style={{ position: "relative", width: 800, minHeight: 600 }}>`,
  ];

  elements.forEach((el) => {
    const pos = `position: "absolute", left: ${el.x}, top: ${el.y}, width: ${el.w}, height: ${el.h}`;
    switch (el.type) {
      case "heading":
        lines.push(
          `${indent}${indent}${indent}<h1 style={{ ${pos}, fontSize: ${el.fontSize}, color: "${el.color}", fontWeight: "${el.fontWeight}" }}>${el.text}</h1>`
        );
        break;
      case "paragraph":
        lines.push(
          `${indent}${indent}${indent}<p style={{ ${pos}, fontSize: ${el.fontSize}, color: "${el.color}" }}>${el.text}</p>`
        );
        break;
      case "button":
        lines.push(
          `${indent}${indent}${indent}<button style={{ ${pos}, background: "${el.bg}", color: "${el.color}", fontSize: ${el.fontSize}, borderRadius: ${el.borderRadius}, border: "none" }}>${el.text}</button>`
        );
        break;
      case "image":
        lines.push(
          `${indent}${indent}${indent}<img src="${el.src ?? ""}" alt="${el.alt ?? "Image"}" style={{ ${pos}, background: "${el.bg}", objectFit: "cover" }} />`
        );
        break;
      case "divider":
        lines.push(
          `${indent}${indent}${indent}<hr style={{ ${pos}, borderColor: "${el.color}", borderTopWidth: ${el.thickness} }} />`
        );
        break;
      case "box":
        lines.push(
          `${indent}${indent}${indent}<div style={{ ${pos}, background: "${el.bg}", border: "1px solid ${el.borderColor}", borderRadius: ${el.borderRadius} }} />`
        );
        break;
      case "badge":
        lines.push(
          `${indent}${indent}${indent}<span style={{ ${pos}, background: "${el.bg}", color: "${el.color}", fontSize: ${el.fontSize}, borderRadius: ${el.borderRadius}, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>${el.text}</span>`
        );
        break;
      case "input":
        lines.push(
          `${indent}${indent}${indent}<input placeholder="${el.placeholder}" style={{ ${pos}, fontSize: ${el.fontSize}, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px" }} />`
        );
        break;
    }
  });

  lines.push(`${indent}${indent}</div>`, `${indent})`, "}");
  download("Page.jsx", lines.join("\n"), "text/plain");
}
