import { createStore, useStore } from "zustand";

export interface SceneState {
  scrollDirection: "up" | "down";
  scrolled: boolean;
  mouseNDC: { x: number; y: number };
  hovered: boolean;
}

const initialState: SceneState = {
  scrollDirection: "up",
  scrolled: false,
  mouseNDC: { x: 0, y: 0 },
  hovered: false,
};

export const sceneStore = createStore<SceneState>(() => initialState);

export function useSceneStore<T>(selector: (state: SceneState) => T): T {
  return useStore(sceneStore, selector);
}
