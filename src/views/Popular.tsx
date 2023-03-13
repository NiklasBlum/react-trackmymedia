import { useEffect, useState } from 'react';
import { getPopular } from "../services/tmdb/useTmdb";
import { useMediaStore } from '../store';
import MediaCardGrid from '../components/MediaCardGrid';
import MediaItem from '../types/MediaItem';

export default function Popular() {
    const { mediaType, currentPage, setLoading } = useMediaStore();
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(null);


    async function searchPopular() {
        setLoading(true);
        setMediaItems(null);
        setMediaItems(await getPopular(mediaType, currentPage));
        setLoading(false);
    }

    useEffect(() => {
        searchPopular();
    }, [mediaType, currentPage])

    return (
        <MediaCardGrid mediaItems={mediaItems} />
    )
}