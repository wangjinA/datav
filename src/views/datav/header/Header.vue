<template>
  <header>
    <div class="project-name">
      {{ datavInfo && datavInfo.name }}
    </div>
    <ul class="component-ul">
      <li v-for="item in comList" :key="item.name">
        <IconBase :scale="item.iconScale" :icon-name="item.iconName" />
        <p>{{ item.name }}</p>
        <div class="com-list-wrap">
          <ul>
            <li
              v-for="(com, i) in item.list"
              :key="i"
              @click="addHanlde(com)"
              :class="{ disable: com.disable }"
            >
              <div class="preview-img-box">
                <img :src="com.previewImage" />
              </div>
              <p>{{ com.name }}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <ul class="right-handler">
      <li @click="generator">生成Vue文件</li>
      <li @click="lookjson">查看json配置</li>
      <li @click="screenshot">生成预览图</li>
      <li @click="goToPreview">预览</li>
    </ul>
    <div></div>
  </header>
</template>

<script>
import IconBase from "@/layout/icons/IconBase";
import { menuConfig } from "@/config/componentConfig";
import { deepClone } from "@/lib/utils";
import { mapMutations, mapState } from "vuex";
import generator from "@/lib/generator";
export default {
  components: {
    IconBase,
  },
  data() {
    return {
      comList: menuConfig,
    };
  },
  computed: {
    ...mapState("layer", ["datavInfo", "resourceLayers"]),
  },
  methods: {
    ...mapMutations("layer", ["addLayer"]),
    generator() {
      this.$store.commit("codeEditor/editorOpen", {
        code: generator(),
        codeType: "javascript",
        isBeautifier: false,
        callback(code) {
          console.log(code);
        },
      });
    },

    lookjson() {
      this.$store.commit("codeEditor/editorOpen", {
        code: this.resourceLayers,
        codeType: "json",
        callback(code) {
          console.log(code);
        },
      });
    },
    addHanlde(com) {
      console.log(com);
      if (com.disable) {
        return;
      }
      const cloneCom = deepClone(com);
      cloneCom.active = true;
      this.addLayer(cloneCom);
    },
    // 截图
    screenshot() {
      this.$bus.$emit("screenshot");
    },
    // 预览
    goToPreview() {
      window.open(
        this.$router.resolve({
          name: "preview",
          params: {
            id: this.$route.params.id,
          },
        }).href
      );
    },
  },
};
</script>

<style lang="less" scoped>
.project-name {
  width: 150px;
}
header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: #fff;
  background: var(--background);
  transition: all linear 0.3s;
  flex-shrink: 0;
  z-index: 10;
  .component-ul {
    display: flex;
    > li {
      width: 60px;
      height: 60px;
      text-align: center;
      font-size: 12px;
      position: relative;
      &:hover {
        cursor: pointer;
        background: var(--background-hover);
        .com-list-wrap {
          transition-delay: 0s;
          transform: scaleY(1);
          opacity: 1;
        }
      }
      .com-list-wrap {
        cursor: auto;
        position: absolute;
        left: 0;
        top: 100%;
        width: 352px;
        max-height: 376px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 16px 10px 5px;
        color: #999;
        background: var(--background-hover);
        z-index: 99;
        transform-origin: top;
        transition: 0.3s;
        transform: scaleY(0);
        opacity: 0;
        transition-delay: 0.2s;
        box-shadow: 6px 5px 10px 0px #131617;
        > ul {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          justify-content: space-between;
          padding: 0 10px;
          > li {
            cursor: pointer;
            &:hover {
              color: var(--primary-color);
            }
            .preview-img-box {
              width: 100px;
              height: 60px;
              border: 1px solid transparent;
              &:hover {
                border: 1px solid var(--primary-color);
              }
              img {
                height: 100%;
                width: 100%;
              }
            }
            &.disable {
              &:hover {
                cursor: no-drop;
              }
            }
          }
        }
      }
    }
  }
  .right-handler {
    margin-left: auto;
    margin-right: 40px;
    display: flex;
    > li {
      padding: 0 20px;
      &:hover {
        cursor: pointer;
        color: var(--primary-color);
      }
    }
  }
}
</style>
