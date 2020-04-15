import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

import ItemEdit from '../views/ItemEdit'
import ItemList from '../views/ItemList'

import HeroEdit from '../views/HeroEdit'
import HeroList from '../views/HeroList'

import ArticleEdit from '../views/ArticleEdit'
import ArticleList from '../views/ArticleList'

import AdEdit from '../views/AdEdit'
import AdList from '../views/AdList'

import AdminUserEdit from '../views/AdminUserEdit'
import AdminUserList from '../views/AdminUserList'

import Login from '../views/Login'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{isPublic:true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/create', name:'CategoryEdit', component:CategoryEdit},
      {path:'/categories/edit/:id', name:'CategoryEdit', component:CategoryEdit, props:true},
      {path:'/categories/list', name:'CategoryList', component:CategoryList},

      {path:'/items/create', name:'ItemEdit', component:ItemEdit},
      {path:'/items/edit/:id', name:'ItemEdit', component:ItemEdit, props:true},
      {path:'/items/list', name:'ItemList', component:ItemList},

      {path:'/heros/create', name:'HeroEdit', component:HeroEdit},
      {path:'/heros/edit/:id', name:'HeroEdit', component:HeroEdit, props:true},
      {path:'/heros/list', name:'HeroList', component:HeroList},

      {path:'/articles/create', name:'ArticleEdit', component:ArticleEdit},
      {path:'/articles/edit/:id', name:'ArticleEdit', component:ArticleEdit, props:true},
      {path:'/articles/list', name:'ArticleList', component:ArticleList},

      {path:'/ads/create', name:'AdEdit', component:AdEdit},
      {path:'/ads/edit/:id', name:'AdEdit', component:AdEdit, props:true},
      {path:'/ads/list', name:'AdList', component:AdList},

      {path:'/admin_users/create', name:'AdminUserEdit', component:AdminUserEdit},
      {path:'/admin_users/edit/:id', name:'AdminUserEdit', component:AdminUserEdit, props:true},
      {path:'/admin_users/list', name:'AdminUserList', component:AdminUserList},
    ]
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
