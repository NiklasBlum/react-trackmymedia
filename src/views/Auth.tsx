import { Button } from "@mui/material";
import { loginWithGoogle } from "../services/firebase/useAuth";

export default function Home() {

    return (
        <Button onClick={loginWithGoogle}>Login with Google</Button>
    )
}