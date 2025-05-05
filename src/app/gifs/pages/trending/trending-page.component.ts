import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state';

 


@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending-page.component.html',
 
})
export default class TrendingComponent implements AfterViewInit {
 

  gifService = inject(GifService)
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')



  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv)return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    
  }


  onScroll(event:Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if (!scrollDiv)return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    console.log(clientHeight, scrollHeight)

    if (isAtBottom){
      this.gifService.loadTrendingGifs();

    }
  }
  

 }
