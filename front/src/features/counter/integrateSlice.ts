import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

interface Integrate {
    integrate: {
        ad: boolean,
        keycloak: boolean
    }
}

const initialState: Integrate = {
    integrate: {
        "ad": false,
        "keycloak": false
    },
}

export const integrateSlice = createSlice({
    name: 'integrate',
    initialState,
    reducers: {
        toggleIntegrateAD: (state) => {
            state.integrate.ad = !state.integrate.ad
        },
        toggleIntegrateKeycloak: (state) => {
            state.integrate.keycloak = !state.integrate.keycloak
        }
    }
})

export const {toggleIntegrateAD, toggleIntegrateKeycloak} = integrateSlice.actions;

export const integrate = (state: RootState) => state.integrate.integrate

export default integrateSlice.reducer;