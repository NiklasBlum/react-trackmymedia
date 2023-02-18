import { Fragment, useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getPopular } from "../services/TmdbService";
import { useMediaStore } from '../store';
import { Button, Grid } from '@mui/material';
import MediaFilter from '../components/MediaFilter';
import MediaCardGrid from '../components/MediaCardGrid';

export default function Popular() {
    const { mediaType } = useMediaStore();
    const [mediaItems, setMediaItems] = useState(null);

    async function searchPopular() {
        setMediaItems(null);
        setMediaItems(await getPopular(mediaType, 1));
    }

    useEffect(() => {
        searchPopular();
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