import axios from "axios";
import { useMediaStore } from "../../store";
import MediaDetailsInfo from "../../types/MediaDetailsInfo";
import MediaItem from "../../types/MediaItem";
import MediaType from "../../types/MediaType";
import { getDbMediaItemById } from "../firebase/useMedia";

const { language, baseUrl, apiKey, basePosterUrl } = useMediaStore.getState();

async function getMediaBySearch(searchText: string, mediaType: MediaType, page = 1): Promise<MediaItem[] | undefined> {

    let searchQuery = `${baseUrl}search/${mediaType}?api_key=${apiKey}&language=${language}&page=${page}&query=${searchText}&region=DE`;

    let response = await axios.get(searchQuery);

    try {
        if (response.data) {
            return await getDbMediaItems(response.data.results, mediaType);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getPopular(mediaType: MediaType, page = 1): Promise<MediaItem[] | undefined> {

    let searchQuery = `${baseUrl}${mediaType}/popular?api_key=${apiKey}&language=${language}&page=${page}&region=DE`;

    let response = await axios.get(searchQuery);

    try {
        if (response.data) {
            return await getDbMediaItems(response.data.results, mediaType);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getTrending(mediaType: MediaType): Promise<MediaItem[] | undefined> {

    let searchQuery = `${baseUrl}trending/${mediaType}/week?api_key=${apiKey}`;

    let response = await axios.get(searchQuery);

    try {
        if (response.data) {
            return await getDbMediaItems(response.data.results, mediaType);
        }
    } catch (error) {
        console.log(error);
    }
}


async function getMediaDetails(mediaId: string, mediaType: string): Promise<MediaDetailsInfo> {

    let searchQuery = `${baseUrl}${mediaType}/${mediaId}?api_key=${apiKey}&language=de-DE&append_to_response=reviews,videos,seasons`;
    console.log(searchQuery);
    let response = await axios.get(searchQuery);

    try {
        if (response.data) {

            return createMediaDetails(response.data, mediaType);
        }
    } catch (error) {
        console.log(error);
    }
}

function createMediaDetails(tmdbMediaResult: any, mediaType: string) {
    console.log(tmdbMediaResult);
    return {
        mediaType: mediaType === MediaType.Movie ? MediaType.Movie : MediaType.Show,
        title: mediaType === MediaType.Movie ? tmdbMediaResult.title : tmdbMediaResult.name,
        overview: tmdbMediaResult.overview,
        posterUrl: basePosterUrl + tmdbMediaResult.backdrop_path,
        reviews: tmdbMediaResult.reviews,
        runtime: tmdbMediaResult.runtime,
    } as MediaDetailsInfo;
}

async function getMediaById(id: number, mediaType: MediaType): Promise<MediaItem> {
    let query = `${baseUrl}${mediaType}/${id}?api_key=${apiKey}&language=${language}`;

    let response = await axios.get(query);

    try {
        if (response.data) {
            return await createDbMediaItem(response.data, mediaType);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getDbMediaItems(tmdbMediaResults: any[], mediaType: MediaType): Promise<MediaItem[]> {
    var mediaItems: MediaItem[] = [];

    for await (const x of tmdbMediaResults) {
        if (x.poster_path) {
            mediaItems.push(await createDbMediaItem(x, mediaType));
        }
    }

    return mediaItems;
}

async function createDbMediaItem(tmdbMediaItem: any, mediaType: MediaType): Promise<MediaItem | null> {

    const dbMediaItem = await getDbMediaItemById(tmdbMediaItem.id, mediaType);

    return {
        id: tmdbMediaItem.id,
        title: mediaType === MediaType.Movie ? tmdbMediaItem.title : tmdbMediaItem.name,
        posterUrl: basePosterUrl + tmdbMediaItem.poster_path,
        voteAverage: tmdbMediaItem.vote_average,
        voteCount: tmdbMediaItem.vote_count,
        releaseDate: mediaType === MediaType.Movie ? new Date(tmdbMediaItem.release_date) : new Date(tmdbMediaItem.first_air_date),
        onWatchlist: dbMediaItem.onWatchlist,
        watchedAt: dbMediaItem.watchedAt,
        mediaType: mediaType === MediaType.Movie ? MediaType.Movie : MediaType.Show
    } as MediaItem;
}


export { getMediaBySearch, getPopular, getMediaById, getTrending, getMediaDetails }