import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { getItem } from "../../settings";
import { setMovie } from "../../settings/redux/slice";
import { Movie } from "../../settings/types";

export const MoreModal: React.FC = (): JSX.Element => {
    const { imdb_id, movie } = useSelector((state: RootState) => state.Reducer);
    const [type, setType] = useState<boolean>(false)
    const dispatch = useDispatch();;

    const handleGetMovie = useCallback(async (): Promise<void> => {
        const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + "/data/movies", {
            headers: { token: getItem("movies-token") },
            params: {
                imdb_id: imdb_id
            }
        })
        if (req.status == 200) {
            const res = await req.data;
            if (res.length) {
                dispatch(setMovie(res));
                setType(true)
            }
        }
    }, [imdb_id])

    useEffect(() => {
        handleGetMovie()
    }, [handleGetMovie])
    return (
        <div className="modal fade js-movie-modal" id="movie-more-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ width: "1500px !important", minWidth: "1000px" }}>
                {type && movie?.map((movie: Movie) => {
                    return (
                        <div className="modal-content w-100 mx-auto">
                            <div className="modal-header d-flex align-items-center justify-content-between ">
                                <h3 className="modal-title" id="movie-more-modal">Movie data</h3>
                                <button
                                    className={"btn btn-danger btn-small p-0 px-2 fs-5 d-flex align-items-center"}
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    data-bs-toggle="modal"
                                    data-bs-target="#movie-more-modal"
                                >   
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row justify-content-between align-items-stretch">
                                    <div className="col-md-5">
                                        <iframe
                                            className="js-movie-iframe-image"
                                            width="500"
                                            height="360"
                                            src={movie.movie_frame}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen={true}
                                        ></iframe>
                                    </div>
                                    <div className="col-md-5">
                                        <h3 className="movie-title js-movie-modal-title">
                                            {movie.fulltitle}
                                        </h3>
                                        <div
                                            className="d-flex small justify-content-between flex-wrap py-2"
                                        >
                                            <span className="d-flex align-items-center">

                                                <span className="movie__ratingm me-2 ms-1 js-movie-rating"
                                                >{movie.imdb_rating}</span>
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
                                            {movie.categories.join(", ")}
                                        </p>
                                        <p className="movie__summary card-text js-movie-summary">{movie.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
