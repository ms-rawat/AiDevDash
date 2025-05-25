import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCollapsed: false,
  width: 240,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { toggleCollapse, setWidth } = sidebarSlice.actions;
export default sidebarSlice.reducer;