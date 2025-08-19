import { promises } from "dns";

import { JokeResponse, ErrorResponse } from "../types"

export class ChuckNorrisAPI {
    static BASE : string = "https://api.chucknorris.io"
    static categories : string[] | undefined = undefined

    static async randomJoke(): Promise<string> {
        const joke = fetch(`${ChuckNorrisAPI.BASE}/jokes/random`)
        .then(res => {
            if(res.ok){return res.json() as Promise<JokeResponse>}
            throw new Error(`Failed: ${res.status}`)
        })
        .then(data => data.value)
        return joke
    }

    static async getCategories(): Promise<string[]>{
        const categories = fetch(`${ChuckNorrisAPI.BASE}/jokes/categories`)
        .then( res => {
            if(res.ok){return res.json() as Promise<string[]>}
            throw new Error(`Failed to get categories: ${res.status}`)
        })
        return categories
    }

    static async categoryJoke(category: string) : Promise<string| ErrorResponse>{
        if(ChuckNorrisAPI.categories === undefined){
            ChuckNorrisAPI.categories = await ChuckNorrisAPI.getCategories()
        }
        console.log(`Searching category: ${category}`)
        //console.log(ChuckNorrisAPI.categories.includes(category))
        if(!(ChuckNorrisAPI.categories.includes(category))){
            return {
                value: "Invalid category",
                categories: ChuckNorrisAPI.categories
            } 
        }

        const joke = fetch(`${ChuckNorrisAPI.BASE}/jokes/random?category=${category}`)
        .then( res => {
            if(res.ok){return res.json() as Promise<JokeResponse>}
            throw new Error(`Failed to get joke based on categroy "${category}": ${res.status}`)
        })
        .then(data => data.value)
        return joke
    }
}