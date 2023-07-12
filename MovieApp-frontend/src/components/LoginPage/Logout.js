import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () =>{

    const navigate = useNavigate();   

    useEffect(()=>{
        console.log("logout")        
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("login");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tokenType");
        navigate("/")
    })

    return (
        <>

        </>
    )
}

export default Logout;