import { Fragment, useEffect, useState } from 'react';
import { getTrending } from "../services/tmdb/useTmdb";
import { useMediaStore } from '../store';
import { Grid } from '@mui/material';
import MediaCardGrid from '../components/MediaCardGrid';
import NoResults from '../components/shared/NoResults';

export default function Popular() {
    const { mediaType, setLoading } = useMediaStore();
    const [mediaItems, setMediaItems] = useState(null);

    async function searchTrending() {
        setLoading(true);
        setMediaItems(null);
        setMediaItems(await getTrending(mediaType));
        setLoading(false);
        console.log(mediaItems);
    }

    useEffect(() => {
        searchTrending();
    }, [mediaType])

    return (
        <Fragment>
            <Grid container spacing={2} justifyContent="center">
                {
                    mediaItems?.length > 0 &&
                    <Grid item xs={12}>
                        <MediaCardGrid mediaItems={mediaItems} />
                    </Grid>
                }

                {mediaItems?.length == 0 && <NoResults />}
            </Grid>
        </Fragment >
    )
}