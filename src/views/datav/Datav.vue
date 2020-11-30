<template>
  <div id="datav">
    <!-- <Datav-header style="position: absolute; z-index: 99;" /> -->
    <Datav-header :projectName="projectName"/>
    <section>
      <Layer />
      <main>
        <DataCanvas />
      </main>
    </section>
  </div>
</template>

<script>
import DataCanvas from "./DataCanvas.vue";
import DatavHeader from "@/layout/header";
import Layer from "@/layout/layer";
import { mapMutations } from "vuex";
import { parse } from "@/lib/utils";

export default {
  name: "App",
  components: {
    DataCanvas,
    Layer,
    DatavHeader,
  },
  data() {
    return {
      id: this.$route.params.id,
      projectName: ''
    };
  },
  methods: {
    ...mapMutations(["initLayer"]),
  },
  created() {
    this.$get(`/api/api/datav/${this.id}`).then((res) => {
      this.initLayer(parse(res.data[0].option));
      this.projectName = res.data[0].name
    });
  },
};
</script>

<style lang="less" scoped>
#datav {
  main {
    flex: 1;
  }
  section {
    display: flex;
    flex: 1;
    > main {
      flex: 1;
    }
  }
}
</style>
