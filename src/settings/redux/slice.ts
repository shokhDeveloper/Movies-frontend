import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminInterface, InitialStateInterface, Movie, SearchMovie, User, Video, pendingType } from "../types";
import { getItem, setItem } from "../utils";

const initialState:InitialStateInterface = {
    users: [],
    token: getItem("movies-token"),
    user: getItem("movies-user") ? JSON.parse(getItem("movies-user")!): null,
    movies: [],
    imdb_id: null,
    movie: [],
    maxPage: 0,
    page: 1,
    searchMovie: {},
    parsedToken: null,
    videos: null
}

const slice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setUsers(state, action:PayloadAction<User[]>){
            state.users = action.payload;
        },
        setToken(state, action:PayloadAction<pendingType<string>>){
            if(action.payload){
                state.token = action.payload;
                setItem("movies-token", state.token)   
            }else state.token = null
        },
        setUser(state, action:PayloadAction<User | AdminInterface | null>){
            if(action.payload){
                state.user = action.payload
                setItem("movies-user", state.user) 
            }state.user = null
        },
        setMoviesData(state, action:PayloadAction<Movie[]>){
            state.movies = action.payload
        },
        setMovieId(state, action:PayloadAction<string>){
            state.imdb_id = action.payload;
        },
        setMovie(state, action:PayloadAction<Movie[]>){
            state.movie = action.payload;
        },
        setMaxPage(state, action:PayloadAction<number>){
            state.maxPage = action.payload;
        },
        setPageChange(state, action:PayloadAction<number>){
            state.page = action.payload
        },
        setSearchMovie(state, action:PayloadAction<SearchMovie>){
            state.searchMovie = action.payload;
        },
        setParsedToken(state, action:PayloadAction<string>){
            if(action.payload){
                state.parsedToken = JSON.parse(atob(action.payload.split(".")[1])); 
            }else state.parsedToken = null
        },
        setVideos(state, action:PayloadAction<pendingType<Video[]>>){
            state.videos = action.payload;
        }
    }
})
export const Reducer = slice.reducer;
export const {setUsers, setToken, setUser, setMoviesData, setMovieId, setMovie, setMaxPage, setPageChange, setSearchMovie, setParsedToken, setVideos} = slice.actions