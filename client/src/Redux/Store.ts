import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer from './ReduxSlices/SidebarSlice'
import ThemeReducer from './ReduxSlices/themeSlice'
export const store = configureStore({
    reducer :{
        sidebar : SidebarReducer,
        theme : ThemeReducer

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;