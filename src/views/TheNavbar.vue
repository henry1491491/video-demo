<template>
  <div id="views-the_navbar">
    <div class="nav-title-group">
      <img
        height="35"
        src="https://image.flaticon.com/icons/svg/1051/1051248.svg"
      >
      <div class="nav-title">
        精選影片
      </div>
    </div>

    <div class="nav-item">
      <div class="nav-item-group">
        <input
          v-model="channelUrl"
          class="nav-item-input"
          type="text"
          placeholder="請輸入頻道網址"
        >
        <a
          class="nav-item-button"
          href="#"
          @click="getChannelsList"
        >
          取得
        </a>
      </div>
      <router-link
        class="nav-link1"
        tag="a"
        to="/"
      >
        首頁
      </router-link>
      <router-link
        class="nav-link2"
        tag="a"
        to="/collect"
      >
        收藏
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      channelUrl: "UCCKlp1JI9Yg3-cUjKPdD3mw"
    }
  },
  methods: {
    getChannelsList() {
      this.$store.commit("SET_CHANNEL_URL", this.channelUrl)
      this.router.push("/")
    }
  }
}
</script>
