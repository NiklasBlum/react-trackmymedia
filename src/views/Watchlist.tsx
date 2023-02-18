import { Fragment, useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { useMediaStore } from '../store';
import { Grid } from '@mui/material';
import MediaFilter from '../components/MediaFilter';
import MediaCardGrid from '../components/MediaCardGrid';
import { getWatchlistItems } from '../services/FirebaseService';
import { getMediaById } from '../services/TmdbService';
import MediaItem from '../types/MediaItem';

export default function Watchlist() {
    const { mediaType } = useMediaStore();
    const [mediaItems, setMediaItems] = useState<MediaItem[] | []>(null);


    async function getWatchlistMediaItems(): Promise<MediaItem[]> {
        const mediaItems = [] as MediaItem[];
        const dbMediaItems = await getWatchlistItems(mediaType);

        for await (const mediaItem of dbMediaItems) {
            mediaItems.push(await getMediaById(mediaItem.tmdbId, mediaType));
        }

        return mediaItems;
    }

    async function searchWatchlist() {
        const items = await getWatchlistMediaItems();
        setMediaItems(items);
    }

    useEffect(() => {
        searchWatchlist();
    }, [mediaType])

    return (
        <Fragment>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} >
                    <NavigationBar />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <MediaFilter />
                </Grid>
                {
                    mediaItems != null &&
                    <Grid item xs={12}>
                        <MediaCardGrid mediaItems={mediaItems} />
                    </Grid>
                }
                {mediaItems?.length == 0 && "No results"}
            </Grid>
        </Fragment >
    )
}