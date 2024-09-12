import { useContext } from "react";
import { AuthContext } from '@/contexts/AuthContext';

const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error("Using authentification hook outside its provider.");

    return authContext;
};

export default useAuth;