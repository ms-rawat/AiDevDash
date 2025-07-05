// sidebarSlice.ts (with TypeScript)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ScreenSize = "mobile" | "tablet" | "desktop";

interface SidebarState {
  screenSize: ScreenSize;
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  width: number;
}

const initialState: SidebarState = {
  screenSize: "desktop",
  isSidebarOpen: true,
  isCollapsed: false,
  width: 240,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<ScreenSize>) => {
      state.screenSize = action.payload;

      // Auto close sidebar on mobile/tablet
      if (action.payload === "mobile") {
        state.isSidebarOpen = false;
        state.isCollapsed = false; // Reset collapse
      } else if (action.payload === "tablet") {
        state.isSidebarOpen = true;
        state.isCollapsed = true; // Tablet starts collapsed
      } else {
        state.isSidebarOpen = true;
        state.isCollapsed = false;
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const {
  setScreenSize,
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleCollapse,
  setCollapsed,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
