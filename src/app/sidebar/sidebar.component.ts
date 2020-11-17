import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options, ChangeContext, PointerType } from '@angular-slider/ngx-slider';
import {UserService} from '../user.service';

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
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.castLowDate.subscribe(
      val => this.lowVal = val
    );
    this.userService.castHighDate.subscribe(
      val => this.highVal = val
    );
    this.userService.castTempMeasurementsArray.subscribe(
      val => this.measurementDataJSON = val
    );
  }
  highVal: number;
  lowVal: number;
  measurementDataJSON: any[];
  keyAccManagerNames:string[] = ["Maier", "Huber", "Mueller"];

 //Fetching value from slider
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.lowVal = this.getChangeContextString(changeContext)[0];
    this.highVal = this.getChangeContextString(changeContext)[1];
    this.userService.editUser(this.lowVal, this.highVal, this.measurementDataJSON, this.keyAccManagerNames);
//    console.log("The LOW value is now: ", this.lowVal);
//    console.log("The HIGH value is now: ", this.highVal);
  }

  getChangeContextString(changeContext: ChangeContext): number[] {
    return [changeContext.value, changeContext.highValue];
  }

}
