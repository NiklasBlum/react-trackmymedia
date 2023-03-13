import { Fragment, useEffect, useState } from 'react';
import MediaSearchBar from '../components/MediaSearchBar';
import { getMediaBySearch } from "../services/tmdb/useTmdb";
import { useMediaStore } from '../store';
import { Button, Grid } from '@mui/material';
import MediaCardGrid from '../components/MediaCardGrid';
import NoResults from '../components/shared/NoResults';

export default function Home() {
    const { mediaType, searchText, currentPage, setLoading, isLoading } = useMediaStore();
    const [mediaItems, setMediaItems] = useState(null);

    async function ExecuteSearch() {
        setLoading(true);
        setMediaItems(null);
        setMediaItems(await getMediaBySearch(searchText, mediaType, 1));
        setLoading(false);
    }

    useEffect(() => {
        ExecuteSearch();
    }, [mediaType, currentPage])

    return (
        <Fragment>
            <Grid container spacing={2} justifyContent="center">
                <Grid spacing={2} py={2} container justifyContent="center" alignItems="center" >
                    <Grid item xs={10}  >
                        <MediaSearchBar />
                    </Grid>
                    <Grid item textAlign="center">
                        <Button variant='contained'
                            disabled={isLoading}
                            size='large'
                            onClick={() => ExecuteSearch()}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
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