import * as types from './mutation-types'
import { ActionTree, Action } from 'vuex'




const getList: Action<object, object> = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
  })
}


const actions: ActionTree<object, object> = {
  getList,
}

export default actions
