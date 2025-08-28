//import { promises } from "dns";

import { JokeResponse } from "../types"
import { ErrorResponse } from "../types"


// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChuckNorrisAPI {
  static BASE = "https://api.chucknorris.io";
  static categories: string[] | undefined;
  

  static async categoryJoke(category: string): Promise< ErrorResponse | string> {
    this.categories ??= await ChuckNorrisAPI.getCategories();
    //console.log(`Searching category: ${category}`);
    if (!this.categories.includes(category)) {
      return {
        categories: this.categories,
        value: "Invalid category"
      } as ErrorResponse;
    }
    const res = await fetch(`${this.BASE}/jokes/random?category=${category}`);
    if (!res.ok) throw new Error(`Failed to get joke for category "${category}": ${res.status.toString()}`);
    const data = await res.json() as JokeResponse;
    return data.value;
  }

  static async getCategories(): Promise<string[]> {
    const res = await fetch(`${this.BASE}/jokes/categories`);
    if (!res.ok) throw new Error(`Failed to get categories: ${res.status.toString()}`);
    return await res.json() as string[];
  }

  static async randomJoke(): Promise<string> {
    const res = await fetch(`${this.BASE}/jokes/random`);
    if (!res.ok) throw new Error(`Failed: ${res.status.toString()}`);
    const data = await res.json() as JokeResponse;
    return data.value;
  }

};