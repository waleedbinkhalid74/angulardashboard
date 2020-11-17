import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { element } from 'protractor';
import {UserService} from '../../user.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  lineChartxArray: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  measurements_data: any[];
  //key_acc_data: any[];
  sumSalesVolume: number[] = [0,0,0,0,0,0];
  counter: number = 0;

  constructor(private userService:UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userService.castMeasurementData.subscribe(
      val => this.measurements_data = val,
    );
    this.userService.castSumSalesVolume.subscribe(
      val => this.salesVolume[0].data = val,
    );
    this.userService.castDatesXArray.subscribe(
      val => this.salesVolume[0].xArray = val,
    );
    this.userService.castDatesXArray.subscribe(
      val => this.lineChartLabels = val,
    );
//    this.cdr.detectChanges();
    console.log("In line comp", this.salesVolume);
//    this.key_acc_data = <any>keyacc.default;

    for (var _i = 0; _i < this.measurements_data.length; _i++) {

      this.measurements_data[_i].Date = this.userService.ExcelDateToJSDate(this.measurements_data[_i].Date);
    }
    //________________________________________________________________Sum of sales over year_____________________________________________________
    //Taking sum of sales over the period of years
    for (var _i = 0; _i < this.measurements_data.length; _i++) {
      if (this.measurements_data[_i].Date.getTime() <= new Date("2016").getTime()) {
        //  console.log(this.measurements_data[_i].Date);
        this.salesVolume[0].data[0] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2017").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2015").getTime()) {
        this.salesVolume[0].data[1] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2018").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2016").getTime()) {
        this.salesVolume[0].data[2] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2019").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2017").getTime()) {
        this.salesVolume[0].data[3] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2020").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2018").getTime()) {
        this.salesVolume[0].data[4] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2021").getTime()) {
        this.salesVolume[0].data[5] += this.measurements_data[_i].SalesVolume;
      }
      else {
        console.log("Error date not in list");
      }
    }

    
    //Applying Date Filter
 //   this.lineChartxArray   = filterByDate(this.salesVolume[0].xArray, this.salesVolume[0].data, this.filter_start_date, this.filter_end_date)[0];
 //   this.sumSalesVolume = filterByDate(this.salesVolume[0].xArray, this.salesVolume[0].data, this.filter_start_date, this.filter_end_date)[1];
    //console.log(filterByDate(this.salesVolume[0].xArray, this.salesVolume[0].data, filter_start_date, filter_end_date));
    console.log(this.sumSalesVolume);
  }
  salesVolume: any[] = [
    { data: this.sumSalesVolume , xArray: this.lineChartxArray, label: "Sales Volume" }
  ];

  lineChartData = this.salesVolume;
  lineChartLabels = this.lineChartxArray;
  lineChartOptions: any = {
    elements: {
      line: {
        tension: 0
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend = true;
  lineChartType = 'line'
  lineChartColors = LINE_CHART_COLORS;
}

