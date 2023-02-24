import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase/config"
import { useMediaStore } from "../../store";
import DbMediaItem from "../../types/DbMediaItem";
import MediaType from "../../types/MediaType";

// async function updateMedia() {

//     const q = query(collection(db, "media"),
//         where("mediaType", "==", "movie"));

//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach(async x => {
//         const docRef = doc(db, 'media', x.id);
//         console.log(x.data());

//         await updateDoc(docRef, {
//             watched: deleteField()
//         });
//     })
// }

async function getDbMediaItemById(id: number, mediaType: MediaType) {
    const { user }: { user: any } = useMediaStore.getState();

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
                watchedAt: querySnapshot.docs[0].data().watchedAt?.length > 0
                    ? querySnapshot.docs[0].data().watchedAt.map(x => x.toDate())
                    : []
            } as DbMediaItem
        }
    }
    catch (error) {
        console.log('Error getting watchlist: ', error);
    }
}
export { getDbMediaItemById }
