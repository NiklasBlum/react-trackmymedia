import { FastForward } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { setWaitlistState } from "../services/firebase/useState";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import { toast } from "react-toastify";
import useSound from "use-sound";
import { IconButton } from '@mui/material';

export default function WatchlistWaitingState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [isWaitlist, setIsWaitlist] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { mediaType } = useMediaStore();
    const [playSuccess] = useSound('/sounds/Success.mp3', { volume: 0.25, });
    const [playError] = useSound('/sounds/Error.mp3', { volume: 0.25 });

    async function setWatchlistToState(state: boolean) {
        setLoading(true);
        try {
            await sleep(200);
            await setWaitlistState(mediaItem, mediaType, state);
            setIsWaitlist(state);
            setLoading(false);
            state ? playSuccess() : playError();
            toast.success(state ? `${mediaItem.title} moved to waitlist` : `${mediaItem.title} removed from waitlist`);
        } catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        setIsWaitlist(mediaItem.onWaitlist);
    }, [])

    return (
        <IconButton size="small"
            onClick={() => setWatchlistToState(!isWaitlist)}
            color={isWaitlist ? "success" : "default"}>
            <FastForward fontSize="inherit" />
        </IconButton>
    )
}