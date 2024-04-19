import axios from "axios"
import { FormEvent, useRef } from "react"
import { getItem } from "../../settings"
import { RenderVideos } from "../renderVideos"

export const AdminPrivate: React.FC = (): JSX.Element => {
    const videoRef = useRef<HTMLInputElement | null>(null);
    
    const handleSubVideo = async (evt:FormEvent):Promise<void> => {
        evt.preventDefault();
        const dataFormData = new FormData(evt.target as HTMLFormElement)

        const formData = new FormData();
        if(videoRef.current && videoRef.current.files){
            formData.append("video", videoRef.current?.files[0] )     
        }
        formData.append("videoTitle", dataFormData.get("videoTitle") as string)
        if((formData.get("video") as File).name && formData.get("videoTitle")){
            const req = await axios.post(process.env.REACT_APP_BECKEND_SERVER + "/admin/video/upload", formData, {
                headers: {token: getItem("movies-token") }
            })
            if(req.status == 200){
                const res = await req.data ;
                console.log(res)
            }else if(req.status == 400){
                alert("ERROR");

            }
        }else{
            alert("Video title and video is required !")
        }
    }
    return (
        <>
            <div className="hero mt-3">
                <div className="container position-relative">
                    <div className="hero__inner d-flex justify-content-center">
                    <div className="hero__info-box text-center mt-3 text-center w-50 text-end">    
                        <h2>File Upload | Edit | Delete</h2>
                    </div>
                        <form onSubmit={handleSubVideo} className="w-50 text-center" style={{width: "30%"}}>
                            <input className="form-control" ref={videoRef} type="file" name="video" />
                            <input className="form-control my-2" type="text" name="videoTitle" placeholder="Video title" />
                            <button className="btn btn-primary">Send</button>
                        </form>
                    </div>
                    <RenderVideos/>
                </div>
            </div>
        </>
    )
}