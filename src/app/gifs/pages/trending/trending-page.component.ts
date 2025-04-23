import { ChangeDetectionStrategy, Component } from '@angular/core';
import DashboardPageComponent from "../dashboard-page/dashboard-page.component";

@Component({
  selector: 'app-trending',
  imports: [DashboardPageComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingComponent { }
