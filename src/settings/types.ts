import React from "react";

export interface InitialStateInterface {
  users: User[];
  token: string | null;
  user: User | AdminInterface | null;
  movies: pendingType<Movie[]>,
  imdb_id: pendingType<string>,
  movie: Movie[],
  maxPage: number,
  page: number,
  searchMovie: object,
  parsedToken: UserToken | AdminToken | null,
  videos: pendingType<Video[]>
}
export interface Video {
  video: Blob | File | null,
  videoTitle: string,
  videoId: number
}
export interface User {
  [key: string]: string | any;
  username?: string;
  email: string;
  password: string;
  signUserDate?: string;
  userId?: number | string 
}
export interface ContextStates {
    movies: pendingType<Movie[]>,
    setMovies: React.Dispatch<React.SetStateAction<pendingType<Movie[]>>>,
    categories: pendingType<string[]>,
    setCategories: React.Dispatch<React.SetStateAction<pendingType<string[]>>>,
    defUser: pendingType<User>,
    setDefUser: React.Dispatch<React.SetStateAction<pendingType<User>>>,
    avatarUrl: pendingType<string>,
    setAvatarUrl: React.Dispatch<React.SetStateAction<pendingType<string>>>
    admin: boolean,
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>,
    videosLength: number,
    setVideosLength:React.Dispatch<React.SetStateAction<number>>
}
export interface Movie {
  title: string;
  fulltitle: string;
  movie_year: number;
  categories: string[];
  summary: string;
  img_url: string;
  imdb_id: string;
  imdb_rating: number;
  runtime: number;
  language: string;
  youtube_id: string;
  movie_frame: string;
  imdb_link: string;
}
export type storageType<T> = T | null;
export type pendingType<T> = T | null;
export interface PaginationInterface {
  pageCount: number
}
export interface ReactPaginateProps {
  selected: number
}
export type SearchMovie = object
export interface UpdateUser {
  username?: string;
  email?: string;
  password?: string;
  avatar?: File | Blob | undefined;
  [key: string]: string | any;
}
export interface AdminInterface {
  username: string,
  password: string
};
export type AdminToken = {
  admin: boolean,
  userAgent: string
}
export type UserToken = {
  userId: number | string,
  userAgent: string
}