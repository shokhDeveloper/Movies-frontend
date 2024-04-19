import axios from "axios"
import { InitialStateInterface, Movie } from "../../settings/types";
import { getItem } from "../../settings";
import { Form, MoreModal, Pagination } from "../../components";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { setMovieId, setMoviesData, setMaxPage, setToken, setUser } from "../../settings/redux/slice";
export const Home: React.FC = (): JSX.Element => {
  const { movies, maxPage, page, searchMovie, user, token }: InitialStateInterface = useSelector((state: RootState) => state.Reducer)
  const dispatch = useDispatch();
  const handleGetMovies = useCallback(async (): Promise<void> => {
    try{

      const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + "/data/movies", {
        params: {
          page, 
          ...searchMovie
        },
        headers: {
          token: getItem("movies-token")
        }
      });
      if(req.status == 200){
        const res = await req.data;
        dispatch(setMaxPage(res.maxPage))
        dispatch(setMoviesData(res.movies));
        return res  
      }else if(req.status == 401){
        window.localStorage.clear();
        dispatch(setToken(null));
        dispatch(setUser(null))
      }
    }catch(error){
      console.log(error)
    }
  }, [!movies, page])
  useEffect(() => {
    handleGetMovies()
  }, [handleGetMovies]);
  return (
    <section className="movies mt-3">
      <div className="container position-relative">
        <button className="btn btn-primary position-fixed  mt-5  end-0 me-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#canvas" aria-controls="canvas" style={{ zIndex: 2 }}>
          <span className="position-absolute js-movie-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
            99+
            <span className="visually-hidden">unread messages</span>
          </span>
          Bookmark
        </button>
        <div className="movies__inner">
          <div className="movies__inner-form-box">
            <Form />
          </div>
          <div className="movies__list row  list-unstyled mt-3 d-flex align-items-center justify-content-between">
            {movies?.map((movie: Movie) => {
              return (
                <div className="movies__item col-md-3 mt-3 js-movie-item">
                  <div className="movie__card card">
                    <img
                      className="movie__img card-img-top js-movie-image"
                      width="300"
                      height="170"
                      src={movie.img_url}
                      alt="Movie image"
                    />
                    <div className="card-body">
                      <h3 className="movie__title h5 card-title js-movie-title">
                        {movie.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <div className="d-flex small justify-content-between flex-wrap py-2">
                        <span className="d-flex align-items-center">

                          <span className="movie__ratingm me-2 ms-1 js-movie-rating">7</span>
                        </span>
                        <span className="d-flex align-items-center">

                          <span className="movie__year ms-1 js-movie-year">{movie.movie_year}</span>
                        </span>
                        <span className="d-flex align-items-center">

                          <span className="movie__duration me-2 js-movie-runtime"
                          >{(
                            movie.runtime / 60
                          )
                            .toFixed(1)
                            .toString()
                            .split(".")
                            .join(" hours ")
                            .concat(" min")}</span>
                        </span>
                      </div>
                      <p className="movie__categories card-text js-movie-text">
                        {movie.categories.slice(0, 3).join(", ")}
                      </p>
                      <button className="btn btn-info text-light btn-sm d-block w-100 js-more-info" data-bs-toggle="modal" data-bs-target="#movie-more-modal" onClick={() => dispatch(setMovieId(movie.imdb_id))}>
                        More info
                      </button>
                      <button className="js-bookmark btn btn-warning mt-3 d-block w-100 btn-sm d-flex align-items-center justify-content-center">
                        Bookmark
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            <MoreModal />
          </div>
        </div>
      </div>
      {movies && maxPage ? <Pagination pageCount={maxPage}/>: false }
    </section>
  )
}