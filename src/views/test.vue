<template>
  <div id="test">
    <Loading />
    <img width="200" src="@/assets/lizi.png" alt="" />
    <div>测试柜</div>
    <small>
      测试柜
      <small>测试柜</small>
    </small>
    <Line-module></Line-module>
    <transition name="test" appear>
      <ModuleTitle :key="k" title="模块标题文案"></ModuleTitle>
    </transition>
    <!-- 测试scrollTable的BUG是不是因为key引起的 自己写个动画修改key模拟一下 -->
    <input type="text" v-model="k" />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="637.5px"
      height="521.5px"
    >
      <path
        fill-rule="evenodd"
        stroke="rgb(6, 127, 255)"
        stroke-width="1px"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        fill="none"
        d="M32.023"
        style="transition: 3s;"
      />
    </svg>
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";
import ModuleTitle from "@/components/moduleTitle";
export default {
  components: {
    Loading,
    LineModule,
    ModuleTitle,
  },
  data() {
    return {
      k: 1,
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
};
</script>

<style lang="less" scoped>
#test {
  background-color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.test-enter {
  transform: scale(0);
}
.test-enter {
  transform: scale(1);
}
.test-enter-active {
  transform: scale(1);
}
</style>
