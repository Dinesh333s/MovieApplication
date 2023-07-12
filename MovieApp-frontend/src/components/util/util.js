
//getting role from session storage
export const getSessionRole = () =>{
    console.log("called")
    return sessionStorage.getItem("role");
}

export const isLoggedIn = () =>{
    
    return sessionStorage.getItem("login");
}