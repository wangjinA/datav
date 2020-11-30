<!--
 * @Author: 汪锦
 * @Date: 2020-11-30 09:55:57
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-11-30 10:11:39
 * @Description: 预览
-->
<template>
  <DataCanvas readonly />
</template>

<script>
import DataCanvas from "@/views/datav/DataCanvas";
import { mapMutations } from "vuex";
import { parse } from "@/lib/utils";
export default {
  name: "Preview",
  components: {
    DataCanvas,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations(["initLayer"]),
  },
  created() {
    this.$get(`/api/api/datav/${this.id}`).then((res) => {
      this.initLayer(parse(res.data[0].option));
    });
  },
};
</script>

<style></style>
