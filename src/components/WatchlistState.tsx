import { Button } from "@mui/material";
import { MoreTime } from '@mui/icons-material';
import { Fragment, useEffect, useState } from "react";
import { setWatchlistState } from "../services/firebase/useState";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import { LoadingButton } from "@mui/lab";

export default function WatchlistState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [isWatchlist, setIsWatchlist] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { mediaType } = useMediaStore();

    async function setWatchlistToState(state: boolean) {
        setLoading(true);
        await sleep(200);
        await setWatchlistState(mediaItem, mediaType, state)
        setIsWatchlist(state);
        setLoading(false);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        setIsWatchlist(mediaItem.isOnWatchlist);
    }, [])

    return (
        <LoadingButton
            size="small"
            onClick={() => setWatchlistToState(!isWatchlist)}
            loading={isLoading}
            color="success"
            startIcon={<MoreTime sx={{ padding: "4px" }} />}
            variant={isWatchlist ? "contained" : "outlined"}
        />
    )
}