import React, { FormEvent } from "react";
import { User } from "../../settings/types";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setParsedToken, setToken, setUser } from "../../settings/redux/slice";
import { useNavigate } from "react-router";

export const Login:React.FC = ():JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {mutate} = useMutation((user:User) => {
        return axios.post(process.env.REACT_APP_BECKEND_SERVER + "/auth/login", user).then(res => {
            const {accessToken, user} = res.data;
            if(accessToken){
                dispatch(setToken(accessToken));
                dispatch(setUser(user));
                window.location.reload()
            }
            return res.data
        }).catch(err => console.log(err))
    })
    const handleSub = (evt:FormEvent):void => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const user:User = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }
        const type:boolean = Object.keys(user).every(key => user[key] !== null || user[key] !== undefined);
        if(type) mutate(user)
        else throw new Error("User invalid")
    }
    return (
        <div className="hero__form-box w-50 mx-auto">
        <form className="hero__form w-75 mx-auto text-center" onSubmit={handleSub}>
            <output className="fs-2 mb-4">
               Login
            </output>
            <input className="form-control mb-3" type="email" placeholder="Email" name="email" />
            <input className="form-control mb-3" type="password" placeholder="Password" name="password" />
            <button className="btn btn-primary" type="submit">Yuborish</button>
        </form>
        </div>
    )
}