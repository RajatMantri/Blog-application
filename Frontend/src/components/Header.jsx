import { AppBar,Toolbar,styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component=styled(Toolbar)`
    justify-content:center;
    & >a{
        padding:20px;
        text-decoration:none;
        color:#F0F0F0
    }
`

const Header=()=>{
    return(
        <AppBar>
            <Component>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">LogOut</Link>
            </Component>
        </AppBar>
    );
}

export default Header;