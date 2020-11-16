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
  highVal: number= 2020;
  lowVal: number = 2015;
  /*
    onUserChangeStart(changeContext: ChangeContext): void {
      this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
    }
  
    onUserChange(changeContext: ChangeContext): void {
      this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
    }
  */
 //Fetching value from slider
  onUserChangeEnd(changeContext: ChangeContext): void {
    //    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    this.highVal = this.getChangeContextString(changeContext)[1];
    this.lowVal = this.getChangeContextString(changeContext)[0];
//    console.log(this.highVal);
  }

  getChangeContextString(changeContext: ChangeContext): number[] {
    return [changeContext.value, changeContext.highValue];
  }
}
