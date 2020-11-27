<template>
  <header>
    <div class="project-name"></div>
    <ul class="component-ul">
      <li v-for="item in comList" :key="item.name">
        <IconBase :icon-name="item.iconName" />
        <p>{{ item.name }}</p>
        <div class="com-list-wrap">
          <ul>
            <li v-for="(com, i) in item.list" :key="i" @click="addHanlde(com)">
              <div class="preview-img-box">
                <img :src="com.previewImage" />
              </div>
              <p>{{ com.name }}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
import IconBase from "@/layout/icons/IconBase";
import { echart, text } from "@/config/componentConfig";
import { deepClone } from "@/lib/utils";
import { mapMutations } from "vuex";
export default {
  components: {
    IconBase,
  },
  data() {
    return {
      comList: [
        {
          name: "图表",
          iconName: "zzt",
          list: echart,
        },
        {
          name: "文字",
          iconName: "wenzi",
          list: text,
        },
        {
          name: "常规",
          iconName: "zzt",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["addLayer"]),
    addHanlde(com) {
      const cloneCom = deepClone(com);
      cloneCom.active = true;
      this.addLayer(cloneCom);
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
  transition: all linear 500ms;
  flex-shrink: 0;
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
        > ul {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          justify-content: space-between;
          padding: 0 10px;
          > li {
            .preview-img-box {
              width: 100px;
              height: 60px;
              border: 1px solid transparent;
              &:hover {
                border: 1px solid #2491f7;
              }
              img {
                height: 100%;
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
