import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";

export default function ProtectedRoute({ children }) {

    const [user, loading] = useAuthState(auth);

    if (!user && !loading) {
        return (<Navigate to='/auth' />);
    }

    return children;
};

