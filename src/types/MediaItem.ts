
export default interface MediaItem {
    id: number,
    posterUrl: string,
    title: string,
    voteCount: number,
    voteAverage: number,
    releaseDate: Date,
    isOnWatchlist: boolean,    
    watchedAt?: Date[]
}