import api from './../lib/api';

export const signup = async (email:string , password:string , name : string)=>{
    const response = await api.post("/auth/signup" , {email , password , name});
    return response.data;
}
export const login = async (email:string , password:string)=>{
    const response = await api.post("/auth/login" , {email , password});
    return response.data;
}
export const logout = async ()=>{
    const response = await api.post("/auth/logout");
    return response.data;
}

export const getCurrentUser = async()=>{
    const response = await api.get("/auth/me");
    return response.data;
}
