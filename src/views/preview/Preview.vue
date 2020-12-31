<!--
 * @Author: 汪锦
 * @Date: 2020-11-30 09:55:57
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 17:02:44
 * @Description: 预览
-->
<template>
  <DatavCanvas readonly />
</template>

<script>
import DatavCanvas from "@/views/datav/DatavCanvas";
import { mapMutations } from "vuex";
import { parse } from "@/lib/utils";
export default {
  name: "Preview",
  components: {
    DatavCanvas,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapMutations("layer", ["initLayer"]),
  },
  created() {
    this.$get(`/api/datav/${this.id}`).then((res) => {
      this.initLayer(parse(res.data.option));
    });
  },
};
</script>

<style></style>
