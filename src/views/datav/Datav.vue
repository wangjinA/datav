<template>
  <div id="datav" class="datav-style">
    <!-- <Datav-header style="position: absolute; z-index: 99;" /> -->
    <Datav-header />
    <section>
      <Layer />
      <main>
        <DatavCanvas />
      </main>
      <Setup @click.prevent.stop />
    </section>
  </div>
</template>

<script>
import DatavCanvas from "./DatavCanvas.vue";
import DatavHeader from "./header";
import Layer from "@/layout/layer";
import Setup from "@/layout/setup";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Datav",
  components: {
    DatavCanvas,
    Layer,
    DatavHeader,
    Setup,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["datavInfo", "resourceLayers"]),
  },
  methods: {
    ...mapMutations(["setDatavInfo", "clearLayer", "initLayer"]),
    ...mapMutations("backoff", ["addHistory", "revoke", "reduction"]), // [['addHistory', 'revoke', 'reduction']] 来自 -> backoff模块
    // 监听撤销和还原
    watchKey(e) {
      if (e.keyCode == 26 && e.ctrlKey) {
        console.log("撤销Ctrl+z");
        this.revoke();
      }
      if (e.keyCode == 25 && e.ctrlKey) {
        console.log("还原：Ctrl+y");
        this.reduction();
      }
    },
  },
  created() {
    window.addEventListener("keypress", this.watchKey);
  },
  destroyed() {
    this.clearLayer();
    window.removeEventListener("keypress", this.watchKey);
  },
};
</script>

<style lang="less" scoped>
#datav {
  main {
    flex: 1;
    overflow: hidden;
  }
  section {
    display: flex;
    flex: 1;
    > main {
      flex: 1;
      height: calc(100vh - 60px);
    }
  }
}
</style>
