import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import AdminLayout from '../views/layout/AdminLayout.vue'
import DashboardHome from '../views/dashboard/DashboardHome.vue'
import ClubList from '../views/clubs/ClubList.vue'
import ClubDetails from '../views/clubs/ClubDetails.vue'
import CategoryList from '../views/clubs/CategoryList.vue'


import UserList from '../views/users/UserList.vue'
import OperationLog from '../views/system/OperationLog.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'DashboardHome',
        component: DashboardHome,
        meta: { title: '首页概览' }
      },
      {
        path: '/clubs',
        name: 'ClubList',
        component: ClubList,
        meta: { title: '社团列表' }
      },
      {
        path: '/clubs/:id',
        name: 'ClubDetails',
        component: ClubDetails,
        meta: { title: '社团详情' }
      },
      {
        path: '/club-categories',
        name: 'CategoryList',
        component: CategoryList,
        meta: { title: '社团管理' }
      },
   
      {
        path: '/users',
        name: 'UserList',
        component: UserList,
        meta: { title: '用户管理' }
      },
      {
        path: '/operation-logs',
        name: 'OperationLog',
        component: OperationLog,
        meta: { title: '操作日志' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
