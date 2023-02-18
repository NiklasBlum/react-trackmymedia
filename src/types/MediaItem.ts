
export default interface MediaItem {
    id: number,
    posterUrl: string,
    title: string,
    voteCount: number,
    voteAverage: number,
    releaseDate: string,
    isOnWatchlist: boolean,
    watched: boolean,
    watchedAt?: Date[]
}