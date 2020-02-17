import { Pipe, PipeTransform } from '@angular/core';
import {currentUser} from '../environment';

@Pipe({
  name: 'moderation'
})
export class ModerationPipe implements PipeTransform {

  transform(questionsArray): any {

    if (currentUser.isAdmin) {
      return questionsArray
    } else {
      const array = [];

      questionsArray.forEach( question => {
        if (!question.isApproved && question.author == currentUser.currentUserName) {
          array.push(question);
        }
        if (question.isApproved) {
          array.push(question);
        }
      });

      return questionsArray = array.slice();
    }

  }

}
