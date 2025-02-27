import {combineReducers} from "@reduxjs/toolkit"
import { Reducer } from "./slice"
export const RootReducer = combineReducers({
    Reducer
})
export type RootState = ReturnType<typeof RootReducer>;