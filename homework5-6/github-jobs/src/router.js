import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Positions from './views/Positions.vue'
import SinglePositions from './views/SinglePositions.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About,

            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/positions',
            name: 'positions',
            component: Positions
        },
        {
            path: '/positions/:id',
            name: 'singlePosition',
            component: SinglePositions
        },
    ]
})
