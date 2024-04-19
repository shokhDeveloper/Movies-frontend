import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../settings/redux/combine";
import { Context, getItem } from "../../settings";
import React, { FormEvent, useCallback, useContext, useEffect, useRef } from "react"
import { ContextStates, UpdateUser, User, pendingType } from "../../settings/types"
import { setUser } from "../../settings/redux/slice";

export const Account: React.FC = (): JSX.Element => {
    const { user } = useSelector((state: RootState) => state.Reducer);
    const { defUser, setDefUser, setAvatarUrl }: ContextStates = useContext(Context)
    const fileUploadRef = useRef<pendingType<HTMLInputElement>>(null);
    const dispatch = useDispatch()
    const handleGetDefUser = useCallback(async (): Promise<void> => {
        const req = await axios.get(process.env.REACT_APP_BECKEND_SERVER + `/users/${(user as User).userId}`, {
            headers: { token: getItem("movies-token") }
        });
        if (req.status == 200) {
            const res = await req.data;
            console.log(res)
            setDefUser(res)
        }
    }, [!defUser]);
    const handleUpdateUser = async (evt: FormEvent): Promise<void> => {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        let updateData: UpdateUser = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        
        if (fileUploadRef && fileUploadRef.current && fileUploadRef.current.files && fileUploadRef.current.files[0]) {
            updateData.avatar = fileUploadRef.current.files[0];
        }
        
        const type = Object.values(updateData).some((val: string) => val !== '');
        if (type) {
            const payloadFormData = new FormData();
            const filledKeys = Object.keys(updateData).filter(key => updateData[key as keyof UpdateUser] !== '');
            let filteredUpdateData: UpdateUser = {};
            filledKeys.forEach(key => {
                filteredUpdateData[key as keyof UpdateUser] = updateData[key as keyof UpdateUser];
                if (key === "avatar") {
                    payloadFormData.append("avatar", filteredUpdateData.avatar as File | Blob);
                }else{
                    payloadFormData.append(key as string, filteredUpdateData[key] as string | Blob | File);
                }
            });
        
            if (payloadFormData) {
                console.log(filteredUpdateData);
                const req = await axios.put(
                    process.env.REACT_APP_BECKEND_SERVER + `/update/user/${(user as User)?.userId}`,
                    payloadFormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'token': getItem("movies-token")
                        }
                    }
                );
                const res = await req.data;
                dispatch(setUser(res.user));
                handleGetDefUser();
                setAvatarUrl(null)
            }
        }
    };
    
    useEffect(() => {
        handleGetDefUser()
    }, [handleGetDefUser])
    return (
        <div className="hero__form-box w-50 mx-auto">
            <form className="hero__form w-75 mx-auto text-center" onSubmit={handleUpdateUser}>
    <output className="fs-2 mb-4">
        Update
    </output>
    <input className="form-control mb-3" type="text" placeholder="Username" name="username" defaultValue={defUser?.username} />
    <input className="form-control mb-3" type="email" placeholder="Email" name="email" defaultValue={defUser?.email} />
    <input className="form-control mb-3" type="password" placeholder="Password" name="password" />
    <input ref={fileUploadRef} className="form-control mb-3" type="file" name="avatar" />
    <button className="btn btn-primary" type="submit">Yuborish</button>
</form>
        </div>
    )
}