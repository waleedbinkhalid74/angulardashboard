import { Pipe, PipeTransform } from '@angular/core';

export interface artDataSet {
  GrII: string;
  GrI: string[];
  ArtBez: string[];
  ArtNr: number[];
  id: number[];
  completed: boolean;
}

@Pipe({
  name: 'uniquefilter'
})


export class UniquefilterPipe implements PipeTransform {
  transform(value: unknown, filterType1:unknown): unknown {
    if (filterType1 == 'GrII'){
      return uniqueValueGrII(value);
    }
    else if(filterType1=='GrI'){
      return uniqueValueGrI(value)
    }
    else{
      return null;
    }
  }
}

function uniqueValueGrII(file) {
  var lookup = {};
  var result = [];
  //    console.log(file)
  for (var i = 0; i < file.length; i++) {
    if (!(file[i].GrII in lookup)) {
      lookup[file[i].GrII] = 1;
      result.push(file[i].GrII);
    }
  }
  return result;
}
function uniqueValueGrI(file) {
  var lookup = {};
  var result = [];
  //    console.log(file)
  for (var i = 0; i < file.length; i++) {
    if (!(file[i].GrI in lookup)) {
      lookup[file[i].GrI] = 1;
      result.push(file[i].GrI);
    }
  }
  return result;
}