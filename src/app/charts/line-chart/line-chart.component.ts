import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import * as data from '../../../../data/measures_datatable.json';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [5, 4, 9, 7, 1], label: "Sales Volume" }
];

const LINE_CHART_SAMPLE_LABELS: string[] = ["2016", "2017", "2018", "2019", "2020"];


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  measurements_data: any[];
  sum2016: number[] = [0, 0, 0, 0, 0, 0];
  salesVolume:any [] = [
    {data: this.sum2016, label:"Sales Volume"}
  ];
  
  constructor() { }

  ngOnInit(): void {
    this.measurements_data = <any>data.default;
    //    console.log(ExcelDateToJSDate(this.measurements_data[3].Date));
    //    console.log(this.measurements_data.length);
    //    console.log(this.measurements_data[3].ArtNr);
    for (var _i = 0; _i < this.measurements_data.length; _i++) {
      this.measurements_data[_i].Date = ExcelDateToJSDate(this.measurements_data[_i].Date);
      //      console.log(this.measurements_data[_i].Date);
    }
    //Taking sum of sales over the period of years
    for (var _i = 0; _i < this.measurements_data.length; _i++) {
      if (this.measurements_data[_i].Date.getTime() <= new Date("2016").getTime()) {
        //  console.log(this.measurements_data[_i].Date);
        this.sum2016[0] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2017").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2015").getTime()) {
        this.sum2016[1] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2018").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2016").getTime()) {
        this.sum2016[2] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2019").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2017").getTime()) {
        this.sum2016[3] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2020").getTime() && this.measurements_data[_i].Date.getTime() >= new Date("2018").getTime()) {
        this.sum2016[4] += this.measurements_data[_i].SalesVolume;
      }
      else if (this.measurements_data[_i].Date.getTime() <= new Date("2021").getTime()) {
        this.sum2016[5] += this.measurements_data[_i].SalesVolume;
      }
      else {
        console.log("Error");
      }
    }
    console.log(this.sum2016);
  }

  lineChartData = this.salesVolume;
  lineChartLabels = LINE_CHART_SAMPLE_LABELS;
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend = true;
  lineChartType = 'line'
  lineChartColors = LINE_CHART_COLORS;
}

//Converts back to date
function ExcelDateToJSDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}



