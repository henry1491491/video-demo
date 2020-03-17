<template>
  <div id='views-the_home'>
    <the-navbar />

    <router-view />

    <the-footer />
  </div>
</template>

<script>
import TheNavbar from "./TheNavbar"
import TheFooter from "./TheFooter"
//import { apiGetChannelList, apiGetVideosList } from "../plugins/axios"
export default {
  name: "Home",
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>
