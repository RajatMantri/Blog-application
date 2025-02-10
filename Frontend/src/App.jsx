import Login from "./components/account/Login";
import { DataProvider } from "./context/DataProvider";

const App=()=>{
  return(
    <div style={{marginTop:64}}>
      <DataProvider>
        <Login/>
      </DataProvider>
    </div>
  );
}
export default App;