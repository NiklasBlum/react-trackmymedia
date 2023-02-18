import { create } from 'zustand'

export const useMediaStore = create((set) => ({
    mediaType: "tv",
    searchText: "Ringe der Macht",
    user: {},
    language: "de-DE",
    apiKey: "1f8b7310d5aba63d03369c54c3e4ccd5",
    baseUrl: "https://api.themoviedb.org/3/",
    basePosterUrl: "https://image.tmdb.org/t/p/w500_and_h282_face",

    setMediaType: (x) => set({ mediaType: x }),
    setSearchText: (x) => set({ searchText: x }),
    setUser: (x) => set({ user: x }),
}))

// TODO: Change to ts file