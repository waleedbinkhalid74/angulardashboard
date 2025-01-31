import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {appRoutes} from '../routes';
import { NgModule } from '@angular/core';
import { ChartsModule} from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionOrdersComponent } from './sections/section-orders/section-orders.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberSuffixPipe } from './number-suffix.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { UserService } from './user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ArticleHierarchyComponent } from './article-hierarchy/article-hierarchy.component';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { UniquefilterPipe } from './uniquefilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionSalesComponent,
    SectionOrdersComponent,
    SectionHealthComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    NumberSuffixPipe,
    ArticleHierarchyComponent,
    UniquefilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(appRoutes),
    ChartsModule,
    HttpClientModule,
    NgxSliderModule,    
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule

    ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
