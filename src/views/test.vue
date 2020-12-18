<template>
  <div id="test">
    <div style="position: relation;z-index:1;">
      <Loading />
      <img width="200" src="@/assets/lizi.png" />
      <div>测试柜</div>
      <small>
        测试柜
        <small>测试柜</small>
      </small>
      <Line-module></Line-module>
      <transition name="test" appear>
        <ModuleTitle :key="k" title="模块标题文案"></ModuleTitle>
      </transition>
    </div>
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
