import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

//引入组件，使用懒加载引入 可以跑，需要先把组件跑一边，会浪费

const Login = () => import("@/views/Login/index")
const LayOut = () => import("@/layout/index")

const Home = () => import("@/views/Home/index")
const Chapter = () => import("@/views/Chapter/index")
const Logs = () => import("@/views/Logs/index")
const Model = () => import("@/views/Model/index")
const Title = () => import("@/views/Title/index")
const Video = () => import("@/views/Video/index")
const Vip = () => import("@/views/Vip/index")
const WxOrder= () => import("@/views/WxOrder/index")
const ZfbOrder = () => import("@/views/ZfbOrder/index")
const Manager = () => import("@/views/Manager/index")
const ManagerInsert = () => import("@/views/Manager/insert")
const Profile = () => import("@/views/Profile/index")

const routes = [
  {
    path:'/',
    component: LayOut,
    redirect:'/home',
    children: [
      {
        path:'home',
         component: Home,
         meta:{
          title:'首页'
         }
      }
    ]
  },
  {
    path:'/title',
    component: LayOut,
    children: [
      {
        path:'',
         component: Title,
         meta:{
          title:'大标题管理'
         }

      }
    ]
  },
  {
    path:'/chapter',
    component: LayOut,
    children: [
      {
        path:'',
         component: Chapter,
         meta:{
          title:'章节管理'
         }

      }
    ]
  },
  {
    path:'/vip',
    component: LayOut,
    children: [
      {
        path:'',
         component: Vip,
         meta:{
          title:'会员管理'
         }

      }
    ]
  },
  {
    path:'/video',
    component: LayOut,
    children: [
      {
        path:'',
         component: Video,
         meta:{
          title:'视频管理'
         }

      }
    ]
  },
  {
    path:'/wxorder',
    component: LayOut,
    children: [
      {
        path:'',
         component: WxOrder,
         meta:{
          title:'微信管理'
         }

      }
    ]
  },
  {
    path:'/zfborder',
    component: LayOut,
    children: [
      {
        path:'',
         component: ZfbOrder,
         meta:{
          title:'支付宝管理'
         }

      }
    ]
  },
  {
    path:'/model',
    component: LayOut,
    children: [
      {
        path:'',
         component: Model,
         meta:{
          title:'模块管理'
         }

      }
    ]
  },
  {
    path:'/logs',
    component: LayOut,
    children: [
      {
        path:'',
         component: Logs,
         meta:{
          title:'登录日志'
         }

      }
    ]
  },
  {
    path:'/manager',
    component: LayOut,
    redirect:'/manager/index',
    children: [
      {
        path:'index',
         component: Manager,
         meta:{
          title:'管理员查询'
         }

      },
        {
        path:'insert',
        component: ManagerInsert,
        meta:{
          title:'新增管理员'
     }
  }
    ]
  },
  {
    path:'/profile',
    component: LayOut,
    children: [
      {
        path:'index',
        component: Profile,
        meta:{
          title:'个人信息'
         }

      },
       
    ]
  },
  {
    path:'/login',
    component: Login
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
