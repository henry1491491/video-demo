import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channelsListId: "",
    channelsListThumbnails: {},
    channelUrl: "",
    collectList: [],
    nextPageToken: "",
    playListItemsId: "",
    videosData: []
  },
  mutations: {
    GET_COLLECT_TITLE_LIST(state) {
      state.collectList = JSON.parse(localStorage.getItem("collectItem")) || []
    },
    SET_CHANNEL_LIST_THUMBNAILS(state, thumbnails) {
      state.channelsListThumbnails = thumbnails
    },
    SET_CHANNEL_URL(state, url) {
      state.channelUrl = url
    },
    SET_CHANNELS_LIST_ID(state, id) {
      state.channelsListId = id
    },
    SET_COLLECT_ITEM(state, id) {
      const setTitleToStorage = () => {
        localStorage.setItem("collectItem", JSON.stringify(state.collectList))
        this.commit("GET_COLLECT_TITLE_LIST")
      }
      const isCollected = el => el === id
      if (
        state.collectList.length === 0 ||
        state.collectList.some(isCollected) === false
      ) {
        state.collectList.push(id)
        setTitleToStorage()
      } else {
        let collectIndex = state.collectList.findIndex(isCollected)
        state.collectList.splice(collectIndex, 1)
        setTitleToStorage()
      }
    },
    SET_NEXT_PAGE_TOKEN(state, token) {
      state.nextPageToken = token
    },
    SET_PLAY_LIST_ITEMS_ID(state, ids) {
      state.playListItemsId = ids
    },
    SET_VIDEOS_DATA(state, data) {
      state.videosData = data
    },
    UPDATE_VIDEOS_DATA(state, data) {
      window.sessionStorage.setItem("videosData", JSON.stringify(data))
      state.videosData =
        JSON.parse(window.sessionStorage.getItem("videosData")) || []
    }
  },
  actions: {
    async initialData({ state, dispatch }) {
      let channelListId = await dispatch("getChannelsListId")
      let playlistItemsIds = await dispatch("getPlaylistItemsIds", {
        id: channelListId,
        nextToken: undefined
      })
      dispatch("getVideosData", playlistItemsIds)
      let playlistItemsIdsNext = await dispatch("getPlaylistItemsIds", {
        id: state.channelsListId,
        nextToken: state.nextPageToken
      })
      dispatch("getVideosData", playlistItemsIdsNext)
    },
    async getChannelsListId({ state, commit }) {
      let res
      if (!state.channelUrl) {
        res = await axios.get(
          `channels?id=UCCKlp1JI9Yg3-cUjKPdD3mw&part=snippet%2CcontentDetails&key=AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g`
        )
      } else {
        res = await axios.get(
          `channels?id=${state.channelUrl}&part=snippet%2CcontentDetails&key=AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g`
        )
      }
      if (res.status !== 200) return
      // 取 Channel 圖片
      commit(
        "SET_CHANNEL_LIST_THUMBNAILS",
        res.data.items[0].snippet.thumbnails
      )
      // 取 Channel 專屬上傳影片之 id
      commit(
        "SET_CHANNELS_LIST_ID",
        res.data.items[0].contentDetails.relatedPlaylists.uploads
      )
      return state.channelsListId
    },
    async getPlaylistItemsIds({ state, commit }, { id, nextToken }) {
      let itemsNumber = 50
      let api
      if (nextToken === undefined) {
        api = `playlistItems?part=snippet%2CcontentDetails&maxResults=${itemsNumber}&playlistId=${id}&key=AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g`
      } else {
        api = `playlistItems?part=snippet%2CcontentDetails&maxResults=${itemsNumber}&playlistId=${id}&pageToken=${nextToken}&key=AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g`
      }
      let res = await axios.get(api)
      if (res.status !== 200) return
      if (nextToken === undefined) {
        commit("SET_NEXT_PAGE_TOKEN", res.data.nextPageToken)
      }
      commit(
        "SET_PLAY_LIST_ITEMS_ID",
        res.data.items.map(el => el.contentDetails.videoId).toString()
      )
      if (nextToken === undefined) {
        return { id: state.playListItemsId, getToken: false }
      } else {
        return { id: state.playListItemsId, getToken: true }
      }
    },
    async getVideosData({ state, commit }, { id, getToken }) {
      let api = `videos?part=snippet%2CcontentDetails&id=${id}&key=AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g`
      let res = await axios.get(api)
      if (res.status !== 200) return
      if (getToken === false) {
        commit("SET_VIDEOS_DATA", res.data.items)
      } else {
        commit("UPDATE_VIDEOS_DATA", state.videosData.concat(res.data.items))
      }
    }
  },
  modules: {}
})
