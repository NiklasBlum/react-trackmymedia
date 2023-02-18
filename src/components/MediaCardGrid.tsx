import Grid from "@mui/material/Grid";
import MediaItem from "../types/MediaItem";
import MediaCard from "./MediaCard";

export default function MediaCardGrid({ mediaItems }: { mediaItems: MediaItem[] }) {
    return (
        <Grid p={1} container spacing={2} justifyContent="center">
            {mediaItems.map(movie =>
                <Grid item xs={12} sm={4} md={3} key={movie.id}>
                    <MediaCard key={movie.id} mediaItem={movie} />
                </Grid>
            )}
        </ Grid>
    )
}