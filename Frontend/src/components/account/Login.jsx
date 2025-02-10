import {Box,TextField,Button, styled, Typography} from "@mui/material";
import { useState,useContext } from "react";
import { LoginApi, SignUpApi } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component=styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6)
`

const Image=styled('img')({
    width:100,
    margin:"auto",
    display:"flex",
    padding:"50px 0 0"
});

const Wrapper=styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & >div,& >button,& >p{
        margin-top:20px;
    }
`

const LoginButton=styled(Button)`
    text-transform:none;   
`
const SignUpButton=styled(Button)`
    text-transform:none;  
    color:#2874F0 ;
    box-shadow:0 2px 4px 0 rgb(0 0 0/20%)
`

const Text=styled(Typography)`
    color:#878787
`

const Error=styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
    text-align:center
`

const emptyUser_SignUp={
    name:"",
    username:"",
    password:""
}
const emptyUser_Login={
    username:"",
    password:""
}

const Login=()=>{
    const [page,togglePage]=useState(true);
    const imageURL="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    const [signUpUser,setSignUpUser]=useState(emptyUser_SignUp);
    const [loginUser,setLoginUser]=useState(emptyUser_Login);
    const [error,setError]=useState("");

    const {setAccount}=useContext(DataContext);

    const handleSignUpChange=(e)=>{
        const {name,value}=e.target;
        setSignUpUser({...signUpUser,[name]:value});
    }

    const handleLoginChange=(e)=>{
        const {name,value}=e.target;
        setLoginUser({...loginUser,[name]:value});
    }

    const handleSignUpButton=async ()=>{
        if (!signUpUser.name || !signUpUser.username || !signUpUser.password) {
            alert("Please fill all fields.");
            return;
        }
        try{
            const res=await SignUpApi(signUpUser);
            alert(res.data.message);
            setSignUpUser(emptyUser_SignUp);
            togglePage(!page);
            setError("");
        }
        catch(error){
            console.log("Error: ",error);
            setError("Error in signing up. Please try again later");
        }
    }

    const handleLoginButton=async ()=>{
        try{
            const res=await LoginApi(loginUser);
            setLoginUser(emptyUser_Login);
            sessionStorage.setItem('accessToken',`Bearer ${res.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${res.data.refreshToken}`);
            setAccount({username:res.data.username,name:res.data.name});
            setError("");
        }
        catch(error){
            console.log("Error: ",error);
            setError("Error in logging. Please try again later");
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    page===true? 
                        <Wrapper>
                            <TextField variant="standard" placeholder="Enter username" onChange={handleLoginChange} name="username" value={loginUser.username}/>
                            <TextField variant="standard" type="password" placeholder="Enter password"  onChange={handleLoginChange} name="password" value={loginUser.password}/>

                            {error&&<Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={handleLoginButton}>Login</LoginButton>
                            <Text style={{textAlign:"center"}}>OR</Text>
                            <SignUpButton onClick={()=>togglePage(!page)}>Create an Account</SignUpButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField variant="standard" name="name" value={signUpUser.name} onChange={handleSignUpChange} placeholder="Enter name"/>
                            <TextField variant="standard" name="username" value={signUpUser.username} onChange={handleSignUpChange} placeholder="Enter username"/>
                            <TextField variant="standard" name="password" type="password" value={signUpUser.password} onChange={handleSignUpChange} placeholder="Enter password"/>

                            {error&&<Error>{error}</Error>}
                            
                            <SignUpButton onClick={handleSignUpButton}>SignUp</SignUpButton>
                            <Text style={{textAlign:"center"}}>OR</Text>
                            <LoginButton variant="contained" onClick={()=>togglePage(!page)}>Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    );
}
export default Login;