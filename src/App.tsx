import { Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import Auth from './views/Auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaStore } from "./store";
import Popular from "./views/Popular";

export default function App() {
    //https://github.com/csfrequency/react-firebase-hooks/tree/09bf06b28c82b4c3c1beabb1b32a8007232ed045/auth#useauthstate
    //TODO can options be used to replace useEffect?
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { user: storeUser, setUser } = useMediaStore();

    useEffect(() => {
        if (loading) {
            console.log("loading");
            return;
        }
        if (user) {
            setUser(user);
            console.log(storeUser);
            navigate("/");
        }
        else {
            console.log("user logged out")
            navigate("/auth");
        }
    }, [user, loading]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/popular" element={<Popular />} />
        </Routes>
    )
}

