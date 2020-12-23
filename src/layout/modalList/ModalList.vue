<template>
  <div>
    <Drawer :closable="false" width="90%" placement="left" v-model="showDatavAdd">
      <div style="padding-top: 6vh;padding-left: 6vw;">
        <DatavAdd />
      </div>
    </Drawer>
  </div>
</template>

<script>
import DatavAdd from "@/views/workspace/datavList/DatavAdd";
export default {
  components: {
    DatavAdd,
  },
  data() {
    return {
      showDatavAdd: false,
    };
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
/deep/ .ivu-drawer-content {
  background-color: var(--background-1);
  color: #fff;
}
</style>
