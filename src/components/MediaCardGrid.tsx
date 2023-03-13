import Grid from "@mui/material/Grid";
import MediaItem from "../types/MediaItem";
import MediaCard from "./MediaCard";
import Pager from "./nav/Pager";
import NoResults from "./shared/NoResults";

export default function MediaCardGrid({ mediaItems, showPager = true }): JSX.Element {

    return (
        <Grid container
            spacing={2}
            justifyContent="center">
            {
                mediaItems?.length > 0 &&
                <>
                    <Grid item xs={12}>
                        <Grid p={1} container spacing={2} justifyContent="center">
                            {mediaItems.map(item =>
                                <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                                    <MediaCard key={item?.id} mediaItem={item} />
                                </Grid>
                            )}
                        </ Grid>
                    </Grid>
                    {showPager && mediaItems?.length > 14 &&
                        <Grid item marginY={3} >
                            <Pager />
                        </Grid>}
                </>
            }

            {mediaItems?.length == 0 && <NoResults />}
        </Grid>
    )
}