import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

interface ThemeState {
    isDarkMode: boolean
}

const initialState: ThemeState = {
    isDarkMode: false,
}
//  satisfies ThemeState
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkMode: (state) => {
            state.isDarkMode = true
        },
        lightMode: (state) => {
            state.isDarkMode = false
        },
        toggleMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
    },
})

export const {darkMode, lightMode, toggleMode} = themeSlice.actions;

export const selectMode = (state: RootState) => state.theme.isDarkMode

export default themeSlice.reducer;