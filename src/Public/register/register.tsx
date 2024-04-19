import axios from "axios";
import React, { FormEvent, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { InitialStateInterface, User, pendingType } from "../../settings/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { setParsedToken, setToken, setUser, setUsers } from "../../settings/redux/slice";
import { useNavigate } from "react-router";

export const Register:React.FC = ():JSX.Element => {
    const {token}:InitialStateInterface = useSelector((state:RootState) => state.Reducer);
    const fileInputRef = useRef<pendingType<HTMLInputElement>>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const registerMutation = useMutation((user:FormData) => {
        return axios.post((process.env.REACT_APP_BECKEND_SERVER as string) + "/auth/register", user).then(res => {
            const {accessToken, user} = res.data;
            if(accessToken){
                dispatch(setToken(accessToken));
                dispatch(setUser(user))
                window.location.reload();
            }
        }).catch(err => err)
    })
    const handleSub = (evt:FormEvent):void => {
        evt.preventDefault();
        try{
            const formData = new FormData(evt.target as HTMLFormElement);
            const reqFormData = new FormData();

            const user:User = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
                email: formData.get("email") as string,
                signUserDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
            }
            if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
                reqFormData.append("avatar", fileInputRef.current.files[0]);
            }
            const type:boolean = Object.keys(user).every((key:string) => user[key] !== null || user[key] !== undefined)
            if(type){
                reqFormData.append("username", formData.get("username") as string);
                reqFormData.append("password", formData.get("password") as string);
                reqFormData.append("email", formData.get("email") as string);
                reqFormData.append("signUserDate",  new Date().toLocaleDateString().split(".").reverse().join("-"));
                registerMutation.mutate(reqFormData)
            }
        }catch(error){
            console.log(error, registerMutation.isError)
        }
    }
    return (
        <div className="hero__form-box w-50 mx-auto">
        <form className="hero__form w-75 mx-auto text-center" onSubmit={handleSub}>
            <output className="fs-2 mb-4">
                Register
            </output>
            <input className="form-control mb-3" type="text" placeholder="Username" name="username" />
            <input className="form-control mb-3" type="email" placeholder="Email" name="email" />
            <input className="form-control mb-3" type="password" placeholder="Password" name="password" />
            <input ref={fileInputRef} className="form-control mb-3" type="file"  />
            <button className="btn btn-primary" type="submit">Yuborish</button>
        </form>
        </div>
    )
}