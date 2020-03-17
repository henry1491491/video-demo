<template>
  <div id="views-the_collect">
    <div class="grid-container">
      <base-video-card
        v-for="(i,key) in collectVideosData"
        :key="key"
        :collectList="collectList"
        :description="i.snippet.description"
        :duration="i.contentDetails.duration"
        :id="i.id"
        :title="i.snippet.title"
        :thumbnails="i.snippet.thumbnails.medium"
        :channelsListThumbnails="channelsListThumbnails"
        class="grid-item"
        @get-video-player="getVideoPlayer"
        @set-collect-item="setCollectItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCollect",
  data() {
    return {
      123: 2
    }
  },
  computed: {
    channelsListThumbnails() {
      return this.$store.state.channelsListThumbnails
    },
    collectList() {
      return this.$store.state.collectList
    },
    collectVideosData() {
      const isArray = (collectList, videosData) => {
        let result = []
        for (let i = 0; i < collectList.length; i++) {
          let item = videosData.filter(el => el.id === collectList[i])
          result = result.concat(item)
        }
        return result
      }
      return isArray(this.collectList, this.videosData)
    },
    videosData() {
      return this.$store.state.videosData
    }
  },
  methods: {
    getVideoPlayer(id) {
      this.$router.push(`/content/${id}`)
    },
    setCollectItem(id) {
      this.$store.commit("SET_COLLECT_ITEM", id)
    }
  }
}
</script>
