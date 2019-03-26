import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/article'
import Postlist from '../components/postlist'
import Userinfor from '../components/Userinfor'
import Slidebar from '../components/Slidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:Postlist,
      }
    },
    {
      name:'post-content',
      path:'/topic/:id&author:name',
      components:{
        main:Article,
        Slidebar:Slidebar
      }
    },
    {
      name:'user-infor',
      path:'/user-infor/:name',
      components:{
        main:Userinfor
      }
    }
    
  ]
})
