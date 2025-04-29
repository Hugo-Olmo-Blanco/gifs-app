import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

//Record<string>, Gif[]>

const GIF_KEY = 'gifs' 

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem('GIF_KEY') ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs
}

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);


    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

     constructor(){
            this.loadTrendingGifs();
        }

    loadTrendingGifs(){

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params:{
            api_key: environment.apiKeysGiphy,
            limit:20,
        },
    }).subscribe((resp)=>{
        console.log({resp});
        const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log(gifs)

    });
     

    }


    searchGifs(query:string) {

       return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params:{
                api_key: environment.apiKeysGiphy,
                limit:20,
                q: query,
            }

        }).pipe(
            map(({data}) => data),
            map((items) => GifMapper.mapGiphyItemToGifArray(items)),
        //.subscribe((resp) =>{
           // const gifs = GifMapper.mapGiphyItemToGifArray(resp.data)
            //console.log({search: gifs});
       // })

       tap ((items) => {
        this.searchHistory.update((history) => ({
            ... history, 
            [query.toLowerCase()]: items,
        }));
       })
);
    }
    saveGifsToLocalStorage = effect(() => {
        // console.log(`Character count ${this.characters().length}`)
        const historyString = JSON.stringify(this.searchHistory)
        localStorage.setItem('GIF_KEY', JSON.stringify( this.searchHistory())) //Para almacenar en storage se convierte en string
     })

    getHistoryGifs (query:string):Gif[] {
        return this.searchHistory()[query] ?? []

    }
    
}