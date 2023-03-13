import { Fragment, useEffect, useState } from 'react';
import { useMediaStore } from '../store';
import { Grid } from '@mui/material';
import MediaCardGrid from '../components/MediaCardGrid';
import { getWatchedMediaItems } from '../services/firebase/useState';
import { getMediaById } from '../services/tmdb/useTmdb';
import MediaItem from '../types/MediaItem';
import NoResults from '../components/shared/NoResults';

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
        <Fragment>
            <Grid container spacing={2} justifyContent="center">
                {
                    mediaItems != null &&
                    <Grid item xs={12}>
                        <MediaCardGrid mediaItems={mediaItems} />
                    </Grid>
                }
                {mediaItems?.length == 0 && <NoResults />}
            </Grid>
        </Fragment >
    )
}