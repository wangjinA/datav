<!--
 * @Author: 汪锦
 * @Date: 2020-12-16 16:51:20
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-23 14:15:09
 * @Description: 数据大屏列表
-->
<template>
  <div class="datavList">
    <Operation @add="$root.modalList.showDatavAdd = true" />
    <List></List>
  </div>
</template>

<script>
import Operation from "../Operation";
import List from "./List";
export default {
  name: "DatavList",
  components: { Operation, List },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.datavList {
}
</style>
