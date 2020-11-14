import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [5, 4, 9, 7, 1], label: "Sales Volume"}
];

const LINE_CHART_SAMPLE_LABELS: string[] = ["2016", "2017", "2018", "2019", "2020"];


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  lineChartData = LINE_CHART_SAMPLE_DATA;
  lineChartLabels = LINE_CHART_SAMPLE_LABELS;
  lineChartOptions: any = {
    responsive : true,
    maintainAspectRatio: false
  };
  lineChartLegend = true;
  lineChartType = 'line'
  lineChartColors = LINE_CHART_COLORS;
}
