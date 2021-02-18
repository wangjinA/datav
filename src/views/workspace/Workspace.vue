<template>
  <div class="workspace">
    <D-header></D-header>
    <Datav-list class="workspace-content" v-if="currentWorkSpace.id === 0"></Datav-list>
    <Bg-list class="workspace-content" v-if="currentWorkSpace.id === 1"></Bg-list>
    <Com-list class="workspace-content tabsScroll" v-if="currentWorkSpace.id === 2"></Com-list>
  </div>
</template>

<script>
import DHeader from "@/layout/header";
import DatavList from "./datavList/DatavList";
import ComList from "./ComList";
import BgList from "./BgList";
export default {
  name: "Workspace",
  components: {
    DHeader,
    DatavList,
    BgList,
    ComList,
  },
  data() {
    return {};
  },
  computed: {
    currentWorkSpace() {
      return this.$store.state.currentWorkSpace;
    },
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
  overflow: auto;
  .workspace-content {
    // height: 100%;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>

<style lang="less">
.tabsScroll {
  .ivu-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    // overflow-y: auto;
    // .ivu-tabs-content {
    //   flex: 1;
    //   .ivu-tabs-tabpane {
    //     height: 100%;
    //     overflow: hidden;
    //   }
    // }
  }
}
</style>
