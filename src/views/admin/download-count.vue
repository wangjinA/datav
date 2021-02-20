<!--
 * @Author: 汪锦
 * @Date: 2021-01-15 15:00:00
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-19 14:35:20
 * @Description: 组件下载统计
-->
<template>
  <div class="download-count">
    <Hy-table
      :columns="columns"
      :data="list"
      :current.sync="offset"
      :pageSize="limit"
      :total="total"
    >
      <template #stack="{row}">
        <Poptip class="Poptip" placement="left" width="800" transfer>
          <div class="text-overflow stack-flow">{{ row.stack }}</div>
          <div class="stack" slot="content">
            {{ row.stack }}
          </div>
        </Poptip>
      </template>
    </Hy-table>
    <Echart-template :options="echartOption" height="300px" width="400px"></Echart-template>
  </div>
</template>

<script>
import HyTable from "@/layout/hy-table";
import { getEchartOption } from "./download-count.js";
import EchartTemplate from "@/components/echartTemplate";
export default {
  components: {
    HyTable,
    EchartTemplate,
  },
  data() {
    return {
      columns: [
        {
          title: "组件名称",
          key: "component_name",
        },
        {
          title: "下载次数",
          key: "count",
        },
      ],
      list: [],
      offset: 1,
      limit: 10,
      total: 0,
      echartOption: "",
    };
  },
  methods: {
    f5() {
      this.getEchartOption();
      return this.$get("/api/downloadCount", {
        type: "name",
      }).then((res) => {
        this.list = res.data;
      });
    },
    getEchartOption() {
      return this.$get("/api/downloadCount", {
        type: "day",
      }).then((res) => {
        this.echartOption = getEchartOption(res.data);
      });
    },
  },
  created() {
    this.f5();
  },
};
</script>

<style lang="less" scoped></style>
