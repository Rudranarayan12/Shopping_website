import { useState,useEffect,useContext,createContext } from "react";
import axios from "axios";
const AuthContext = createContext()



const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })

    //default properties
    axios.defaults.headers.common['Authorization']=auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parsedata=JSON.parse(data)
            setAuth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
            })
        }
        //eslint disable-next-line

    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
// custom hooks
const useAuth =()=> useContext(AuthContext)

export {useAuth,AuthProvider}