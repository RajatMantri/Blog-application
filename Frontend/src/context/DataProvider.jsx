import { useState,createContext } from "react";

export const DataContext=createContext(null);

// eslint-disable-next-line react/prop-types
export const DataProvider=({children})=>{
    const [account,setAccount]=useState({username:'',name:''});
    return(
        <DataContext.Provider value={{account,setAccount}}>
            {children}
        </DataContext.Provider>
    );
}