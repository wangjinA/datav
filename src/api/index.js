import { install } from '@/myAxios'
import Vue from 'vue'
import { Message } from 'view-design'
import { stringify } from "@/lib/utils";

const axios = new (install(() => { }))
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
  getBgList: () => axios.$get('/api/bgList'),

  updateLayers: (layers, id) => axios.$put(`/api/datav/${id}`, {
    option: stringify(layers),
  }),
  updateDatav: (datavInfo, id) => axios.$put(`/api/datav/${id}`, datavInfo)
  // .then((res) => {
  //   if (res.data !== "暂无更改") {
  //     this.addHistory(resourceLayers);
  //   }
  // })
}

Vue.prototype.$API = API