import { useContext } from "react";
import { UserContext } from "../context/user.context";

const useUser = () =>{
    return useContext(UserContext);
}  

export default useUser;
