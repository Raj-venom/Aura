import { getCurrentUser } from "@/lib/appwrite.config";
import { createContext, useContext, useEffect, useState } from "react"

type UserContextType = {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
};

type UserContextProviderProps = {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState<{} | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLogged(true)
                    setUser(res)
                } else {
                    setIsLogged(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLogged(false)
                setUser(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    return (
        <UserContext.Provider value={{
            isLogged,
            setIsLogged,
            user,
            setUser,
            loading
        }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider