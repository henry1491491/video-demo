<template>
  <div id="views-the_videoplayer">
    <div class="demo1-video">
      <base-video-player
        v-if="videoOptions"
        :options="videoOptions"
      />
    </div>

    <div
      v-if="selectedVideoInfo.length"
      class="card"
    >
      <div class="card-title">
        <span>{{selectedVideoInfo[0].snippet.title}}</span>
      </div>

      <div
        :class="{'card-description-more':isShowDescription === true}"
        class='card-description'
      >
        <div>{{selectedVideoInfo[0].snippet.description}}</div>
      </div>

      <div class="card-text">
        {{selectedVideoInfo[0].contentDetails.duration}}
      </div>

      <a
        href="#"
        @click.prevent="toggleDescription()"
        v-text="isShowDescription === true ? '只顯示部份資訊' : '顯示完整資訊'"
      ></a>

    </div>
  </div>

</template>

<script>
export default {
  name: "TheContentPlayer",
  data() {
    return {
      isShowDescription: false,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src:
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      },
      videosData: []
    }
  },
  computed: {
    selectedVideoInfo() {
      return this.videosData.filter(el => el.id === this.$route.params.id)
    }
  },
  created() {
    this.videosData =
      JSON.parse(window.sessionStorage.getItem("videosData")) || []
    let posterData = this.videosData.filter(
      el => el.id === this.$route.params.id
    )[0].snippet.thumbnails.high.url
    this.$set(this.videoOptions, "poster", posterData)
  },
  methods: {
    toggleDescription() {
      if (!this.isShowDescription) {
        this.isShowDescription = true
      } else {
        this.isShowDescription = false
      }
    }
  }
}
</script>


