export interface GetIdResponse {
    result: Result;
}

export interface Result {
    type: string;
    title: string;
    streamingInfo: StreamingInfo;
    year: number;
    imdbId: string;
    tmdbId: number;
    originalTitle: string;
    genres: Genre[];
    directors: string[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface StreamingInfo {
    [key: string]: StreamOption[];
}

export interface StreamOption {
    service: string;
    streamingType: string;
    quality?: string;
    link: string;
    audios: Audio[];
    subtitles: Subtitle[];
    price?: Price;
    availableSince: number;
}

export interface CountryResult extends StreamOption {
    country: string;
}

export interface Audio {
    language: string;
    region: string;
}

export interface Price {
    amount: string;
    currency: string;
    formatted: string;
}

export interface Subtitle {
    locale: Audio;
    closedCaptions: boolean;
}
