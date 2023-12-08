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

export const parseGetIdResponse = (data: GetIdResponse) => {
    const info = data.result?.streamingInfo;
    const countries = [];
    // Step through each country
    if (info) {
        for (const [country, val] of Object.entries(info)) {
            // Filter out countries that don't have a video for free or subscription
            const found = val.filter(obj => obj.streamingType === "subscription" || obj.streamingType === "free");
            // Add country code to results and store
            for (const obj of found) {
                countries.push({ country, ...obj } as CountryResult);
            }
        }
    }
    return countries;
}