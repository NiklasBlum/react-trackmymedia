import { useEffect, useState } from 'react';
import { useMediaStore } from '../store';
import MediaCardGrid from '../components/MediaCardGrid';
import { getWatchedMediaItems } from '../services/firebase/useState';
import { getMediaById } from '../services/tmdb/useTmdb';
import MediaItem from '../types/MediaItem';

export default function Watched() {
    const { mediaType, setLoading } = useMediaStore();
    const [mediaItems, setMediaItems] = useState<MediaItem[] | null>(null);

    async function getWatched(): Promise<MediaItem[]> {
        const mediaItems = [] as MediaItem[];
        const dbMediaItems = await getWatchedMediaItems(mediaType);

        for await (const mediaItem of dbMediaItems) {
            mediaItems.push(await getMediaById(mediaItem.tmdbId, mediaType));
        }

        return mediaItems;
    }

    async function triggerWatched() {
        setLoading(true);
        setMediaItems(null);
        const items = await getWatched();
        setMediaItems(items);
        setLoading(false);
    }

    useEffect(() => {
        triggerWatched();
    }, [mediaType])

    return (
        <MediaCardGrid mediaItems={mediaItems} showPager={false} />
    )
}