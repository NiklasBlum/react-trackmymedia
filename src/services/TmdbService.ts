import axios from "axios";
import MediaItem from "../types/MediaItem";
import MediaType from "../types/MediaType";
import { useMediaStore } from "../store";
import { getDbMediaItemById } from "./FirebaseService";

const { language, baseUrl, apiKey, basePosterUrl } = useMediaStore.getState();

async function getMediaBySearch(searchText: string, mediaType: MediaType, page = 1): Promise<MediaItem[] | undefined> {

    let searchQuery = `${baseUrl}search/${mediaType}?api_key=${apiKey}&language=${language}&page=${page}&query=${searchText}`;

    let response = await axios.get(searchQuery);

    try {
        if (response.data) {
            return await createMediaItems(response.data.results, mediaType);
        }
    } catch (error) {
        console.log(error);
    }   
}

async function getPopular(mediaType: MediaType, page = 1): Promise<MediaItem[] | undefined> {

    let searchQuery = `${baseUrl}${mediaType}/popular?api_key=${apiKey}&language=${language}&page=${page}`;

    let response = await axios.get(searchQuery);

    try {
        if (response.data) {
            return await createMediaItems(response.data.results, mediaType);
        }
    } catch (error) {
        console.log(error);
    }   
}

async function createMediaItems(tmdbMediaResults: any[], mediaType: MediaType): Promise<MediaItem[]> {
    var mediaItems: MediaItem[] = [];

    for await (const x of tmdbMediaResults) {
        if (x.poster_path) {
            const dbMediaItem = await getDbMediaItemById(x.id, mediaType);
            mediaItems.push({
                id: x.id,
                title: mediaType === MediaType.Movie ? x.title : x.name,
                posterUrl: basePosterUrl + x.poster_path,
                voteAverage: x.vote_average,
                voteCount: x.vote_count,
                releaseDate: mediaType === MediaType.Movie ? x.release_date : x.first_air_date,
                isOnWatchlist: dbMediaItem.onWatchlist,
                watched: dbMediaItem.watched,
                watchedAt: dbMediaItem.watchedAt
            } as MediaItem);
        }
    }

    console.log(mediaItems);

    return mediaItems;
}


export {getMediaBySearch, getPopular}