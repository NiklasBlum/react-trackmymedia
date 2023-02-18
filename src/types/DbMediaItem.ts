import MediaType from "./MediaType"

export default interface DbMediaItem {
    docId?: string,
    userId?: string,
    mediaType?: MediaType
    tmdbId?: number,
    onWatchlist: boolean,
    watched: boolean,
    watchedAt?: Date[],
    title?: string
}