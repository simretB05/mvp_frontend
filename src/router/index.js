import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHomePage from '@/views/Users/UserHomePage.vue'
import RegisterUniversityPage from '@/views/Users/RegisterUniversityPage.vue'
import UniversityListingPage from '@/views/Users/UniversityListingPage'
import ContactUsPage from '@/views/Users/ContactUsPage'
import AboutUsPage from '@/views/Users/AboutUsPage'
import UniHomePage from '@/views/universities/UniHomePage'
import UniProfileSettingsPage from '@/views/universities/UniProfileSettingsPage.vue'
import UniDormitoriesPage from '@/views/universities/UniDormitoriesPage'
import UniRoomsPage from '@/views/universities/UniRoomsPage'
import UniNotificationsPage from '@/views/universities/UniNotificationsPage'




Vue.use( VueRouter )

const routes = [
  {
    path: '/',
    name: 'home',
    component: UserHomePage
  },
  {
    path: '/univetsity-Listing',
    name: 'univetsity-Listing',
    component: UniversityListingPage
  },
  {
    path: '/contact-us',
    name: 'conatct-us',
    component: ContactUsPage
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUsPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUniversityPage
  },
  {
    path: '/university-home',
    name: 'university-home',
    component: UniHomePage
  },
  {
    path: '/profile-settings',
    name: 'profile-settings',
    component: UniProfileSettingsPage
  },
  {
    path: '/dormitories',
    name: 'dormitories',
    component: UniDormitoriesPage
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: UniRoomsPage
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: UniNotificationsPage
  },
]

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes
} )

export default router

// remebmebr to use and lear this
// {
//   path: '/Register',
//   name: 'register',
//   component: RegisterUniversityPage

//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue' )
// },