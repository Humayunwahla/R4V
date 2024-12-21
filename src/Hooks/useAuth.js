// useAuth.js
import { useContext } from "react";
import { UserContext } from "../context/UserContext/userContext";


export const useAuth = () => {
    const { accessToken } = useContext(UserContext);
    return accessToken;
};
