import { createContext, useState, useEffect } from "react";



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
        }
      } catch (error) {
        console.log(error);
      }
    };
console.log(tenant)
    fetchData();
  }, []);




    return(
        <UserContext.Provider value={[tenant, setTenant]}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;