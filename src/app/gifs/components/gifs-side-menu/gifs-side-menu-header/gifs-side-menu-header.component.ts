import { Component } from '@angular/core';
import { environment } from '@environments/environment.development';


@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',

})
export class GifsSideMenuHeaderComponent { 

  envs = environment;

}
