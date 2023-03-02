import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Auth from '../../views/Auth';
import Home from '../../views/Home';
import Popular from '../../views/Popular';
import Watched from '../../views/Watched';
import Watchlist from '../../views/Watchlist';
import ProtectedRoute from "../../utils/ProtectedRoute"
export default function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/watched" element={<ProtectedRoute><Watched /></ProtectedRoute>} />
            <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </ReactRoutes>
    )
}