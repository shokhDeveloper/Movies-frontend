import { storageType } from "../types";

export const getItem = (key:string):storageType<string> => window.localStorage.getItem(key)
export const setItem = (key:string, value: object | string ):void => window.localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value): value);