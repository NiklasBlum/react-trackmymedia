import { Button, IconButton } from "@mui/material";
import { MoreTime, AlarmOn, MoreTimeOutlined } from '@mui/icons-material';
import { Fragment, useEffect, useState } from "react";
import { setWatchlistState } from "../services/FirebaseService";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import MediaType from "../types/MediaType";


export default function WatchlistState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [isWatchlist, setIsWatchlist] = useState(false);
    const { mediaType }: { mediaType: MediaType } = useMediaStore();

    async function setWatchlistToState(state: boolean) {
        console.log(state);
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
                <Button variant="contained"
                    startIcon={<MoreTime />}
                    color="success"
                    onClick={() => setWatchlistToState(false)}>
                </Button>
                :
                <Button variant="outlined"
                    startIcon={<MoreTime />}
                    color="success"
                    onClick={() => setWatchlistToState(true)}>
                </Button>
            }
        </Fragment>
    )
}