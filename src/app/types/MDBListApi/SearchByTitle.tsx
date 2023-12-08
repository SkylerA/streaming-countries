export interface SearchByTitleResponse {
    search: MovieResult[];
    total: number;
    response: boolean;
}

export type MovieResult = {
    id: string;
    title: string;
    year: number;
    score: number;
    score_average: number;
    type: string;
    imdbid: string;
    tmdbid: number;
    traktid: number;
}

export const parseSearchByTitleResponse = (data: SearchByTitleResponse) => {
    return data?.search ?? [];
}