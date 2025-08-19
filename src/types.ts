// ChuckNorrisAPI Types
interface JokeResponse {
    icon_url: string;
    id: string,
    url: string,
    value: string
}

interface ErrorResponse{
    value: string,
    categories?: string[]
}

export type {JokeResponse, ErrorResponse};