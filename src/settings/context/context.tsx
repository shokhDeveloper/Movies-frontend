import React, { ReactNode, createContext, useState } from "react";
import { ContextStates, Movie, User, pendingType } from "../types";


export const Context = createContext<ContextStates | any >(null)
export const ContextProvider:React.FC<{children: ReactNode}> = ({children}):JSX.Element => {
    const [movies, setMovies] = useState<pendingType<Movie[]>>(null);
    const [categories, setCategories] = useState<pendingType<string[]>>(null);
    const [defUser, setDefUser] = useState<pendingType<User>>(null)
    const [avatarUrl, setAvatarUrl] = useState<pendingType<string>>(null)
    const [videosLength, setVideosLength] = useState<number>(0)
    const [admin, setAdmin] = useState<boolean>(false)
    const contextStates:ContextStates = {
        movies,
        setMovies,
        categories,
        setCategories,
        defUser, setDefUser,
        avatarUrl, setAvatarUrl,
        admin, setAdmin,
        videosLength, setVideosLength
    }
    return (
        <Context.Provider value={contextStates}>
            {children}
        </Context.Provider>
    )
}