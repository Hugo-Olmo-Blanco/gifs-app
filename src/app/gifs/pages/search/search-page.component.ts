import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import DashboardPageComponent from "../dashboard-page/dashboard-page.component";
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent { 
gifService = inject(GifService)
  gifs = signal<Gif[]>([]);
  searchGifLoading = signal(true);

     constructor(){
            
        }


  onSearch(query:string){
    this.gifService.searchGifs(query).subscribe((resp)=> {
      this.gifs.set(resp)
    })

  }

  

}
