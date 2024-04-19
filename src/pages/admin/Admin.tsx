import React, { FormEvent } from "react";
import { AdminInterface } from "../../settings/types";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { setParsedToken, setToken, setUser } from "../../settings/redux/slice";

export const Admin:React.FC = ():JSX.Element => {
    const dispatch = useDispatch();
    const {mutate} = useMutation( async (user:AdminInterface):Promise<void> => {
        const req = await axios.post(process.env.REACT_APP_BECKEND_SERVER + "/auth/admin", user);
        if(req.status == 200){
            const {accessToken, user} = await req.data
            if(accessToken) {
                dispatch(setToken(accessToken));
                dispatch(setUser(user))
                window.location.reload()
            }
        }
    })

    const handleSub = async (evt:FormEvent):Promise<void> => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const admin:AdminInterface = {
            username: formData.get("username") as string,
            password: formData.get("password") as string
        };
        mutate(admin)
    }
    return (
        <div className="hero__form-box w-50 mx-auto">
        <form className="hero__form w-75 mx-auto text-center" onSubmit={handleSub}>
            <output className="fs-2 mb-4">
               Admin
            </output>
            <input className="form-control mb-3" type="text" placeholder="Username Admin" name="username" />
            <input className="form-control mb-3" type="password" placeholder="Password" name="password" />
            <button className="btn btn-primary" type="submit">Yuborish</button>
        </form>
        </div>
    )
}