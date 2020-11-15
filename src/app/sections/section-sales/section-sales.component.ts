import { Component, OnInit } from '@angular/core';
import * as data from '../../../../data/measures_datatable.json';
import * as keyacc from '../../../../data/dimcust_datatable.json';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {
  measurements_data: any[];
  key_acc_data: any[];
  sumKeyAccManager: number[] = [0, 0, 0];
  
  constructor() { }

  ngOnInit(): void {
    this.measurements_data = <any>data.default;
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
    console.log(this.sumKeyAccManager);

}

}
