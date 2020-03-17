<template>
  <div id="components-base_videocard">
    <div class="card">
      <div class="card-header">
        <a
          href="#"
          @click="getVideoPlayer(id)"
        >
          <img
            :src="thumbnails.url"
            :width="thumbnails.width"
            :height="thumbnails.height"
          >
          <a
            v-if="collectList.indexOf(id) !== -1"
            href="#"
            @click.stop="setCollectItem(id)"
          >
            <star />
          </a>
          <a
            v-else
            href="#"
            @click.stop="setCollectItem(id)"
          >
            <star-outline />
          </a>

        </a>
      </div>

      <div class="card-body">
        <div class="card-avatar">
          <img
            :src="channelsListThumbnails.default.url"
            width="30px"
            height="30px"
          >
        </div>
        <div class="card-content">
          <p class="card-title">
            {{title}}
          </p>
          <p class="card-description">
            {{description}}
          </p>
          <p class="card-text">
            影片長度：{{duration}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseVideoCard",
  props: {
    channelsListThumbnails: { type: Object },
    collectList: { type: Array },
    description: { type: String },
    duration: { type: String },
    thumbnails: { type: Object },
    title: { type: String },
    id: { type: String }
  },
  methods: {
    getVideoPlayer(id) {
      this.$emit("get-video-player", id)
    },
    setCollectItem(id) {
      this.$emit("set-collect-item", id)
    }
  }
}
</script>

