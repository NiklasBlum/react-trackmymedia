import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useMediaStore } from "../../store";
import DbMediaItem from "../../types/DbMediaItem";
import MediaItem from "../../types/MediaItem";
import MediaType from "../../types/MediaType";

async function setWatchState(mediaItem: MediaItem, mediaType: MediaType, watchDates: Date[]) {

    const { user }: { user: any } = useMediaStore.getState();

    const q = query(collection(db, "media"),
        where("tmdbId", "==", mediaItem.id),
        where("userId", "==", user.uid),
        where("mediaType", "==", mediaType));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await addDoc(collection(db, "media"), {
                userId: user.uid,
                tmdbId: mediaItem.id,
                mediaType: mediaType,
                title: mediaItem.title,
                onWatchlist: false,
                watchedAt: watchDates
            } as DbMediaItem);
        }
        else {
            const id = querySnapshot.docs[0].id;
            const docRef = doc(db, 'media', id);

            updateDoc(docRef, {
                watchedAt: watchDates
            })
        }
    } catch (error) {
        console.log('Error setting watchState: ', error);
    }
}

async function setWatchlistState(mediaItem: MediaItem, mediaType: MediaType, onWatchlist: boolean) {

    const { user }: { user: any } = useMediaStore.getState();

    const q = query(collection(db, "media"),
        where("tmdbId", "==", mediaItem.id),
        where("userId", "==", user.uid),
        where("mediaType", "==", mediaType));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await addDoc(collection(db, "media"), {
                userId: user.uid,
                tmdbId: mediaItem.id,
                mediaType: mediaType,
                title: mediaItem.title,
                onWatchlist: onWatchlist,
                watched: false,
            } as DbMediaItem);
        }
        else {
            const id = querySnapshot.docs[0].id;
            const docRef = doc(db, 'media', id);

            updateDoc(docRef, {
                onWatchlist: onWatchlist
            })
        }
    } catch (error) {
        console.log('Error getting watchlist: ', error);
    }
}

async function getWatchlistItems(mediaType: MediaType): Promise<DbMediaItem[]> {

    const q = query(collection(db, "media"),
        where("mediaType", "==", mediaType),
        where("onWatchlist", "==", true));

    const querySnapshot = await getDocs(q);
    const dbMediaItems = [] as DbMediaItem[];

    querySnapshot.forEach((doc) => {
        dbMediaItems.push(
            {
                tmdbId: doc.data().tmdbId
            } as DbMediaItem)
    });

    return dbMediaItems;
}

async function getWatchedMediaItems(mediaType: MediaType): Promise<DbMediaItem[]> {

    const q = query(collection(db, "media"),
        where("mediaType", "==", mediaType),
        where("watchedAt", "!=", []),
        orderBy("watchedAt", "desc"));

    const querySnapshot = await getDocs(q);
    const dbMediaItems = [] as DbMediaItem[];

    querySnapshot.forEach((doc) => {
        dbMediaItems.push(
            {
                tmdbId: doc.data().tmdbId
            } as DbMediaItem)
    });

    return dbMediaItems;
}


export { getWatchlistItems, setWatchState, setWatchlistState, getWatchedMediaItems }