import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniquefilter'
})
export class UniquefilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
