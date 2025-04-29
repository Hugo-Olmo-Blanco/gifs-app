import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption{
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptionsComponent { 

gifService = inject(GifService)

  menuOptions:MenuOption[]=[{

    icon: 'fa-solid fa-chart-line',
    label:'Trending',
    route:'/dashboard/trending',
    subLabel:'Gifs Populares',

  },

  {

    icon: 'fa-solid fa-magnifying-glass',
    label:'Search',
    route:'/dashboard/search',
    subLabel:'Buscar gifs',

  },
  ]


}
