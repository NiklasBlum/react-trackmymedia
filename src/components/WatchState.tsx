import { useEffect, useState } from "react";
import { setWatchState as setStateInDb } from "../services/firebase/useState";
import { useMediaStore } from "../store";
import MediaItem from "../types/MediaItem";
import MediaType from "../types/MediaType";
import WatchStateSplitButton from "./WatchStateSplitButton";

export default function WatchState({ mediaItem }: { mediaItem: MediaItem }): JSX.Element {

    const [watchDates, setWatchDates] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { mediaType }: { mediaType: MediaType } = useMediaStore();

    async function addWatchDate(date: Date) {
        if (isDateAlreadyAdded(date))
            return;

        setLoading(true);
        const allWatchDates = [...watchDates, date];

        await setStateInDb(mediaItem, mediaType, allWatchDates);
        setWatchDates(allWatchDates);
        setLoading(false);
    }

    function isDateAlreadyAdded(date: Date): boolean {
        return watchDates.some(x => x.getDate() == date.getDate());
    }

    async function removeWatchDate(date: Date) {
        setLoading(true);
        var newWatchDates = watchDates.filter(x => x !== date)
        await setStateInDb(mediaItem, mediaType, newWatchDates);
        setWatchDates(newWatchDates);
        setLoading(false);
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