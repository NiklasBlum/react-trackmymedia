import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/firebase/useAuth";

export default function Home() {
    const navigate = useNavigate();

    async function login() {
        await loginWithGoogle();
        navigate("/");
    }

    return (
        <Button onClick={login}>Login with Google</Button>
    )
}