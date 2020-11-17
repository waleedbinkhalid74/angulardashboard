import { CastExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as mdata from '../../data/measures_datatable.json';
import * as kdata from '../../data/dimcust_datatable.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private lowDate = new BehaviorSubject<number>(2015);
  private highDate = new BehaviorSubject<number>(2020);
  private measurementData = new BehaviorSubject<any[]>(mdata.default);
  private keyAccMananger = new BehaviorSubject<any[]>(kdata.default);
  private sumSalesVolume = new BehaviorSubject<number[]>([0, 0, 0, 0, 0, 0]);
  private sumKeyAccManager = new BehaviorSubject<number[]>([0,0,0]);
  private tempMeasurementsArray = new BehaviorSubject<any[]>(mdata.default);

  castHighDate = this.highDate.asObservable();
  castLowDate = this.lowDate.asObservable();
  castMeasurementData = this.measurementData.asObservable();
  castSumSalesVolume = this.sumSalesVolume.asObservable();
  castKeyAccManager = this.keyAccMananger.asObservable();
  castSumKeyAccManager = this.sumKeyAccManager.asObservable();
  castTempMeasurementsArray = this.tempMeasurementsArray.asObservable();

  // for (var _i = 0; _i < this.measurementData[1].length; _i++) {
  //   this.measurementData[_i].Date = this.ExcelDateToJSDate(this.castMeasurementData[_i].Date);
  // }
  //  this.castMeasurementData; 
  constructor() { }

  editUser(lDate, hDate, mData, kamNames) {
    this.highDate.next(hDate);
    this.lowDate.next(lDate);
    this.sumSalesVolume.next(new Array(hDate - lDate).fill(0));
    this.tempMeasurementsArray.next(this.measurementData.value.filter(function(value){
//      console.log(value.Date < new Date(hDate.toString()));
        return value.Date <= new Date((hDate+1).toString()) && value.Date >= new Date((lDate).toString()) ;
    }));
    this.sumKeyAccManager.next(keyAccManagerSummer(this.keyAccMananger.value, this.tempMeasurementsArray.value));
    // this.sumKeyAccManager.next(this.keyAccMananger.value.filter(function(value){
    //   console.log(value.Kam == kamNames[0])
    // }));
  }

  ExcelDateToJSDate(serial) {
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

}


function keyAccManagerSummer(kdata, mdata){
  var sumKamSales: number[] = [0,0,0];
  for (var _j = 0; _j < kdata.length; _j++) {
    if (kdata[_j].Kam == "Maier") {
      for (var k = 0; k < mdata.length; k++) {
        if (kdata[_j].CustNr == mdata[k].CustNr) {
          sumKamSales[0] += mdata[k].SalesVolume;
        }
      }
      //        console.log(this.key_acc_data[_j].CustNr);
    }
    else if (kdata[_j].Kam == "Huber") {
      //      console.log(this.key_acc_data[_j].CustNr);
      for (var k = 0; k < mdata.length; k++) {
        if (kdata[_j].CustNr == mdata[k].CustNr) {
          sumKamSales[1] += mdata[k].SalesVolume;
        }
      }
    }
    else if (kdata[_j].Kam == "Mueller") {
      //    console.log(this.key_acc_data[_j].CustNr);
      for (var k = 0; k < mdata.length; k++) {
        if (kdata[_j].CustNr == mdata[k].CustNr) {
          sumKamSales[2] += mdata[k].SalesVolume;
        }
      }
    }
    else {
        console.log("Error. Name not in list");
    }
  }
  return sumKamSales;
}
