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

interface Logger {
    add: () => void;
    jokeCounter: number;
}

const cacheLogger: Logger = {
  add: () => { cacheLogger.jokeCounter++ },
  jokeCounter: 0
}

export type {ErrorResponse, JokeResponse, Logger};
export {cacheLogger};