import Grid from "@mui/material/Grid";
import MediaItem from "../types/MediaItem";
import MediaCard from "./MediaCard";

export default function MediaCardGrid({ mediaItems }: { mediaItems: MediaItem[] }) {
    return (
        <Grid p={1} container spacing={2} justifyContent="center">
            {mediaItems.map(item =>
                <Grid item xs={12} sm={4} md={3} lg={2} key={item.id}>
                    <MediaCard key={item?.id} mediaItem={item} />
                </Grid>
            )}
        </ Grid>
    )
}