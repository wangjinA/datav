<!--
 * @Author: 汪锦
 * @Date: 2021-02-18 09:51:51
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-02-18 15:46:34
 * @Description: 组件管理
-->
<template>
  <div class="ComList">
    <Operation />

    <Tabs v-model="tabIndex">
      <TabPane
        v-for="menuItem in menuConfig"
        :label="menuItem.name"
        :name="menuItem.name"
        :key="menuItem.name"
      >
        <ul>
          <template v-for="item in menuItem.list">
            <li :key="item.id" @click="jump(item)" v-if="!item.previewHide">
              <div class="img-box">
                <img loading="lazy" :src="item.previewImage" :alt="item.name" :title="item.name" />
              </div>
              <div class="info-box">
                <div class="item-name-box">
                  <div class="item-name text-overflow" :title="item.name">
                    <Icon type="md-create" class="md-create" />
                    {{ item.name }}
                  </div>
                </div>
                <span class="preview-btn download-com" @click.stop="downloadCom(item)">下载</span>
              </div>
            </li>
          </template>
        </ul>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import componentConfig, { menuConfig } from "@/config/componentConfig";
import Operation from "./Operation";
export default {
  name: "ComList",
  components: {
    Operation,
  },
  data() {
    return {
      tabIndex: 0,
      TabList: [
        {
          name: "",
        },
      ],
      menuConfig: [
        {
          name: "全部",
          list: componentConfig,
        },
        ...menuConfig,
      ],
    };
  },
  methods: {
    downloadCom(item) {
      this.$store.dispatch("downloadCom", item.componentName);
    },
    jump(item) {
      window.open(this.$router.resolve("previewComponent/" + item.id).href);
    },
  },
};
</script>

<style lang="less" scoped>
.ComList {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 24px;
    padding-bottom: 24px;
    font-size: 12px;
    color: #fff;
    user-select: none;
    position: relative;
    > li {
      position: relative;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 2px 10px 0 rgba(211, 220, 227, 0.7);
      &:hover {
        .img-box {
          cursor: pointer;
        }
        .download-com {
          display: block;
        }
      }
      .download-com {
        display: none;
      }
      > .img-box {
        background-color: #181b24;
        width: 100%;
        height: 0;
        padding-top: 50%;
        position: relative;
        overflow: hidden;
        > video,
        > img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      > .info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        font-size: 14px;
        color: #333;
        height: 43px;
        line-height: 43px;
        .item-name-box {
          flex: 1;
          padding-right: 20px;
          width: 0;
          .item-name {
            .md-create {
              display: none;
            }
          }
          &:hover {
            cursor: pointer;
            color: var(--primary-color);
            .item-name .md-create {
              display: inline;
            }
          }
        }
        .preview-btn {
          padding-left: 12px;
          flex-shrink: 0;
          color: #666;
          &:hover {
            cursor: pointer;
            color: var(--primary-color);
          }
        }
      }
    }
  }
}
</style>
