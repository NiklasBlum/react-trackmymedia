import { Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import Auth from './views/Auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaStore } from "./store";
import Popular from "./views/Popular";
import Watchlist from "./views/Watchlist";
import { CircularProgress, Grid } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Watched from "./views/Watched";
import MediaFilter from "./components/MediaFilter";

export default function App() {
    //https://github.com/csfrequency/react-firebase-hooks/tree/09bf06b28c82b4c3c1beabb1b32a8007232ed045/auth#useauthstate
    //TODO can options be used to replace useEffect?
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { user: storeUser, setUser, isLoading } = useMediaStore();

    useEffect(() => {
        if (loading)
            return;
        if (user) {
            setUser(user);
            navigate("/");
        }
        else {
            console.log("user logged out")
            navigate("/auth");
        }
    }, [user, loading]);

    return (

        //Refactor this and use protected routes
        <>
            {user &&
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <NavigationBar />
                    </Grid>
                    <Grid item xs={12} textAlign="center" marginBottom={3}>
                        <MediaFilter isDisabled={isLoading} />
                    </Grid>
                </Grid>
            }

            {isLoading && <CircularProgress sx={{
                top: "50 %",
                left: "50%",
                width: "30em",
                height: "18em",
                transform: "translate(-50%, -50%)",
                position: "fixed"
            }} />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/watched" element={<Watched />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    )
}

