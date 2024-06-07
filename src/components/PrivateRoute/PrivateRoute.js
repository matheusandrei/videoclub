import { useContext } from "react";
import { AppContext } from "../App/App";
import { Outlet, Navigate} from "react-router-dom"
const PrivateRoute = ()=>{
    const contexte = useContext(AppContext);//Objet user, isLogged   
    if(contexte.estLog){
        return <Outlet/>
    }else{
        return <Navigate to= "/"/>
    }
}
export default PrivateRoute;