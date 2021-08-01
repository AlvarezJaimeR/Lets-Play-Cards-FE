import { useContext, createContext } from "react";

export const AppContext = createContext();

 function AuthContext() {
  return useContext(AppContext);
}
export default AuthContext