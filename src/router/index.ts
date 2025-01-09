import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress";
import {userStores} from "@/stores/user_store.ts";
import {Message} from "@arco-design/web-vue"; // 导入 nprogress模块
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        name:"web",
        path:"/",
          component:()=>import("@/views/web/web_home.vue"),
          children:[
              {
                  name:"web_home",
                  path:"/web_home",
                  component:()=>import("@/views/web/web_home.vue")
              },
          ]
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
              title:"首页",
              role:[1,2,3]
          },
        component:()=>import("@/views/admin/index.vue"),
          children:[
              {
                  name:"home",
                  path:"home",
                  meta:{
                      title:"首页",
                      role:[1,2,3]
                  },
                  component:()=>import("@/views/admin/home/index.vue")
              },
              {
                  name:"userCenter",
                  path:"user_center",
                  meta:{
                      title:"个人中心",
                      role:[1,2]
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
                      title:"用户管理",
                      role:[1]
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
                  path:"settings",
                  meta:{
                      title:"系统管理",
                      role:[1]
                  },
                  children:[
                      {
                          name:"siteMange",
                          path:"site",
                          meta:{
                              title:"站点设置"
                          },
                          children:[
                              {
                                  name:"siteMangeSite",
                                  path:"site",
                                  meta:{
                                      title:"网站设置"
                                  },
                                  component:()=>import("@/views/admin/settings_manager/site_manage/site.vue"),
                              },
                              {
                                  name:"siteMangeEmail",
                                  path:"email",
                                  meta:{
                                      title:"邮箱设置"
                                  },
                                  component:()=>import("@/views/admin/settings_manager/site_manage/email.vue"),
                              },
                              {
                                  name:"siteMangeQQ",
                                  path:"qq",
                                  meta:{
                                      title:"QQ设置"
                                  },
                                  component:()=>import("@/views/admin/settings_manager/site_manage/qq.vue"),
                              },
                              {
                                  name:"siteMangeAI",
                                  path:"ai",
                                  meta:{
                                      title:"AI设置"
                                  },
                                  component:()=>import("@/views/admin/settings_manager/site_manage/ai.vue"),
                              },
                              {
                                  name:"siteMangeQiniu",
                                  path:"qiniu",
                                  meta:{
                                      title:"七牛云设置"
                                  },
                                  component:()=>import("@/views/admin/settings_manager/site_manage/qiniu.vue"),
                              }
                          ]
                      },
                      {
                          name:"logList",
                          path:"log_list",
                          meta:{
                              title:"日志列表"
                          },
                          component:()=>import("@/views/admin/settings_manager/log_list.vue"),
                      }
                  ]
              },
          ]
      },
      {
          name:"notfound",
          path:"/:match(.*)",
          component:()=>import("@/views/web/404.vue")
      }
  ],
})

router.beforeEach((to, from, next) => {
    if(to.meta.role){
        const store = userStores()

        if (!store.isLogin) {
            // 没有登陆
            Message.warning("需要登陆")
            router.push({
                name: "login", query: {
                    redirect: to.path // 方便登录完之后跳转回原地址
                }
            })
            return
        }

        if (!to.meta.role.includes(store.userInfo.role)){
            //不在
            Message.warning("权限不足")
            router.push(from.path)
            return
        }
    }
    NProgress.start();//开启进度条
    next()
})
//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()//完成进度条
})


export default router
