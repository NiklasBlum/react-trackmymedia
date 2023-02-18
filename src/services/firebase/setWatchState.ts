import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

export { setWatchState }