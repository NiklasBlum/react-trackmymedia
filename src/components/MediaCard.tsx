import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WatchlistState from './WatchlistState';
import { CircularProgress, Typography, CardMedia, Box, Grid } from '@mui/material';
import WatchState from './WatchState';
import MediaItem from '../types/MediaItem';

export default function MediaCard({ mediaItem }: { mediaItem: MediaItem }) {

    return (
        <Card>
            {mediaItem.id}
            <CardMedia
                component="img"
                image={mediaItem.posterUrl} />
            <CardContent>
                <Grid container spacing={1} direction="row"
                    justifyContent="space-between" alignItems="center">
                    <Grid item xs={3} >
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate"
                                value={Math.round(mediaItem.voteAverage * 10)} thickness={7} color={'error'} />
                            <Box sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Typography>
                                    {Math.round(mediaItem.voteAverage * 10)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={9} >
                        <Typography >
                            {mediaItem.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography noWrap>
                            {mediaItem.releaseDate.toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <WatchState mediaItem={mediaItem} />
                    </Grid>
                    <Grid item  >
                        <WatchlistState mediaItem={mediaItem} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}