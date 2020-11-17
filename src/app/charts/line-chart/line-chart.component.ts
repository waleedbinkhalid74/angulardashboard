import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import * as keyacc from '../../../../data/dimcust_datatable.json';
import { element } from 'protractor';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  lineChartxArray: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  measurements_data: any[];
  key_acc_data: any[];
  sumSalesVolume: number[] = [0,0,0,0,0,0];
  sumKeyAccManager: number[] = [0, 0, 0];
  counter: number = 0;
  filter_start_date: number = 2016;
  filter_end_date: number = 2018;
 
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    //    console.log(this.filter_start_date);
    this.userService.castMeasurementData.subscribe(
      val => this.measurements_data = val,
    );

    console.log("In line comp", this.measurements_data);
    this.key_acc_data = <any>keyacc.default;
    for (var _i = 0; _i < this.measurements_data.length; _i++) {
      this.measurements_data[_i].Date = this.userService.ExcelDateToJSDate(this.measurements_data[_i].Date);
    }
    //________________________________________________________________Sum of sales over year_____________________________________________________
    //Taking sum of sales over the period of years
    for (var _i = 0; _i < this.measurements_data.length; _i++) {
      
      if (this.measurements_data[_i].Date.getTime() <= new Date("2016").getTime()) {
        //  console.log(this.measurements_data[_i].Date);
        this.sumSalesVolume[0] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2017").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2015").getTime()) {
        this.sumSalesVolume[1] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2018").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2016").getTime()) {
        this.sumSalesVolume[2] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2019").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2017").getTime()) {
        this.sumSalesVolume[3] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2020").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2018").getTime()) {
        this.sumSalesVolume[4] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2021").getTime()) {
        this.sumSalesVolume[5] += this.measurements_data[_i].SalesVolume;
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
  lineChartLabels = this.salesVolume[0].xArray;
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

//Converts back to date
function filterByDate(xarr, yarr, startDate, endDate) {
  return [xarr.slice(xarr.indexOf(startDate), xarr.indexOf(endDate) + 1), yarr.slice(xarr.indexOf(startDate), xarr.indexOf(endDate) + 1)]
}

function applyFilter(val){
  return val!=0;
}
