import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '考试管理', icon: 'dashboard' }
        }]
    },

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/table',
    //     name: 'Example',
    //     meta: { title: 'Example', icon: 'example' },
    //     children: [{
    //             path: 'table',
    //             name: 'Table',
    //             component: () =>
    //                 import ('@/views/table/index'),
    //             meta: { title: 'Table', icon: 'table' }
    //         },
    //         {
    //             path: 'tree',
    //             name: 'Tree',
    //             component: () =>
    //                 import ('@/views/tree/index'),
    //             meta: { title: 'Tree', icon: 'tree' }
    //         }
    //     ]
    // },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: '用户管理', icon: 'example' },
        children: [
          {
            path: 'table',
            name: 'Table',
            component: () => import('@/views/table/index'),
            meta: { title: '添加用户', icon: 'table' }
          },
          {
            path: 'tree',
            name: 'Tree',
            component: () => import('@/views/tree/index'),
            meta: { title: '用户展示', icon: 'tree' }
          }
        ]
      },


    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    },

  


    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: '班级管理',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: '班级管理' },

            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: '教室管理' }
            },
            {
                path: 'menu3',
                component: () =>
                    import ('@/views/nested/menu3/index'),
                meta: { title: '学生管理' }
            }
        ]
    },
    {
        path: '/Marking',
        component: Layout,
        name: 'Marking',
        redirect: '/Marking/guanli',
        meta: { title: '阅卷管理', icon: 'example' },
        children: [{
                path: '/Marking/guanli',
                name: 'guanli',
                component: () =>
                    import ('@/views/Marking/guanli/index'),
                meta: { title: '待批班级', icon: 'link' }
            },
            {
                path: '/Marking/pijuan',
                name: 'pijuan',
                component: () =>
                    import ('@/views/Marking/pijuan/index')
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router