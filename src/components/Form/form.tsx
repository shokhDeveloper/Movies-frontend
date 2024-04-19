import React, { FormEvent, useCallback, useContext, useEffect } from "react";
import { ContextStates, Movie, pendingType } from "../../settings/types";
import axios from "axios";
import { Context, getItem } from "../../settings";
import { useDispatch } from "react-redux";
import { setMaxPage, setMoviesData, setSearchMovie, setToken, setUser } from "../../settings/redux/slice";

export const Form: React.FC = (): JSX.Element => {
    const { movies, setMovies, setCategories, categories }: ContextStates = useContext(Context)
    const dispatch = useDispatch();
    const handleGetCategory = useCallback(async (): Promise<void> => {
        try{
            const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + "/data/movies", {
                headers: { token: getItem("movies-token") }
            });
            if (req.status == 200) {
                const res = await req.data;
                setMovies(res.movies)
            } else if(req.status == 401){
                window.localStorage.clear();
                dispatch(setToken(null));
                dispatch(setUser(null))
            }
        }catch(error){
            console.log(error)
        }

    },[!movies])
    const handleFilterCategory = ():void => {
        let res:string[] = []
        if(movies && movies?.length){
            movies?.map((movie:Movie) => {
                const categories = movie.categories;    
                categories.map((categorie:string) => {
                    if(!res.includes(categorie)) res.push(categorie)
                })
            });
            setCategories(res);
        }
    }
    const handleSortMovies = (movies:Movie[], sortValue:pendingType<string> ):Movie[] => {
        if(sortValue == "az") movies.sort((a:Movie, b:Movie) => a.title.charCodeAt(0) < b.title.charCodeAt(0) ? -1 : 1);   
        if(sortValue == "za") movies.sort((a:Movie, b:Movie) => a.title.charCodeAt(0) > b.title.charCodeAt(0) ? -   1: 1);
        if(sortValue == "old-year") movies.sort((a:Movie, b:Movie) => a.movie_year < b.movie_year ? 1: -1);
        if(sortValue == "new-year") movies.sort((a:Movie, b:Movie) => a.movie_year < b.movie_year ? 1: -1 )
        
        return movies;
    }
    const handleSub = async (evt: FormEvent): Promise<void> => {
        const formData = new FormData(evt.target as HTMLFormElement);
        evt.preventDefault();
        const searchMovie = {
            title: (formData.get("search") as string).length ? formData.get("search"): null ,
            categorie: (formData.get("categorie") as string).length ? formData.get("categorie"): null,
            min_year: (formData.get("min_year") as string).length ? formData.get("min_year"): null,
            max_year: (formData.get("max_year") as string).length ? formData.get("max_year"): null,
        }
        dispatch(setSearchMovie(searchMovie))
        try{
            const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + "/data/movies", {
                params: {
                    ...searchMovie
                },
                headers: {token: getItem("movies-token")}
            });
            if(req.status == 200){
                const res = await req.data;
                if(formData.get("sort")){
                    let result = handleSortMovies(res.movies, formData.get("sort") ? formData.get("sort") as string: null)
                    dispatch(setMoviesData(result))
                    dispatch(setMaxPage(res.maxPage))
                }
                dispatch(setMaxPage(res.maxPage))
                dispatch(setMoviesData(res.movies))   
            }else if(req.status == 401){
                window.localStorage.clear();
                dispatch(setToken(null));
                dispatch(setUser(null))   
            }else if(req.status == 404) throw new Error((await req.data).message)
        }catch(error){
            if(error instanceof Error) alert("The movies not found");
            console.log(console.log(error))
        }
    }
    useEffect(() => {
        handleGetCategory()
        handleFilterCategory()
    },[handleGetCategory])

    return (
        <form onSubmit={handleSub} className="js-form d-flex align-items-center">
            <input className="form-control js-search-input" type="text" placeholder="Search movie ..." name="search" aria-label="Searchmovie ..." id="search"
            />
            <input className="form-control js-min-year-input mx-2" type="text" placeholder="Min year ..." name="min_year" min="2000" aria-label="Minyear " id="min" />
            <input className="form-control js-max-year-input" type="text" placeholder="Max year ..." name="max_year" aria-label="Search movie ..." id="max" max="2018" />
            <select className="form-control mx-2 js-categories-select" name="categorie" aria-label="Enter categorie movie " id="categorie">
                <option value="all">All</option>
                {categories?.map((categorie: string, index: number) => {
                    return (
                        <option key={index} value={categorie}>{categorie}</option>
                    )
                })}
            </select>
            <select
                className="form-control js-sort-select me-2"
                name="sort"
                aria-label="Enter sort movie "
                id="sort"
            >
                <option value="" selected disabled hidden>Sort Movies</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="old-year">Old Year</option>
                <option value="new-year">New Year</option>
            </select>
            <button className="btn btn-primary">Search</button>
        </form>
    )
}