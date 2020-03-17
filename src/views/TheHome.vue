<template>
  <div id='views-the_home'>
    <div class="container">
      <the-navbar @toggle-modal="openModal" />

      <div class="info">
        輸入喜歡的頻道網址（...channel/ 後面）點擊取得即可取得該頻道前 100 部影片。如：UCCKlp1JI9Yg3-cUjKPdD3mw
      </div>

      <div
        v-show="modalShow"
        class="modal"
      >
        <div class="modal-content">

          <router-link
            class="link"
            tag="div"
            to="/content"
          >
            <span>首頁</span>
          </router-link>
          <router-link
            class="link"
            tag="div"
            to="/collect"
          >
            <span>收藏</span>
          </router-link>
        </div>
      </div>

      <router-view />

    </div>
  </div>
</template>

<script>
import TheNavbar from "./TheNavbar"

//import { apiGetChannelList, apiGetVideosList } from "../plugins/axios"
export default {
  name: "Home",
  components: {
    TheNavbar
  },
  data() {
    return {
      modalShow: false,
      channelUrl: ""
    }
  },
  methods: {
    getChannelsList() {
      this.$store.commit("SET_CHANNEL_URL", this.channelUrl)
      this.router.push("/content")
    },
    openModal(show) {
      if (!show.isShow) {
        this.modalShow = true
      } else {
        this.modalShow = false
      }
    }
  }
}
</script>
