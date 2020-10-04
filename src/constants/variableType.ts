export interface UserInfo {
  client_id: string
  password: string
}
export interface QueryInfo {
  page_num?: number
  per_page_num?: number
  where_str?: object
}

export interface Result {
  code: number | string
  data: object
  msg?: string
}

export interface MenuList {
  title: string,
  name: string,
  icon: string
}

export interface MenuItem {
  title: string,
  name: string,
  icon?: string,
  subNav?: Array<MenuItem>
}
