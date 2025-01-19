import {createRouter, createWebHistory} from 'vue-router'
import NProgress from "nprogress";
import {userStores} from "@/stores/user_store.ts";
import {Message} from "@arco-design/web-vue";
import {showLogin} from "@/components/web/q_login.ts"; // 导入 nprogress模块
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "web",
            path: "/",
            component: () => import("@/views/web/index.vue"),
            children: [
                {
                    name: "web_home",
                    path: "",
                    component: () => import("@/views/web/web_home.vue")
                },
                {
                    name: "userCenter",
                    path: "center",
                    component: () => import("@/views/web/user_center/index.vue"),
                    children: [
                        {
                            name: "userCenterInfo",
                            path: "info",
                            component: () => import("@/views/web/user_center/info.vue"),
                        },
                        {
                            name: "userCenterAccount",
                            path: "account",
                            component: () => import("@/views/web/user_center/account.vue"),
                        },
                        {
                            name: "userCenterLoginRecord",
                            path: "Login_record",
                            component: () => import("@/views/web/user_center/login_record.vue"),
                        },
                        {
                            name: "userCenterPrivacy",
                            path: "privacy",
                            component: () => import("@/views/web/user_center/privacy.vue"),
                        },
                        {
                            name: "userCenterHome",
                            path: "home",
                            component: () => import("@/views/web/user_center/home.vue"),
                        },
                        {
                            name: "userCenterHistory",
                            path: "history",
                            component: () => import("@/views/web/user_center/history.vue"),
                        },
                    ]
                },
                {
                    name: "platform",
                    path: "platform",
                    component: () => import("@/views/web/platform/index.vue"),
                    children: [
                        {
                            name: "platformArticle",
                            path: "article",
                            component: () => import("@/views/web/platform/platform_article.vue"),
                        },
                        {
                            name: "platformArticleAdd",
                            path: "article_add",
                            component: () => import("@/views/web/platform/platform_article_add.vue"),
                        },
                        {
                            name: "platformArticleEdit",
                            path: "article/:id",
                            component: () => import("@/views/web/platform/platform_article_edit.vue"),
                        },
                        {
                            name: "platformComment",
                            path: "comment",
                            component: () => import("@/views/web/platform/comment/index.vue"),
                            children: [
                                {
                                    name: "platformCommentArticle",
                                    path: "article",
                                    component: () => import("@/views/web/platform/comment/article_comment.vue"),
                                },
                                {
                                    name: "platformCommentMy",
                                    path: "me",
                                    component: () => import("@/views/web/platform/comment/my_comment.vue"),
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "user",
                    path: "user/:id",
                    component: () => import("@/views/web/user/index.vue"),
                    children: [
                        {
                            name: "userArticle",
                            path: "article",
                            component: () => import("@/views/web/user/article_list.vue"),
                        },
                        {
                            name: "userArticleCollect",
                            path: "collect",
                            component: () => import("@/views/web/user/collect_list.vue"),
                        },
                    ]
                }
            ]
        },
        {
            name: "admin",
            path: "/admin",
            meta: {
                title: "首页",
                role: [1, 3]
            },
            component: () => import("@/views/admin/index.vue"),
            children: [
                {
                    name: "home",
                    path: "home",
                    meta: {
                        title: "首页",
                        role: [1, 2, 3]
                    },
                    component: () => import("@/views/admin/home/index.vue")
                },
                {
                    name: "articleManage",
                    path: "article",
                    meta: {
                        title: "文章管理",
                    },
                    children: [
                        {
                            name: "articleList",
                            path: "article_list",
                            meta: {
                                title: "文章列表",
                            },
                            component: () => import("@/views/admin/article_manage/article_list.vue")
                        },
                    ]
                },
                {
                    name: "userManage",
                    path: "user_manage",
                    meta: {
                        title: "用户管理",
                        role: [1]
                    },
                    children: [
                        {
                            name: "userList",
                            path: "user_list",
                            meta: {
                                title: "用户列表"
                            },
                            component: () => import("@/views/admin/user_manager/user_list.vue"),
                        }
                    ]
                },
                {
                    name: "settingsManager",
                    path: "settings",
                    meta: {
                        title: "系统管理",
                        role: [1]
                    },
                    children: [
                        {
                            name: "siteMange",
                            path: "site",
                            meta: {
                                title: "站点设置"
                            },
                            children: [
                                {
                                    name: "siteMangeSite",
                                    path: "site",
                                    meta: {
                                        title: "网站设置"
                                    },
                                    component: () => import("@/views/admin/settings_manager/site_manage/site.vue"),
                                },
                                {
                                    name: "siteMangeEmail",
                                    path: "email",
                                    meta: {
                                        title: "邮箱设置"
                                    },
                                    component: () => import("@/views/admin/settings_manager/site_manage/email.vue"),
                                },
                                {
                                    name: "siteMangeQQ",
                                    path: "qq",
                                    meta: {
                                        title: "QQ设置"
                                    },
                                    component: () => import("@/views/admin/settings_manager/site_manage/qq.vue"),
                                },
                                {
                                    name: "siteMangeAI",
                                    path: "ai",
                                    meta: {
                                        title: "AI设置"
                                    },
                                    component: () => import("@/views/admin/settings_manager/site_manage/ai.vue"),
                                },
                                {
                                    name: "siteMangeQiniu",
                                    path: "qiniu",
                                    meta: {
                                        title: "七牛云设置"
                                    },
                                    component: () => import("@/views/admin/settings_manager/site_manage/qiniu.vue"),
                                }
                            ]
                        },
                        {
                            name: "logList",
                            path: "log_list",
                            meta: {
                                title: "日志列表"
                            },
                            component: () => import("@/views/admin/settings_manager/log_list.vue"),
                        },
                        {
                            name: "bannerList",
                            path: "banner_list",
                            meta: {
                                title: "banner管理"
                            },
                            component: () => import("@/views/admin/settings_manager/banner_list.vue"),
                        }
                    ]
                },
            ]
        },
        {
            name: "notfound",
            path: "/:match(.*)",
            component: () => import("@/views/web/404.vue")
        }
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.role) {
        const store = userStores()

        if (!store.isLogin) {
            // 没有登陆
            Message.warning("需要登陆")
            console.log(to.path)
            showLogin({to: to.path, reload: true})
            return
        }

        if (!to.meta.role.includes(store.userInfo.role)) {
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
