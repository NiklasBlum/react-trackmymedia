import { IconButton } from "@mui/material";
import { MoreTime, AlarmOn } from '@mui/icons-material';
import { Fragment, useEffect, useState } from "react";
import { setWatchlistState } from "../services/FirebaseService";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import MediaType from "../types/MediaType";

export default function WatchlistState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [isWatchlist, setIsWatchlist] = useState(false);
    const { mediaType }: { mediaType: MediaType } = useMediaStore();

    async function setWatchlistToState(state: boolean) {
        await setWatchlistState(mediaItem, mediaType, state)
        setIsWatchlist(state);
    }
    useEffect(() => {
        setIsWatchlist(mediaItem.isOnWatchlist);
    }, [])

    return (
        <Fragment>
            {isWatchlist
                ?
                <IconButton
                    size="large"
                    color="error"
                    onClick={() => setWatchlistToState(false)}>
                    <AlarmOn fontSize="inherit" />
                </IconButton>
                :
                <IconButton size="large" color="success" onClick={() => setWatchlistToState(true)}>
                    <MoreTime fontSize="inherit" />
                </IconButton>
            }
        </Fragment>
    )
}