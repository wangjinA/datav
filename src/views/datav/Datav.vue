<template>
  <div id="datav">
    <!-- <Datav-header style="position: absolute; z-index: 99;" /> -->
    <Datav-header />
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
export default {
  name: "App",
  components: {
    DataCanvas,
    Layer,
    DatavHeader,
  },
  methods: {
    ...mapMutations(["initLayer"]),
  },
  created() {
    this.$get("/api/datav/1").then((res) => {
      this.initLayer(JSON.parse(res.data[0].option));
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
