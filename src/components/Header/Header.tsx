import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Context, getItem } from "../../settings";
import { AdminToken, ContextStates, User, UserToken, pendingType } from "../../settings/types";
import { setParsedToken } from "../../settings/redux/slice";
export const Header: React.FC = (): JSX.Element => {
    const { user, parsedToken, token } = useSelector((state: RootState) => state.Reducer);
    const {avatarUrl, setAvatarUrl, setAdmin, admin}:ContextStates = useContext(Context)
    const dispatch = useDispatch()
    const handleGetUserAvatar = useCallback( async ():Promise<void> => {
        try{
            if(parsedToken && (parsedToken as AdminToken)?.admin){
                setAvatarUrl(null)
                setAdmin(true)
            }else if(parsedToken &&  (parsedToken as UserToken).userId){
                if(user){
                    const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + `/data/avatar/${(user as User).userId}`, {
                        headers: {token: getItem("movies-token")},
                        responseType: "arraybuffer",
                    })
                    if (req.status === 200) {
                        const blob = new Blob([req.data]);
                        const imageUrl = URL.createObjectURL(blob);
                        setAvatarUrl(imageUrl);
                    }
                }
            }
        }catch(error){
            console.log(error)
        }
            
    },[!user, parsedToken]);
    useEffect(() => {
        handleGetUserAvatar()
    },[handleGetUserAvatar])
    useEffect(() => {
        dispatch(setParsedToken(token as string))
    },[token])

    return (
        <header className="site-header bg-dark py-3 text-center text-light position-sticky top-0" style={{zIndex: 4}}>
            <div className="container position-relative">
                <div className="site-header__inner d-flex align-items-center justify-content-center">
                    <div className="site-header__title-box">
                        <h1 className="site-header__title">Movies</h1>
                    </div>
                    {token &&  (
                        <div className="avtor-badge position-absolute d-flex align-items-stretch end-0">
                            <NavLink className="text-dark bg-light d-inline-block p-2 text-decoration-none" to={!admin ? "/account": "/admin"}>{user?.username ? user.username : "admin"}</NavLink>
                            {avatarUrl ? (
                                <img className="ms-2 rounded-pill" src={ avatarUrl as string} width={30}  alt="" />
                            ): null}
                        </div>
                     )}
                </div>
            </div>
        </header>
    )
}