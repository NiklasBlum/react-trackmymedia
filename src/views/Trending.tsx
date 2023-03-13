import { useEffect, useState } from 'react';
import { getTrending } from "../services/tmdb/useTmdb";
import { useMediaStore } from '../store';
import MediaCardGrid from '../components/MediaCardGrid';

export default function Popular() {
    const { mediaType, currentPage, setLoading, setCurrentPage } = useMediaStore();
    const [mediaItems, setMediaItems] = useState(null);

    async function searchTrending() {
        setLoading(true);
        setMediaItems(null);
        setMediaItems(await getTrending(mediaType));
        setLoading(false);
    }

    useEffect(() => {
        searchTrending();
    }, [mediaType, currentPage])

    return (
        <MediaCardGrid mediaItems={mediaItems} />
    )
}