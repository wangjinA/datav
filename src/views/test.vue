<template>
  <div id="test">
    <dv-active-ring-chart
      :data="[
        {
          name: '周口',
          value: 55,
        },
        {
          name: '南阳',
          value: 120,
        },
        {
          name: '西峡',
          value: 78,
        },
        {
          name: '驻马店',
          value: 66,
        },
        {
          name: '新乡',
          value: 80,
        },
      ]"
      style="width:300px;height:300px"
    />
    <div style="position: relation;z-index:1;">
      <Loading />
      <span>测试</span>
      <big>测试1</big>
      <small>测试2</small>
      <!-- <Line-module></Line-module> -->
      <div class="1123" :is="test">123</div>
    </div>
    <div class="niao">我是一只笑笑笑笑鸟</div>
    <!-- <WaterPolo /> -->
    <!-- <div class="border-s"></div> -->
    <!-- <div id="border-iamge"></div> -->
    <ParticleAnimate />
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";
import WaterPolo from "@/components/WaterPolo";
import ParticleAnimate from "@/components/ParticleAnimate.vue";
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
    WaterPolo,
    ParticleAnimate,
  },
  data() {
    return {
      test: "Line-module",
      k: 1,
      code: "",
    };
  },
  methods: {
    upload() {
      let file = document.querySelector("#f").files[0];
      let formData = new FormData();
      formData.append("file", file);
      this.$post("/api/qiniu/upload", formData);
    },
    onMounted(editor) {
      /* eslint-disable */
      this.editor = editor;
      console.log(this.editor);
    },
    onCodeChange(editor) {
      console.log(this.editor.getValue());
    },
    jjlayer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // 原先代码
      }, 1000);
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
#border-iamge {
  width: 200px;
  height: 200px;
  border: 20px solid;
  border-image: url("~@/assets/logo.png");
  border-image-width: 20px;
  background-color: #fff;
  border-image-slice: 32;
}
.border-s {
  --size: 30px;
  --gap: 5px;
  border: 1px solid #ccc;
  width: 200px;
  height: 100px;
  position: relative;
  margin-left: 100px;
  &:hover {
    &::after,
    &::before {
      width: calc(100% + var(--gap) * 2);
      height: calc(100% + var(--gap) * 2);
    }
  }
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: var(--size);
    height: var(--size);
    transition: 0.3s;
  }
  &::before {
    left: calc(var(--gap) * -1);
    top: calc(var(--gap) * -1);
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  &::after {
    right: calc(var(--gap) * -1);
    bottom: calc(var(--gap) * -1);
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
#test {
  background-color: #000;
  height: 100vh;
  width: 100vw;
  color: #fff;
  overflow: auto;
}
.niao {
  width: 200px;
  margin: 20px;
  background-color: #0990c5;
  animation: niao 3s;
  @keyframes niao {
    0% {
      clip-path: polygon(0 0, 15% 0, 0% 100%, 0 100%);
    }
    100% {
      clip-path: polygon(0 0, 115% 100%, 0 100%, 0% 100%);
    }
  }
}
</style>
