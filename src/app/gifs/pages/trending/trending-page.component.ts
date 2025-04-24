import { ChangeDetectionStrategy, Component } from '@angular/core';
import DashboardPageComponent from "../../../pages/dashboard-page/dashboard-page.component";

@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingComponent { }
