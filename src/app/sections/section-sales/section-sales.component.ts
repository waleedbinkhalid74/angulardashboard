import { Component, OnInit } from '@angular/core';
import * as data from '../../../../data/measures_datatable.json';
import * as keyacc from '../../../../data/dimcust_datatable.json';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {
  measurements_data: any[];
  key_acc_data: any[];
  sumKeyAccManager: number[] = [0, 0, 0];
  highVal:number;
  lowVal:number;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.castLowDate.subscribe(
      val => this.lowVal = val
    );
    this.userService.castHighDate.subscribe(
      val => this.highVal = val
    );

    this.measurements_data = <any>data.default;
    console.log("HOLLER",this.measurements_data[1]);
    this.key_acc_data = <any>keyacc.default;
    for (var _j = 0; _j < this.key_acc_data.length; _j++) {
      if (this.key_acc_data[_j].Kam == "Maier") {
        for (var k = 0; k < this.measurements_data.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurements_data[k].CustNr) {
            this.sumKeyAccManager[0] += this.measurements_data[k].SalesVolume;
          }
        }
        //        console.log(this.key_acc_data[_j].CustNr);
      }
      else if (this.key_acc_data[_j].Kam == "Huber") {
        //      console.log(this.key_acc_data[_j].CustNr);
        for (var k = 0; k < this.measurements_data.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurements_data[k].CustNr) {
            this.sumKeyAccManager[1] += this.measurements_data[k].SalesVolume;
          }
        }
      }
      else if (this.key_acc_data[_j].Kam == "Mueller") {
        //    console.log(this.key_acc_data[_j].CustNr);
        for (var k = 0; k < this.measurements_data.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurements_data[k].CustNr) {
            this.sumKeyAccManager[2] += this.measurements_data[k].SalesVolume;
          }
        }
      }
      else {
          console.log("Error. Name not in list");
      }
    }
//    console.log(this.sumKeyAccManager);

}

}
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