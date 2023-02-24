import Card from '@mui/material/Card';
import WatchlistState from './WatchlistState';
import { CircularProgress, Typography, CardMedia, Box, Grid, CardActions } from '@mui/material';
import WatchState from './WatchState';
import MediaItem from '../types/MediaItem';

export default function MediaCard({ mediaItem }: { mediaItem: MediaItem }) {

    const voteCount = Math.round(mediaItem.voteAverage * 10);

    function getVoteCountColor() {
        switch (true) {
            case (voteCount >= 90):
                return "secondary";
            case (voteCount >= 80):
                return "success"
            case (voteCount >= 70):
                return "warning";
            case (voteCount < 70):
                return "error";
        }
    }

    return (
        <Card>
            <CardMedia
                component="img"
                image={mediaItem.posterUrl} />
            <CardActions >
                <Grid container spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ position: 'relative' }}>
                    <Grid item xs={2} style={{ position: 'absolute', top: "-55px" }} >
                        <Box sx={{ position: 'relative', display: 'inline-flex', background: 'black', borderRadius: "3rem" }}>
                            <CircularProgress variant="determinate"
                                value={voteCount} thickness={7} color={getVoteCountColor()} />
                            <Box sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                            }}>
                                <Typography>
                                    {voteCount}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography noWrap>
                            {mediaItem.title}
                        </Typography>
                        <Typography variant="body2" >
                            {mediaItem.releaseDate.toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <WatchState mediaItem={mediaItem} />
                    </Grid>
                    <Grid item >
                        <WatchlistState mediaItem={mediaItem} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card >
    );
}