<template>
  <div id="app">
    <router-view></router-view>
    <Modal-list></Modal-list>
  </div>
</template>

<script>
import "@/api";
import ModalList from "@/layout/modalList";
export default {
  name: "App",
  components: {
    ModalList,
  },
  created() {
    let userInfo = sessionStorage.getItem("userInfo");
    userInfo && (userInfo = JSON.parse(userInfo));
    this.$store.commit("login/setUserInfo", userInfo);
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: MicrosoftYaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
