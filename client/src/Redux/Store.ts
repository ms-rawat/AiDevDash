import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer from './ReduxSlices/SidebarSlice'
export const store = configureStore({
    reducer :{
        sidebar : SidebarReducer,

    }
})

