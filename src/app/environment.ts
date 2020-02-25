import {SortBar, Tags, CurrentUser, AdminsList} from './interface';

export const sortBar: SortBar = {
  filtersForAdmin: [
    {value: 'answered'},
    {value: 'no answered'},
    {value: '.net'},
    {value: 'java'},
    {value: 'frontend'},
    {value: 'salesforce'},
    {value: 'per day'},
    {value: 'per week'},
    {value: 'per month'},
    {value: 'on moderation'},
  ],
  filtersForUser: [
    {value: 'answered'},
    {value: 'no answered'},
    {value: '.net'},
    {value: 'java'},
    {value: 'frontend'},
    {value: 'salesforce'},
    {value: 'per day'},
    {value: 'per week'},
    {value: 'per month'},
    {value: 'my questions'},
  ],
  sorts: [
    {value: 'newest'},
    {value: 'oldest'},
  ]
};

export const tagsData: Tags = {
  tags: [
    {value: '.net', checked: false},
    {value: 'java', checked: false},
    {value: 'frontend', checked: false},
    {value: 'salesforce', checked: false}
  ]
};

export const currentUser: CurrentUser = {
  currentUserName: '',
  isAdmin: false
};

export const adminsList: AdminsList = {
  admins: ['admin@gmail.com']
};



