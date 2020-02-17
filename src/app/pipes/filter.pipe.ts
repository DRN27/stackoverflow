import { Pipe, PipeTransform } from '@angular/core';
import { currentUser } from '../environment';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(questionArray, filterArray): any {
    const setOfQuestions = new Set();

    if (filterArray === undefined || filterArray === []) {
      return questionArray;
    }

    if (filterArray.includes('answered') || filterArray.includes('no answered')
      || filterArray.includes('on moderation') || filterArray.includes('my questions')) {

      if (filterArray.includes('answered') && filterArray.includes('no answered')
        || filterArray.includes('answered') && filterArray.includes('on moderation')) {
        return  [];
      } else {
        setOfQuestions.clear();

        if (filterArray.includes('on moderation')) {
          questionArray.forEach(question => {
            if (!question.isApproved) {
              setOfQuestions.add(question);
            }
          });
          questionArray = Array.from(setOfQuestions);
        }

        if (filterArray.includes('my questions')) {
          questionArray.forEach(question => {
            if (question.author == currentUser.currentUserName) {
              setOfQuestions.add(question);
            }
          });
          questionArray = Array.from(setOfQuestions);
        }

        if (filterArray.includes('answered')) {
          setOfQuestions.clear();
          questionArray.forEach(question => {
            if (question.isResolved) {
              setOfQuestions.add(question);
            }
          });
          questionArray = Array.from(setOfQuestions);
        }

        if (filterArray.includes('no answered')) {
          setOfQuestions.clear();
          questionArray.forEach(question => {
            if (!question.isResolved) {
              setOfQuestions.add(question);
            }
          });
          questionArray = Array.from(setOfQuestions);
        }
      }

      setOfQuestions.clear();

    }

    if (filterArray.includes('per day') || filterArray.includes('per week')
      || filterArray.includes('per month')) {

      if ((filterArray.includes('per day') && filterArray.includes('per week')) ||
         (filterArray.includes('per day') && filterArray.includes('per month')) ||
         (filterArray.includes('per month') && filterArray.includes('per week'))) {
           return [];
      } else {
        const today = new Date();
        let array = [];

        if (filterArray.includes('per month')) {
          const  month = new Date(today.valueOf() - 2592000000);
          questionArray.forEach(question => {
            if (question.date <= today && question.date >= month) {
              array.push(question);
            }
          });
          questionArray = array.slice();
        }

        if (filterArray.includes('per week')) {
          array = [];
          const  week = new Date(today.valueOf() - 604800000);
          questionArray.forEach(question => {
            if (question.date <= today && question.date >= week) {
              array.push(question);
            }
          });
          questionArray = array.slice();
        }

        if (filterArray.includes('per day')) {
          array = [];
          const  yesterday = new Date(today.valueOf() - 86400000);
          questionArray.forEach(question => {
            if (question.date <= today && question.date >= yesterday) {
              array.push(question);
            }
          });
          questionArray = array.slice();
        }
      }

    }

    if (filterArray.includes('.net') || filterArray.includes('java')
      || filterArray.includes('frontend') || filterArray.includes('salesforce')) {
      questionArray.forEach(question => {
        filterArray.forEach( filter => {
          if ( question.tags.includes(filter) ) {
            setOfQuestions.add(question);
          }
        })
      });

      questionArray = setOfQuestions;
    }

    return questionArray;
  }

}
