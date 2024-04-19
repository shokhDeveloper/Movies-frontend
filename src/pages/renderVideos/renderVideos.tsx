import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context, getItem } from "../../settings";
import { ContextStates, InitialStateInterface, Video } from "../../settings/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { setVideos } from "../../settings/redux/slice";

export const RenderVideos:React.FC = ():JSX.Element => {
    const {videos}:InitialStateInterface = useSelector((state:RootState) => state.Reducer)
    const {videosLength, setVideosLength}:ContextStates = useContext(Context)
    const [videoBlob, setVideoBlob] = useState<string[]>([])
    const dispatch = useDispatch()
    const handleGetVideos = useCallback( async ():Promise<void> => {
        const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + "/admin/videos", {
            headers: {token: getItem("movies-token")}
        })
        if(req.status == 200){
            const res = await req.data;
            console.log("ishladi")
            setVideosLength(res.length)
            dispatch(setVideos(res))
        }
    }, [videosLength])
    const handleGetVideo = useCallback( async (videos:Video[]) => {
        if(videos && videos.length){
            let result = await Promise.all(
                videos.map( async (video:Video) => {
                    let req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + `/admin/video/${video.videoId}`, {
                        headers: {token: getItem("movies-token")},
                        responseType: "blob"
                    })
                    if(req.status == 200){
                        let res = await new Blob([req.data], {type: "video/mp4"})
                        console.log(res)
                        return URL.createObjectURL(res)
                    }
                })
            )
            setVideoBlob(result as string[])
        }
    }, [videosLength])
    useEffect(() => {
        handleGetVideos()
    },[handleGetVideos])
    useEffect(() => {
        handleGetVideo(videos as Video[]);
    },[handleGetVideo])
    return (
        <>
            <div className="movies__list row  list-unstyled mt-3 d-flex align-items-center justify-content-between">
            {videoBlob?.map((movie:string) => {
                console.log(movie)
              return (
                <div className="movies__item col-md-3 mt-3 js-movie-item">
                    <video controls autoPlay width={300} height={200}>
                        <source src={movie} type="video/mp4" />
                    </video>
                </div>
              )
            })} 
            </div>    
        </>
    )
}