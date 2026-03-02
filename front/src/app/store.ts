import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/counter/themeSlice";
import integrateReducer from "../features/counter/integrateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    theme: themeReducer,
    integrate: integrateReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
}) 

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;