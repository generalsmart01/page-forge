import { create } from "zustand";
import type { CanvasElement } from "@/lib/types";

interface BuilderState {
  elements: CanvasElement[];
  selectedId: string | null;
  history: CanvasElement[][];
  future: CanvasElement[][];
  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, patch: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, patch: Partial<CanvasElement>) => void;
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

let idCounter = 0;
const STORAGE_KEY = "pageforge_v2";

export const uid = () => `el_${Date.now()}_${++idCounter}`;
export const snap = (v: number) => Math.round(v / 10) * 10;

export const useBuilderStore = create<BuilderState>((set, get) => ({
  elements: [],
  selectedId: null,
  history: [],
  future: [],

  saveHistory: () => {
    set((s) => ({
      history: [...s.history.slice(-39), [...s.elements]],
      future: [],
    }));
  },

  addElement: (el) => {
    get().saveHistory();
    set((s) => ({ elements: [...s.elements, el], selectedId: el.id }));
  },

  updateElement: (id, patch) => {
    set((s) => ({
      elements: s.elements.map((el) => (el.id === id ? { ...el, ...patch } : el)),
    }));
  },

  removeElement: (id) => {
    get().saveHistory();
    set((s) => ({
      elements: s.elements.filter((el) => el.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    }));
  },

  selectElement: (id) => set({ selectedId: id }),

  moveElement: (id, x, y) => {
    set((s) => ({
      elements: s.elements.map((el) =>
        el.id === id ? { ...el, x: snap(x), y: snap(y) } : el
      ),
    }));
  },

  resizeElement: (id, patch) => {
    set((s) => ({
      elements: s.elements.map((el) =>
        el.id === id
          ? {
              ...el,
              ...Object.fromEntries(
                Object.entries(patch).map(([k, v]) => [
                  k,
                  typeof v === "number" ? snap(v as number) : v,
                ])
              ),
            }
          : el
      ),
    }));
  },

  undo: () => {
    const { history, elements } = get();
    if (!history.length) return;
    const prev = history[history.length - 1];
    set((s) => ({
      history: s.history.slice(0, -1),
      future: [elements, ...s.future.slice(0, 39)],
      elements: prev,
      selectedId: null,
    }));
  },

  redo: () => {
    const { future, elements } = get();
    if (!future.length) return;
    const next = future[0];
    set((s) => ({
      future: s.future.slice(1),
      history: [...s.history.slice(-39), elements],
      elements: next,
      selectedId: null,
    }));
  },

  clearCanvas: () => {
    get().saveHistory();
    set({ elements: [], selectedId: null });
  },

  saveToStorage: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get().elements));
    } catch {}
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) set({ elements: JSON.parse(raw) });
    } catch {}
  },
}));
