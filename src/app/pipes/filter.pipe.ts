import { Pipe, PipeTransform } from '@angular/core';
import { currentUser } from '../environment';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(questionArray, filterArray): any {

    const setOfQuestions = new Set();
    let myQuestions = [];

    if (filterArray === undefined || filterArray.length == 0) {
      return questionArray;
    }

    if (filterArray.includes('answered') || filterArray.includes('no answered')
      || filterArray.includes('on moderation') || filterArray.includes('my questions')) {

        if ( filterArray.includes('my questions') ) {
          myQuestions = questionArray.filter(question => question.author == currentUser.currentUserName);

          if ( filterArray.includes('answered') && filterArray.includes('no answered') ) {
            myQuestions = questionArray.filter(question => question.author == currentUser.currentUserName);
          } else {

            if ( filterArray.includes('answered') ) {
              myQuestions = myQuestions.filter(question => question.isResolved);
            }

            if ( filterArray.includes('no answered') ) {
              myQuestions = myQuestions.filter(question => !question.isResolved);
            }
          }
        } else if ( filterArray.includes('on moderation') ) {
          myQuestions = questionArray.filter(question => !question.isApproved);

          if ( filterArray.includes('answered') && filterArray.includes('no answered') ) {
            myQuestions = questionArray;
          } else {

            if ( filterArray.includes('answered') ) {
              myQuestions = myQuestions.filter(question => question.isResolved);
            }

            if ( filterArray.includes('no answered') ) {
              myQuestions = myQuestions.filter(question => !question.isResolved);
            }
          }
        } else {

          if ( filterArray.includes('answered') && filterArray.includes('no answered') ) {
            myQuestions =  questionArray;
          } else {

            if ( filterArray.includes('answered') ) {
              myQuestions =  questionArray.filter(question => question.isResolved);
            }

            if ( filterArray.includes('no answered') ) {
              myQuestions = questionArray.filter(question => !question.isResolved);
            }
          }
        }
        myQuestions.forEach(question => {
          setOfQuestions.add(question);
        });
    }

    if (filterArray.includes('per day') || filterArray.includes('per week')
      || filterArray.includes('per month')) {

        const today = new Date();

      if (filterArray.includes('per day')) {
        const  yesterday = new Date(today.valueOf() - 86400000);

        myQuestions = questionArray.filter(question => question.date >= yesterday);
      }

      if (filterArray.includes('per week')) {
        const  week = new Date(today.valueOf() - 604800000);

        myQuestions = questionArray.filter(question => question.date >= week);
      }

      if (filterArray.includes('per month')) {
        const  month = new Date(today.valueOf() - 2592000000);

        myQuestions = questionArray.filter(question => question.date >= month);
      }

      myQuestions.forEach(question => {
        setOfQuestions.add(question);
      });
    }

    if (filterArray.includes('.net') || filterArray.includes('java')
      || filterArray.includes('frontend') || filterArray.includes('salesforce')) {

      questionArray.forEach(question => {
        filterArray.forEach( filter => {
          if ( question.tags.includes(filter) ) {
            setOfQuestions.add(question);
          }
        });
      });
    }

    return  Array.from(setOfQuestions);
  }
}
