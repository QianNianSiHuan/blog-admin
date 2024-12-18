import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress"; // 导入 nprogress模块
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        name:"web",
        path:"/",
        redirect:"/admin"
      },
      {
        name:"login",
        path:"/login",
        component:()=>import("@/views/login/index.vue")
      },
      {
        name:"admin",
        path:"/admin",
          meta:{
              title:"首页"
          },
        component:()=>import("@/views/admin/index.vue"),
          children:[
              {
                  name:"home",
                  path:"home",
                  meta:{
                      title:"首页"
                  },
                  component:()=>import("@/views/admin/home/index.vue")
              },
              {
                  name:"userCenter",
                  path:"user_center",
                  meta:{
                      title:"个人中心"
                  },
                  children:[
                      {
                          name:"userInfo",
                          path:"user_info",
                          meta:{
                              title:"个人信息"
                          },
                          component:()=>import("@/views/admin/user_center/index.vue"),
                      }
                  ]
              },
              {
                  name:"userManage",
                  path:"user_manage",
                  meta:{
                      title:"用户管理"
                  },
                  children:[
                      {
                          name:"userList",
                          path:"user_list",
                          meta:{
                              title:"用户列表"
                          },
                          component:()=>import("@/views/admin/user_manager/index.vue"),
                      }
                  ]
              },
              {
                  name:"settingsManager",
                  path:"settings_manager",
                  meta:{
                      title:"系统配置"
                  },
                  children:[
                      {
                          name:"settingsList",
                          path:"settings_list",
                          meta:{
                              title:"用户信息"
                          },
                          component:()=>import("@/views/admin/settings_manager/index.vue"),
                      }
                  ]
              },
          ]
      }
  ],
})

router.beforeEach((to, from, next) => {
    NProgress.start();//开启进度条
    next()
})
//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()//完成进度条
})


export default router
