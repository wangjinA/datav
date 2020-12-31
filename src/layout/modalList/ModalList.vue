<template>
  <div>
    <Drawer
      class="DatavAdd-Drawer"
      :closable="false"
      width="90%"
      placement="left"
      v-model="showDatavAdd"
    >
      <div style="padding-top: 6vh;padding-left: 6vw;">
        <DatavAdd />
      </div>
    </Drawer>
    <Drawer
      :closable="false"
      width="40%"
      placement="right"
      :value="editorShow"
      @on-close="editorClose"
    >
      <CodeEditor height="100%" :value="code" :type="codeType" @input="onChange" />
    </Drawer>
  </div>
</template>

<script>
import DatavAdd from "@/views/workspace/datavList/DatavAdd";
import CodeEditor from "@/layout/setup/CodeEditor";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    DatavAdd,
    CodeEditor,
  },
  data() {
    return {
      showDatavAdd: false,
      showCodeEditor: true,
    };
  },
  computed: {
    ...mapState("codeEditor", ["editorShow", "code", "codeType"]),
  },
  methods: {
    ...mapMutations("codeEditor", ["onChange", "editorClose"]),
  },
  created() {
    this.$root.modalList = this;
  },
  destroyed() {
    delete this.$root.modalList;
  },
};
</script>

<style lang="less" scoped>
.DatavAdd-Drawer {
  /deep/ .ivu-drawer-content {
    background-color: var(--background-1);
    color: #fff;
  }
}
</style>
<style lang="less">
.ivu-drawer-content {
  background-color: #f6f6f6;
}
</style>
