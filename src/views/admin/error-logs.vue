<!--
 * @Author: 汪锦
 * @Date: 2021-01-15 15:00:00
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-18 13:50:28
 * @Description: 错误管理
-->
<template>
  <div>
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
  </div>
</template>

<script>
import HyTable from "@/layout/hy-table";
export default {
  components: {
    HyTable,
  },
  data() {
    return {
      columns: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "错误名称",
          key: "name",
        },
        {
          title: "错误信息",
          key: "content",
        },
        {
          title: "错误堆栈",
          slot: "stack",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
      ],
      list: [],
      offset: 1,
      limit: 10,
      total: 0,
    };
  },
  methods: {
    f5() {
      return this.$get("/api/errorLogs", {
        offset: this.offset,
        limit: this.limit,
      }).then((res) => {
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.f5();
  },
};
</script>

<style lang="less" scoped>
.Poptip {
  width: 100%;
  /deep/ .ivu-poptip-rel {
    width: 100%;
  }
}
.stack-flow {
  &:hover {
    cursor: pointer;
    color: var(--primary-color);
  }
}
.stack {
  white-space: pre;
}
</style>
