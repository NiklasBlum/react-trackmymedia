

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { useMediaStore } from "./store";

import { LinearProgress, Grid } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Routes from './components/nav/Routes';
import MediaFilter from "./components/MediaFilter";

import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
    const { setUser, isLoading } = useMediaStore();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading)
            return;
        if (error) {
            toast.error(error.message);
        }
        setUser(user ? user : null);
    }, [user, loading]);

    return (
        <>
            {loading || isLoading &&
                <LinearProgress sx={{
                    top: "50%",
                    left: "50%",
                    width: "20em",
                    transform: "translate(-50%, -50%)",
                    position: "fixed"
                }} />
            }

            {user &&
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <NavigationBar />
                    </Grid>
                    <Grid item textAlign="center" marginBottom={3} sx={{ pl: 0 }}>
                        <MediaFilter isDisabled={isLoading} />
                    </Grid>
                </Grid>}

            {!loading && <Routes />}

            <ToastContainer
                transition={Flip}
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

