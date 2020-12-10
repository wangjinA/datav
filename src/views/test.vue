<template>
  <div>
    <Loading />
    <img width="200" src="@/assets/lizi.png" alt="" />
    <div>测试柜</div>
    <small>
      测试柜
      <small>测试柜</small>
    </small>
    <Line-module></Line-module>
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";
import LineModule from "@/components/lineModule";
export default {
  components: {
    Loading,
    LineModule
  },
};
</script>
