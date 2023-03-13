import { useEffect, useState } from 'react';
import { useMediaStore } from '../store';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import MediaCardGrid from '../components/MediaCardGrid';
import { getWatchlistItems } from '../services/firebase/useState';
import { getMediaById } from '../services/tmdb/useTmdb';
import MediaItem from '../types/MediaItem';
import NoResults from '../components/shared/NoResults';
import { ExpandMore } from '@mui/icons-material';

export default function Watchlist() {
    const { mediaType, isLoading, setLoading } = useMediaStore();
    const [mediaItems, setMediaItems] = useState<MediaItem[]>(null);

    async function getWatchlistMediaItems(): Promise<MediaItem[]> {
        const mediaItems = [] as MediaItem[];
        const dbMediaItems = await getWatchlistItems(mediaType);

        for await (const mediaItem of dbMediaItems) {
            const tmdbMediaItem = await getMediaById(mediaItem.tmdbId, mediaType);
            const completeItem = { ...tmdbMediaItem, onWaitlist: mediaItem.onWaitlist } as MediaItem
            mediaItems.push(completeItem);
        }

        return mediaItems;
    }

    async function searchWatchlist() {
        setLoading(true);
        setMediaItems(null)
        setMediaItems(await getWatchlistMediaItems());
        setLoading(false);
    }

    function getItemsOnWaitlist(state: boolean): MediaItem[] {
        return mediaItems?.filter(x => x.onWaitlist == state);
    }

    useEffect(() => {
        searchWatchlist();
    }, [mediaType])

    return (
        <>
            <MediaCardGrid mediaItems={getItemsOnWaitlist(false)}
                showPager={false} />
            {
                getItemsOnWaitlist(true)?.length > 0 &&
                <Grid container justifyContent="center">
                    <Grid item xs={11}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "lightgray" }}                        >
                                <Typography variant="h5">Waitlist</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MediaCardGrid mediaItems={getItemsOnWaitlist(true)}
                                    showPager={false} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            }
        </>
    )
}