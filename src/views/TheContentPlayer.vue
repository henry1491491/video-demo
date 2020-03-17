<template>
  <div id="views-the_videoplayer">
    <div class="container">
      <div class="main">
        <div class="demo1-video">
          <base-video-player :options="videoOptions" />
        </div>

        <div
          v-if="selectedVideoInfo"
          class="card"
        >
          <div class="card-title">
            <span>{{selectedVideoInfo.snippet.title}}</span>
          </div>

          <div
            :class="{'actived':isShowDescription}"
            class='card-description'
          >
            <pre>{{selectedVideoInfo.snippet.description}}</pre>

            {{selectedVideoInfo.contentDetails.duration}}
          </div>
          <a
            href="#"
            @click.prevent="toggleDescription()"
            v-text="isShowDescription === true ? '只顯示部份資訊' : '顯示完整資訊'"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheContentPlayer",
  data() {
    return {
      videosData: [],
      videoOptions: {
        autoplay: false,
        controls: true,
        poster: this.selectedVideoInfo.snippet.thumbnails.high.url,
        sources: [
          {
            src:
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      },
      isShowDescription: false
    }
  },
  computed: {
    selectedVideoInfo() {
      return this.videosData.filter(el => el.id === this.$route.params.id)[0]
    }
  },
  created() {
    this.getVideosData()
  },
  methods: {
    getVideosData() {
      this.videosData =
        JSON.parse(window.sessionStorage.getItem("videosData")) || []
      console.log(this.videosData)
    },
    toggleDescription() {
      if (this.isShowDescription) {
        this.isShowDescription = false
      } else {
        this.isShowDescription = true
      }
    }
  }
}
</script>


