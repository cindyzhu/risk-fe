// const host = process.env.NODE_ENV === 'production' ? '/api' : '/api'
const host =  '/api'
export const loginApi = {
  login: `${host}/user_login`,
  loginOut: `${host}/user_logout`
}

export const userInfoApi = {
  userList: `${host}/user_list`,
  userInfo: `${host}/user_info`,
  contactsList: `${host}/contacts_list`,
  recordsList: `${host}/records_list`,
  loanList: `${host}/loan_list`
}

export const loanApi = {
  repayList: `${host}/repay_list`
}
