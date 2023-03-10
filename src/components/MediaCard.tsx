import Card from '@mui/material/Card';
import WatchlistState from './WatchlistState';
import { CircularProgress, Typography, CardMedia, Box, Grid, CardActions, CardActionArea } from '@mui/material';
import WatchState from './WatchState';
import MediaItem from '../types/MediaItem';
import WatchlistWaitingState from './WaitlistState';
import { useNavigate } from 'react-router-dom';

export default function MediaCard({ mediaItem }: { mediaItem: MediaItem }) {

    const navigate = useNavigate();
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
            <CardActionArea onClick={() => navigate(`/details/${mediaItem.mediaType.toString()}/${mediaItem.id}`)}>
                <CardMedia
                    component="img"
                    image={mediaItem.posterUrl} />
            </CardActionArea>
            <CardActions>
                <Grid container
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ position: 'relative' }}>
                    <Grid item xs={2} style={{ position: 'absolute', top: "-50px", opacity: "80%" }} >
                        <Box sx={{ position: 'relative', display: 'inline-flex', background: 'black', borderRadius: "2rem" }}>
                            <CircularProgress variant="determinate" size="2rem"
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
                                <Typography variant="body2">
                                    {voteCount}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2" >
                            {isNaN(mediaItem.releaseDate.valueOf()) ? "TBA" : mediaItem.releaseDate.toLocaleDateString()}
                        </Typography>
                    </Grid>
                    {mediaItem.onWatchlist &&
                        <Grid item xs={2} style={{ textAlign: "end" }}>
                            <WatchlistWaitingState mediaItem={mediaItem} />
                        </Grid>
                    }
                    <Grid item >
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