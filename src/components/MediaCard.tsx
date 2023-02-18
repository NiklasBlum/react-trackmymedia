import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WatchlistState from './WatchlistState';
import { CircularProgress, Typography, CardMedia, Box } from '@mui/material';
import WatchState from './WatchState';

export default function MediaCard({ mediaItem }) {

    return (
        <Card>
            <CardMedia
                component="img"
                image={mediaItem.posterUrl} />
            <CardContent>
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
                <Typography noWrap>
                    {mediaItem.title}
                </Typography>
                <Typography>
                    Release: {mediaItem.releaseDate}
                </Typography>
                <Typography>

                </Typography>

                <WatchState
                    mediaItem={mediaItem} />
                <WatchlistState
                    mediaItem={mediaItem} />

            </CardContent>
        </Card>
    );
}