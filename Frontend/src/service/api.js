import axios from "axios";
const URL="http://localhost:8000";

const api=axios.create({
    baseURL:URL,
});

export const SignUpApi=(user)=>{
    return api.post('/signup',user);
}

export const LoginApi=(user)=>{
    return api.post('/login',user);
}