<!--
 * @Author: 汪锦
 * @Date: 2021-01-15 15:00:13
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-18 13:56:39
 * @Description: 入口
-->
<template>
  <div class="admin-main">
    <Layout>
      <Header>
        <div class="layout-logo">DATAV后台管理</div>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              hi~
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu
            @on-select="menuSelect"
            :active-name="$route.name"
            theme="dark"
            width="auto"
            :open-names="['1']"
          >
            <MenuItem :name="item.name" v-for="item in adminMenu" :key="item.name">{{
              item.meta.menuName
            }}</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '24px' }">
          <Breadcrumb :style="{ marginBottom: '24px' }">
            <BreadcrumbItem>{{ $route.meta.menuName }}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { adminMenu } from "@/router";
export default {
  name: "adminMain",
  data() {
    return {
      adminMenu,
    };
  },
  methods: {
    menuSelect(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="less" scoped>
.admin-main {
  height: 100%;
  /deep/ .ivu-layout {
    height: 100%;
  }
}
.ivu-layout-header {
  display: flex;
  justify-content: space-between;
}
.layout-logo {
  color: #fff;
}
.layout-nav {
  width: fit-content;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
