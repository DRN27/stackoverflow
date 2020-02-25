export interface Question {
  id?: string,
  author: string,
  title: string,
  text: string,
  tags: [],
  date: string,
  isApproved: boolean,
  isResolved: boolean,
  comments?: {
    author: string,
    text: string,
    date: string,
    isChecked?: boolean
  }
}

export interface SortBar {
  filtersForAdmin: [
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
  ],
  filtersForUser: [
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
    {value: string},
  ],
  sorts: [
    {value: string},
    {value: string},
  ]
}

export interface Tags {
  tags: [
    {value: string, checked: boolean},
    {value: string, checked: boolean},
    {value: string, checked: boolean},
    {value: string, checked: boolean}
  ]
}

export interface CurrentUser {
  currentUserName: string,
  isAdmin: boolean
}

export interface AdminsList {
  admins: Array<string>
}


