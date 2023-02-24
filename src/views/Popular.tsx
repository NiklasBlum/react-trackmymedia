import { Fragment, useEffect, useState } from 'react';
import { getPopular } from "../services/tmdb/useTmdb";
import { useMediaStore } from '../store';
import { Grid } from '@mui/material';
import MediaFilter from '../components/MediaFilter';
import MediaCardGrid from '../components/MediaCardGrid';
import ProgressIndicator from '../components/shared/ProgressIndicator';

export default function Popular() {
    const { mediaType } = useMediaStore();
    const [mediaItems, setMediaItems] = useState(null);
    const [isLoading, setLoading] = useState<boolean>(null);

    async function searchPopular() {
        setLoading(true);
        setMediaItems(null);
        setMediaItems(await getPopular(mediaType, 1));
        setLoading(false);
        console.log(mediaItems);
    }

    useEffect(() => {
        searchPopular();
    }, [mediaType])

    return (
        <Fragment>
            <Grid container spacing={2} justifyContent="center">
                {
                    isLoading &&
                    <ProgressIndicator />
                }
                {
                    mediaItems?.length > 0 &&
                    <Grid item xs={12}>
                        <MediaCardGrid mediaItems={mediaItems} />
                    </Grid>
                }

                {mediaItems?.length == 0 && "No results"}
            </Grid>
        </Fragment >
    )
}