import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(questionArray, sort): any {
    if (sort == 'oldest' || !sort) {
      return questionArray;
    } else {
      const sortArr = questionArray.slice();
      return sortArr.reverse();
    }
  }

}
