// ChuckNorrisAPI Types

interface ErrorResponse{
    categories: string[],
    value: string
}

interface JokeResponse {
    icon_url: string;
    id: string,
    url: string,
    value: string
}

export type {ErrorResponse, JokeResponse};