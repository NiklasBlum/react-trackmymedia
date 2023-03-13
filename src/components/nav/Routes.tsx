import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom';
import Auth from '../../views/Auth';
import Home from '../../views/Home';
import Popular from '../../views/Popular';
import Watched from '../../views/Watched';
import Watchlist from '../../views/Watchlist';
import Trending from '../../views/Trending';
import ProtectedRoute from "../../utils/ProtectedRoute"
import { useEffect } from 'react';
import { useMediaStore } from '../../store';
import MediaDetails from '../../views/MediaDetails';

export default function Routes() {
    const { setCurrentPage } = useMediaStore();
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(1);
    }, [location]);

    return (

        <ReactRoutes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/watched" element={<ProtectedRoute><Watched /></ProtectedRoute>} />
            <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
            <Route path="/details/:mediaType/:mediaId" element={<ProtectedRoute><MediaDetails /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </ReactRoutes>
    )
}