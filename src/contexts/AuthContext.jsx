import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
//25:25
// https://www.youtube.com/watch?v=PKwu15ldZ7k&t=2679s

// https://www.youtube.com/watch?v=jCY6DH8F4oc&list=PLpPqplz6dKxUfvM22GXRvYA4s-mvJE0XF
