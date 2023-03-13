import MediaType from "./MediaType";

export default interface MediaItem {
    id: number,
    posterUrl: string,
    title: string,
    voteCount: number,
    voteAverage: number,
    releaseDate: Date,
    onWatchlist: boolean,
    watchedAt?: Date[],
    onWaitlist: boolean,
    mediaType: MediaType
}