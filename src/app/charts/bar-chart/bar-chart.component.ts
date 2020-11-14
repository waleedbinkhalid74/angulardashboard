import { Component, OnInit } from '@angular/core';


const SAMPLE_BARCHART_DATA: any[] = [
  {data: [65, 59, 80, 81, 56 ], label: 'Q3 Sales'},
  {data: [25, 30, 50, 21, 96 ], label: 'Q4 Sales'}
];

const SAMPLE_BARCHART_LABELS: string[] = ['2016','2017','2018','2019','2020' ];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  ngOnInit(): void {
  }

}
