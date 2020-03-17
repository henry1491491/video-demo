import Vue from "vue"
import VueRouter from "vue-router"
import TheHome from "../views/TheHome.vue"
import TheContent from "../views/TheContent.vue"
import TheContentPlayer from "../views/TheContentPlayer"
import TheCollect from "../views/TheCollect.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: TheHome,
    children: [
      { path: "", name: "TheContent", component: TheContent },
      { path: "id/:id", name: "TheContentPlayer", component: TheContentPlayer },
      { path: "collect", name: "TheCollect", component: TheCollect }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
