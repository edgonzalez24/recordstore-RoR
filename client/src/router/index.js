import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'
import Artists from '@/pages/Artists'
import Records from '@/pages/Records'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/artists',
      name: 'Artists',
      component: Artists
    },
    {
      path: '/records',
      name: 'Records',
      component: Records
    }
  ]
})
