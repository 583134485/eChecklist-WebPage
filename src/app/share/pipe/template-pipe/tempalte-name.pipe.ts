import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempalteName'
})
export class TempalteNamePipe implements PipeTransform {
  transform(nameSet: any, temName: any): any {

    if (temName === undefined) { return nameSet; }
    return nameSet.filter(function (temp) {
      return temp.toLowerCase().includes(temName.toLowerCase());
    });
  }

}
