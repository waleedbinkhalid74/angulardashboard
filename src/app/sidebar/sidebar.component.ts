import { Component, OnInit } from '@angular/core';
import { Options, ChangeContext, PointerType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  minValue: number = 2015;
  maxValue: number = 2020;
  options: Options = {
    floor: 2015,
    ceil: 2020,
    showTicks: true
  };

  constructor() { }

  ngOnInit(): void {
    console.log(this.maxValue);
  }
logText: string = '';
/*
  onUserChangeStart(changeContext: ChangeContext): void {
    this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
  }
*/
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    console.log(this.logText);
  }

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}, ` +
           `highValue: ${changeContext.highValue}}`;
  }
}
