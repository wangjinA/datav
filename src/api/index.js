import { install } from '@/myAxios'
import Vue from 'vue'
const axios = new (install(() => { }))
import { Message } from 'view-design'
export const API = {
  upload: formData => axios.$post("/api/upload", formData)
    .then(res => {
      if (res.status) {
        return res
      } else {
        console.log(res);
        Message.error({
          background: true,
          content: res.message
        });
        return Promise.reject()
      }
    }),
  getBgList: () => axios.$get('/api/bgList')
}
Vue.prototype.$API = API