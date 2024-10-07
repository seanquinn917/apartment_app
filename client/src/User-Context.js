import { createContext, useState, useEffect } from "react";
import SignIn from "./SignIn";



const UserContext = createContext(null);

export const UserProvider = ({children}) =>{
    const [tenant, setTenant]= useState(null);

  useEffect(() => {
    console.log("hello from context")
    const fetchData = async () => {
      try {
        const response = await fetch("/me");
        if (response.ok) {
          const tenant = await response.json();
          setTenant(tenant);
        } else if (response.status === 401 || response.status === 403) {
        return <SignIn/>}
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

    return(
        <UserContext.Provider value={[tenant, setTenant]}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;