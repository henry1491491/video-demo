<template>
  <div id="views-the_content">
    <div class="grid-container">
      <base-video-card
        v-for="(i,key) in  filterVideosData"
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

    <paginate
      :page-count="totalPages"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :click-handler="getPageHandler"
    />
  </div>
</template>

<script>
export default {
  name: "TheContent",
  data() {
    return {
      currentPage: 1,
      perPage: 12,
      totalItems: 100
    }
  },
  watch: {
    channelUrl() {
      this.debouncedGetUrl()
    }
  },
  created() {
    this.debouncedGetUrl = this._.debounce(this.initialData, 500)
  },
  computed: {
    channelUrl() {
      return this.$store.state.channelUrl
    },
    channelsListThumbnails() {
      return this.$store.state.channelsListThumbnails
    },
    collectList() {
      return this.$store.state.collectList
    },
    filterVideosData() {
      const startIndex = current => (current === 1 ? 0 : (current - 1) * 12)
      return this.videosData.slice(
        startIndex(this.currentPage),
        12 * this.currentPage
      )
    },
    totalPages() {
      let totals = this.totalItems
      let perPage = this.perPage
      return totals % perPage === 0
        ? totals / perPage
        : Math.ceil(totals / perPage)
    },
    videosData() {
      return this.$store.state.videosData
    }
  },
  mounted() {
    this.$store.commit("GET_COLLECT_TITLE_LIST")
    this.initialData()
  },
  methods: {
    getPageHandler(page) {
      this.currentPage = page
    },
    getVideoPlayer(id) {
      this.$router.push(`/id/${id}`)
    },
    setCollectItem(id) {
      this.$store.commit("SET_COLLECT_ITEM", id)
    },
    initialData() {
      this.$store.dispatch("initialData")
    }
  }
}
</script>
