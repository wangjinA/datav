<!--
 * @Author: 汪锦
 * @Date: 2020-12-23 11:54:48
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-23 14:12:36
 * @Description: 添加项目
-->

<template>
  <div class="datavAdd">
    <div>模板列表</div>
    <List :type="1" />
  </div>
</template>

<script>
import List from "./List";
export default {
  name: "DatavAdd",
  components: {
    List,
  },
};
</script>

<style></style>
