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
    <div>
      <BlockList :list="list"></BlockList>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";
import BlockList from "@/components/blockList";
export default {
  components: {
    Loading,
    LineModule,
    BlockList,
  },
  data() {
    return {
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
</style>
