import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
Vue.use(VueAxios, axios)

axios.defaults.baseURL = `https://www.googleapis.com/youtube/v3`

axios.defaults.withCredentials = true

const apiKey = "AIzaSyBZDrjSjwQeuYmRj3UKSYIE0ugNmIJds2g"
/*
const channelListRequest = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3/channels`,
  params: {
    id: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    part: "snippet,contentDetails",
    key: apiKey
  }
})

const videoListRequest = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3/videos?`,
  params: {
    id: "A9cge3T2Fkg",
    part: "snippet,contentDetails",
    key: apiKey
  }
})

export const apiGetChannelList = () => channelListRequest.get()
export const apiGetVideosList = () => videoListRequest.get()
*/
