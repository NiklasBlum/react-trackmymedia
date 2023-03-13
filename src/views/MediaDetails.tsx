import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMediaDetails } from "../services/tmdb/useTmdb";
import MediaDetailsInfo from '../types/MediaDetailsInfo';


export default function MediaDetails() {
    const { mediaId, mediaType } = useParams();
    const [mediaDetails, setMediaDetails] = useState<MediaDetailsInfo>(null);

    async function searchDetails(id, type): Promise<void> {
        setMediaDetails(await getMediaDetails(id, type));
    }

    useEffect(() => {
        searchDetails(mediaId, mediaType);
    }, []);

    return (
        <>
            <Grid container>
                <Grid item>
                    <img src={mediaDetails?.posterUrl}></img>
                </Grid>

                <Grid item>
                    <Typography>{mediaDetails?.title}</Typography>
                </Grid>
                <Grid item>
                    <Typography>{mediaDetails?.overview}</Typography>
                </Grid>

                {/* {mediaDetails?.reviews.map((review) => {
                    <div>{review.toString()}</div>
                })} */}
                <Grid item>
                    <Typography>{mediaDetails?.reviews.toString()}</Typography>
                </Grid>

            </Grid>



        </>
    )
}