import create from "zustand";
import { persist } from "zustand/middleware";

const initialStates = {
  isDownload: false,
  viewType: "3d",
  direction: "forceDirected3d",
  animation: "orbit",
  fullScreen: false,
};

export const useStored = create(
  persist(
    (set) => ({
      ...initialStates,
      setView: (value) => set({ viewType: value }),
      setDirection: (value) => set({ direction: value }),
      setAnimation: (value) => set({ animation: value }),
      setIsDownload: (value) => set({ isDownload: value }),
      setFullScreen: (value) => set({ fullScreen: value }),
    }),
    {
      name: "config",
    }
  )
);
