import axiosInstance from '@/interceptors/axios'
import { loginApi, userInfoApi, loanApi} from '@/constants/api'
import { UserInfo, Result} from '@/constants/variableType'

// login  module
export const login = (data: UserInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loginApi.login,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const loginOut = (callback?: any) => {
  axiosInstance({
    method: 'get',
    url: loginApi.loginOut
  }).then((res: Result) => {
    callback(res)
  })
}

export const getUserList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: userInfoApi.userList
  }).then((res: Result) => {
    callback(res)
  })
}
export const getUserInfo = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: userInfoApi.userInfo
  }).then((res: Result) => {
    callback(res)
  })
}
export const getContactsList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: userInfoApi.contactsList
  }).then((res: Result) => {
    callback(res)
  })
}
export const getRecordsList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: userInfoApi.recordsList
  }).then((res: Result) => {
    callback(res)
  })
}

export const getLoanList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: userInfoApi.loanList
  }).then((res: Result) => {
    callback(res)
  })
}


export const getRepayList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    data: data,
    url: loanApi.repayList
  }).then((res: Result) => {
    callback(res)
  })
}
