import { Navigate, Route, Routes } from "react-router"
import { Register } from "../register"
import { Login } from "../login"
import { Admin } from "../../pages"

export const Home:React.FC = ():JSX.Element => {
    return(
        <section className="hero mt-3 d-flex align-items-center" style={{minHeight: "85vh"}}>
            <div className="container">
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/admin" element={<Admin/>}/>
            <Route path="*" element={<Navigate replace={true} to={"/"}/>}/>
        </Routes>
            </div>
        </section>
    )
}