<template>
  <div class="workspace">
    <D-header></D-header>
    <Datav-list v-if="$store.state.currentTitleName === '数据大屏'"></Datav-list>
    <Bg-list v-if="$store.state.currentTitleName === '背景管理'"></Bg-list>
  </div>
</template>

<script>
import DHeader from "@/layout/header";
import DatavList from "./datavList/DatavList";
import BgList from "./BgList";
export default {
  name: "Workspace",
  components: {
    DHeader,
    DatavList,
    BgList,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.workspace {
  background-color: #f5f9fc;
  height: 100vh;
  padding-top: 68px;
  padding-right: 30px;
  padding-left: 200px;
}
</style>
