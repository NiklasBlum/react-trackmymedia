import { create } from 'zustand'
import MediaType from '../types/MediaType';
import { User as FirebaseUser } from "firebase/auth"

interface MediaState {
    mediaType: MediaType;
    language: string,
    searchText: string,
    user: FirebaseUser | null,
    apiKey: string,
    baseUrl: string,
    basePosterUrl: string,

    setMediaType: (x: MediaType) => void;
    setSearchText: (x: string) => void;
    setUser: (x: FirebaseUser) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
    mediaType: MediaType.Show,
    searchText: "Ringe der Macht",
    user: null,
    language: "de-DE",
    apiKey: "1f8b7310d5aba63d03369c54c3e4ccd5",
    baseUrl: "https://api.themoviedb.org/3/",
    basePosterUrl: "https://image.tmdb.org/t/p/w500_and_h282_face",

    setMediaType: (x) => set({ mediaType: x }),
    setSearchText: (x) => set({ searchText: x }),
    setUser: (x) => set({ user: x }),
}))