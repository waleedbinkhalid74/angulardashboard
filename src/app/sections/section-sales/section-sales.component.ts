import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as keyacc from '../../../../data/dimcust_datatable.json';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {
  measurementDataJSON: any[];
  key_acc_data: any[];
  sumKeyAccManager: number[] = [0, 0, 0];
  highVal:number;
  lowVal:number;

  constructor(private userService:UserService, private cdr: ChangeDetectorRef) { }

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
     this.userService.castKeyAccManager.subscribe(
       val => this.key_acc_data = val
     );
     this.cdr.detectChanges();

//    console.log("HOLLER",typeof(this.measurementDataJSON));    
//    console.log("HOLLER",new Date(this.highVal.toString()));    
//    console.log("HOLLER",ExcelDateToJSDate(this.measurementDataJSON[1].Date) <= new Date("2021"));


    for (var _j = 0; _j < this.key_acc_data.length; _j++) {
      if (this.key_acc_data[_j].Kam == "Maier") {
        for (var k = 0; k < this.measurementDataJSON.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurementDataJSON[k].CustNr) {
            this.sumKeyAccManager[0] += this.measurementDataJSON[k].SalesVolume;
          }
        }
        //        console.log(this.key_acc_data[_j].CustNr);
      }
      else if (this.key_acc_data[_j].Kam == "Huber") {
        //      console.log(this.key_acc_data[_j].CustNr);
        for (var k = 0; k < this.measurementDataJSON.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurementDataJSON[k].CustNr) {
            this.sumKeyAccManager[1] += this.measurementDataJSON[k].SalesVolume;
          }
        }
      }
      else if (this.key_acc_data[_j].Kam == "Mueller") {
        //    console.log(this.key_acc_data[_j].CustNr);
        for (var k = 0; k < this.measurementDataJSON.length; k++) {
          if (this.key_acc_data[_j].CustNr == this.measurementDataJSON[k].CustNr) {
            this.sumKeyAccManager[2] += this.measurementDataJSON[k].SalesVolume;
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