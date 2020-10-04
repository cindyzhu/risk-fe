import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Login.vue')
const Base = () => import(/* webpackChunkName: "base" */ '@/components/Base.vue')
const UserList = () => import(/* webpackChunkName: "userlist" */ '@/components/UserList.vue')
const RepayList = () => import(/* webpackChunkName: "repayList" */ '@/components/RepayList.vue')
const CreditList = () => import(/* webpackChunkName: "creditList" */ '@/components/CreditList.vue')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/components/NotFound.vue')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'noFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Base,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: UserList
        },
        {
          path: 'loan',
          name: 'loan',
          component: RepayList
        },
        {
          path: 'credit',
          name: 'credit',
          component: CreditList
        }
      ]
    }
  ]
})
