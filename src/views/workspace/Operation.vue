<template>
  <div class="operations">
    <i-input v-model="searchText" style="width: 250px;" placeholder="请输入名称搜索">
      <Button slot="append" icon="ios-search"></Button>
    </i-input>
    <div class="button-list" v-if="$listeners.add">
      <Button type="primary" @click="$emit('add')">新建</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Operations",
  data() {
    return {
      searchText: "",
    };
  },
};
</script>

<style lang="less" scoped>
.operations {
  height: 50px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  .button-list {
    margin-left: 50px;
  }
}
</style>
