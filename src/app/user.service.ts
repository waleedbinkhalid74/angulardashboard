import { CastExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as mdata from '../../data/measures_datatable.json'; //Sales Volume Data
import * as kdata from '../../data/dimcust_datatable.json'; // Key acc managers data
import * as adata from '../../data/dimart_datatable.json'; // article data


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private lowDate = new BehaviorSubject<number>(2015);
  private highDate = new BehaviorSubject<number>(2020);
  private measurementData = new BehaviorSubject<any[]>(mdata.default);
  private keyAccMananger = new BehaviorSubject<any[]>(kdata.default);
  private sumKeyAccManager = new BehaviorSubject<number[]>([0, 0, 0]);
  private tempMeasurementsArray = new BehaviorSubject<any[]>(mdata.default);
  private sumSalesVolume = new BehaviorSubject<number[]>([0, 0, 0, 0, 0, 0]);
  private datesXArray = new BehaviorSubject<number[]>([2015, 2016, 2017, 2018, 2019, 2020]);
  private articleData = new BehaviorSubject<any[]>(adata.default);

  castHighDate = this.highDate.asObservable();
  castLowDate = this.lowDate.asObservable();
  castMeasurementData = this.measurementData.asObservable();
  castSumSalesVolume = this.sumSalesVolume.asObservable();
  castKeyAccManager = this.keyAccMananger.asObservable();
  castSumKeyAccManager = this.sumKeyAccManager.asObservable();
  castTempMeasurementsArray = this.tempMeasurementsArray.asObservable();
  castDatesXArray = this.datesXArray.asObservable();
  castArticleData = this.articleData.asObservable();
  // for (var _i = 0; _i < this.measurementData[1].length; _i++) {
  //   this.measurementData[_i].Date = this.ExcelDateToJSDate(this.castMeasurementData[_i].Date);
  // }
  //  this.castMeasurementData; 
  constructor() { }

  editUser(lDate, hDate, mData, kamNames) {
    this.highDate.next(hDate);
    this.lowDate.next(lDate);
    //    this.sumSalesVolume.next(new Array(hDate - lDate).fill(0));
    this.tempMeasurementsArray.next(this.measurementData.value.filter(function (value) {
      return value.Date <= new Date((hDate + 1).toString()) && value.Date >= new Date((lDate).toString());
    }));
    this.sumKeyAccManager.next(keyAccManagerSummer(this.keyAccMananger.value, this.tempMeasurementsArray.value));
    this.sumSalesVolume.next(salesChartData(this.tempMeasurementsArray.value)[0]);
    this.datesXArray.next(salesChartData(this.tempMeasurementsArray.value)[1]);
    console.log(this.datesXArray.value);
  }

  editArticleData(structuredArticleData) {
    var unselectedElements = [];
//    console.log(structuredArticleData);
    for (const property1 in structuredArticleData[0]) {
      if (!Array.isArray(structuredArticleData[0][property1])) {
        for (const property2 in structuredArticleData[0][property1]) {
          if (!Array.isArray(structuredArticleData[0][property1][property2]) && (typeof structuredArticleData[0][property1][property2] === "object")) {
            for (var i = 0; i < structuredArticleData[0][property1][property2].Article.length; i++) {
              if(structuredArticleData[0][property1][property2].Article[i].completed == false){
                unselectedElements.push(structuredArticleData[0][property1][property2].Article[i].name);
              }
            }
          }
        }
      }
    }
    console.log(unselectedElements);
    this.getArticleNumber(unselectedElements);
  }

  getArticleNumber(ArtBez){
    var unselectedArtNr = [];
    console.log(this.articleData.value)
    for (var i=0; i<this.articleData.value.length; i++){
      if(ArtBez.includes(this.articleData.value[i].ArtBez)){
        unselectedArtNr.push(this.articleData.value[i].ArtNr)
      }
    }
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

function keyAccManagerSummer(kdata, mdata) {
  var sumKamSales: number[] = [0, 0, 0];
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

function salesChartData(mdata) {
  var sumSalesYear: number[] = [0, 0, 0, 0, 0, 0];
  var dates: number[] = [2015, 2016, 2017, 2018, 2019, 2020];

  for (var _i = 0; _i < mdata.length; _i++) {
    if (mdata[_i].Date.getTime() <= new Date("2016").getTime()) {
      //  console.log(mdata[_i].Date);
      sumSalesYear[0] += mdata[_i].SalesVolume;
    }
    else if (mdata[_i].Date.getTime() <= new Date("2017").getTime() && mdata[_i].Date.getTime() >= new Date("2015").getTime()) {
      sumSalesYear[1] += mdata[_i].SalesVolume;
    }
    else if (mdata[_i].Date.getTime() <= new Date("2018").getTime() && mdata[_i].Date.getTime() >= new Date("2016").getTime()) {
      sumSalesYear[2] += mdata[_i].SalesVolume;
    }
    else if (mdata[_i].Date.getTime() <= new Date("2019").getTime() && mdata[_i].Date.getTime() >= new Date("2017").getTime()) {
      sumSalesYear[3] += mdata[_i].SalesVolume;
    }
    else if (mdata[_i].Date.getTime() <= new Date("2020").getTime() && mdata[_i].Date.getTime() >= new Date("2018").getTime()) {
      sumSalesYear[4] += mdata[_i].SalesVolume;
    }
    else if (mdata[_i].Date.getTime() <= new Date("2021").getTime()) {
      sumSalesYear[5] += mdata[_i].SalesVolume;
    }
    else {
      console.log("Error date not in list");
    }
  }
  for (var i = 0; i < sumSalesYear.length; i++) {
    if (sumSalesYear[i] == 0) {
      sumSalesYear.splice(i, 1);
      dates.splice(i, 1)
      i--;
    }
  }

  //console.log([sumSalesYear, dates]);
  return [sumSalesYear, dates];
}