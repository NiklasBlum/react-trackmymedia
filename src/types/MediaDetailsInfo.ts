import MediaType from "./MediaType"

export default interface MediaDetailsInfo {
    mediaType: MediaType,
    posterUrl: string,
    title: string,
    overview: string,
    releaseDate: Date,
    trailerId: string
    reviews: string[],
    runtime: number,
    status: string
}