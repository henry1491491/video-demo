<template>
  <div>
    <video
      v-if="options"
      ref="videoPlayer"
      class="video-js vjs-big-play-centered vjs-fluid"
    >
      <source
        src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        type="application/x-mpegURL"
      >
    </video>
  </div>
</template>


<script>
export default {
  name: "BaseVideoPlayer",
  props: {
    options: {
      type: Object,
      default() {

        return {
          autoplay: false,
          controls: true,
          poster: "",
          sources: [
            {
              src:
                "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
              type: "application/x-mpegURL"
            }
          ]
        };
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = this.$video(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
