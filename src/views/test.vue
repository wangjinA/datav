<template>
  <div id="test">
    <div style="position: relation;z-index:1;">
      <Loading />
      <img width="200" src="@/assets/lizi.png" />
      <div>测试</div>
      <big>测试1</big>
      <small>测试2</small>
      <!-- <Line-module></Line-module> -->
      <div class="1123" :is="test">123</div>
    </div>
    <input type="file" accept="image/*" id="f" />
    <button @click="upload">上传</button>
    <draggable tag="h1" v-model="list">
      <transition-group>
        <div v-for="item in list" :key="item.name">
          {{ item.name }}
        </div>
      </transition-group>
    </draggable>
    <input type="text" v-model="test" />
    <button>按钮</button>

    <component
      :is="{
        render(h) {
          return h('h1', {}, test);
        },
      }"
    />
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";

// import * as qiniu from "qiniu-js";
import draggable from "vuedraggable";
const hhh = {
  template: "<h1>666</h1>",
};
import Vue from "vue";
export default {
  components: {
    Loading,
    LineModule,
    draggable,
  },
  data() {
    return {
      test: "Line-module",
      k: 1,
      code: "",
      list: [
        {
          name: "人口流入",
          value: 200,
        },
        {
          name: "人口流出",
          value: 200,
        },
        {
          name: "人口总数",
          value: 200,
        },
      ],
    };
  },
  methods: {
    upload() {
      let file = document.querySelector("#f").files[0];
      let formData = new FormData();
      formData.append("file", file);
      this.$post("/api/qiniu/upload", formData);

      // let file = document.querySelector("#f").files[0];
      // let key = "wj-qiniu/" + file.name;
      // let token =
      //   "Us3NNIqxq4UI6w6qkm4c9pQY6b78p2R8sI28ZrvB:_D4H-OeWYA4Wq1yc7Wrh50sU9d0=:eyJzY29wZSI6IndqLWRhdGF2IiwiZGVhZGxpbmUiOjE2MDk4MzU3MDR9";
      // let putExtra = {};
      // let config = {};
      // const observable = qiniu.upload(file, key, token, putExtra, config);
      // const subscription = observable.subscribe({
      //   next: (...args) => {
      //     console.log(args);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      //   complete: (...args) => {
      //     console.log(args);
      //   },
      // });
      // subscription;
      // subscription.unsubscribe() // 取消上传
    },
    onMounted(editor) {
      /* eslint-disable */
      this.editor = editor;
      console.log(this.editor);
    },
    onCodeChange(editor) {
      console.log(this.editor.getValue());
    },
    debounceClick() {
      console.log("只触发一次");
    },

    jjlayer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // 原先代码
      }, 1000);
    },
  },
  directives: {
    debounce: {
      inserted(el, binding) {
        let timer;
        el.addEventListener("click", () => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            binding.value();
          }, 1000);
        });
      },
    },
  },
  created() {
    Vue;
    hhh;
    console.log(require);
  },
};
</script>

<style lang="less" scoped>
#test {
  background-color: #000;
  height: 100vh;
  width: 100vw;
  color: #fff;
}

.test-leave-to,
.test-enter {
  transform: scale(0);
}
.test-leave,
.test-enter-to {
  transform: scale(1);
}
.test-leave-active,
.test-enter-active {
  transition: 0.3s;
}
.test-move {
  position: absolute;
}
</style>
