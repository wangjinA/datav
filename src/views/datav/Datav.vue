<template>
  <div id="datav">
    <!-- <Datav-header style="position: absolute; z-index: 99;" /> -->
    <Datav-header :projectName="projectName" />
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
import { parse } from "@/lib/utils";
import { stringify } from "@/lib/utils";

export default {
  name: "App",
  components: {
    DataCanvas,
    Layer,
    DatavHeader,
    Setup,
  },
  data() {
    return {
      id: this.$route.params.id,
      projectName: "",
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
            this.$put(`/api/api/datav/${this.id}`, {
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
          this.$put(`/api/api/datav/${this.id}`, {
            id: datavInfo.id,
            name: datavInfo.name,
            preview_img: datavInfo.preview_img,
          });
        }, 200);
      },
    },
  },
  computed: {
    ...mapState(["datavInfo", "resourceLayers"]),
  },
  methods: {
    ...mapMutations(["initLayer", "setDatavInfo"]),
  },
  created() {
    this.$get(`/api/api/datav/${this.id}`).then((res) => {
      this.initLayer(parse(res.data.option));
      this.projectName = res.data.name;
      this.setDatavInfo(res.data);
    });
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
