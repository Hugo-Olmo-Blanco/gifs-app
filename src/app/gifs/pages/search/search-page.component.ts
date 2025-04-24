import { ChangeDetectionStrategy, Component } from '@angular/core';
import DashboardPageComponent from "../dashboard-page/dashboard-page.component";

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent { }
