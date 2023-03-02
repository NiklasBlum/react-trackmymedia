import { useEffect, useState } from "react";
import { setWatchState as setStateInDb } from "../services/firebase/useState";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import MediaType from "../types/MediaType";
import WatchStateSplitButton from "./WatchStateSplitButton";
import { toast } from 'react-toastify';

export default function WatchState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [watchDates, setWatchDates] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { mediaType }: { mediaType: MediaType } = useMediaStore();

    async function addWatchDate(date: Date) {
        try {
            if (isDateAlreadyAdded(date)) {
                toast.error("Date Already added!");
                return;
            }

            setLoading(true);
            const allWatchDates = [...watchDates, date];

            await setStateInDb(mediaItem, mediaType, allWatchDates);
            setWatchDates(allWatchDates);
            setLoading(false);
            toast.success("Watched " + mediaItem.title + " at " + date.toLocaleDateString());

        } catch (error) {
            toast.error(error);
        }
    }

    function isDateAlreadyAdded(date: Date): boolean {
        return watchDates.some(x => x.getDate() == date.getDate());
    }

    async function removeWatchDate(date: Date) {
        try {
            setLoading(true);
            var newWatchDates = watchDates.filter(x => x !== date)
            await setStateInDb(mediaItem, mediaType, newWatchDates);
            setWatchDates(newWatchDates);
            setLoading(false);
            toast.success("Watch date " + date.toLocaleDateString() + " removed");
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        setWatchDates(mediaItem.watchedAt);
    }, [])

    return (
        <WatchStateSplitButton watchDates={watchDates}
            isLoading={isLoading}
            onAdd={(x: Date) => addWatchDate(x)}
            onRemove={(x: Date) => removeWatchDate(x)} />
    )
}