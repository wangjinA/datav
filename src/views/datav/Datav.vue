<template>
  <div id="datav">
    <!-- <Datav-header style="position: absolute; z-index: 99;" /> -->
    <Datav-header />
    <section>
      <Layer />
      <main>
        <DataCanvas />
      </main>
      <Setup @click.prevent.stop />
    </section>
  </div>
</template>

<script>
import DataCanvas from "./DataCanvas.vue";
import DatavHeader from "@/layout/header";
import Layer from "@/layout/layer";
import Setup from "@/layout/setup";
import { mapMutations, mapState } from "vuex";
import { stringify } from "@/lib/utils";

export default {
  name: "Datav",
  components: {
    DataCanvas,
    Layer,
    DatavHeader,
    Setup,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  watch: {
    // 监听json改变，上传后端
    resourceLayers: {
      deep: true,
      handler(resourceLayers) {
        if (!this.readonly) {
          clearTimeout(this.watch_resourceLayers_timer);
          this.watch_resourceLayers_timer = setTimeout(() => {
            this.$put(`/api/datav/${this.id}`, {
              option: stringify(resourceLayers),
            });
          }, 200);
        }
      },
    },
    datavInfo: {
      deep: true,
      handler(datavInfo) {
        clearTimeout(this.watch_datavInfo_timer);
        this.watch_datavInfo_timer = setTimeout(() => {
          this.$put(`/api/datav/${this.id}`, {
            id: datavInfo.id,
            name: datavInfo.name,
            preview_img: datavInfo.preview_img,
            style: JSON.stringify(datavInfo.style),
          }).then(() => {});
        }, 201);
      },
    },
  },
  computed: {
    ...mapState(["datavInfo", "resourceLayers"]),
  },
  methods: {
    ...mapMutations(["setDatavInfo", "clearLayer"]),
  },
  created() {},
  destroyed() {
    this.clearLayer();
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
    }
  }
}
</style>
