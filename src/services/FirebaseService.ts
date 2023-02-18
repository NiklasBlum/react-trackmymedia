import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config"
import { useMediaStore } from "../store";
import MediaType from "../types/MediaType";
import MediaItem from "../types/MediaItem";
import DbMediaItem from "../types/DbMediaItem";


async function setWatchlistState(mediaItem: MediaItem, mediaType: MediaType, onWatchlist: boolean) {

    const { user }: { user: any } = useMediaStore.getState();

    const q = query(collection(db, "media"),
        where("tmdbId", "==", mediaItem.id),
        where("userId", "==", user.uid),
        where("mediaType", "==", mediaType));

    try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0])
        if (querySnapshot.empty) {
            await addDoc(collection(db, "media"), {
                userId: user.uid,
                tmdbId: mediaItem.id,
                mediaType: mediaType,
                title: mediaItem.title,
                onWatchlist: onWatchlist,
                watched: false,
                watchedAt: null
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

async function updateMedia() {

    const q = query(collection(db, "media"),
        where("watched", "==", false),
        where("mediaType", "==", "movie"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async x => {
        const docRef = doc(db, 'media', x.id);
        console.log(x.data());

        await deleteDoc(docRef);

    })
}

async function getDbMediaItemById(id: number, mediaType: MediaType) {
    const { user }: { user: any } = useMediaStore.getState();

    console.log(id, user.uid, mediaType);

    const q = query(collection(db, "media"),
        where("tmdbId", "==", id),
        where("userId", "==", user.uid),
        where("mediaType", "==", mediaType));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return {
                onWatchlist: false,
                watched: false,
                watchedAt: []
            } as DbMediaItem
        }

        else {
            return {
                onWatchlist: querySnapshot.docs[0].data().onWatchlist,
                watched: querySnapshot.docs[0].data().watched,
                watchedAt: querySnapshot.docs[0].data().watchedAt.length > 0
                    ? querySnapshot.docs[0].data().watchedAt.map(x => x.toDate())
                    : []
            } as DbMediaItem
        }
    }
    catch (error) {
        console.log('Error getting watchlist: ', error);
    }
}



export { getDbMediaItemById, setWatchlistState, updateMedia }

