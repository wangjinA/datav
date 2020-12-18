<!--
 * @Author: 汪锦
 * @Date: 2020-12-16 16:51:20
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-17 15:59:46
 * @Description: 背景列表
-->
<template>
  <div>
    <Operation @add="showAdd = true" />
    <Tabs v-model="tabIndex">
      <TabPane label="图片列表" name="0"></TabPane>
      <TabPane label="视频列表" name="1"></TabPane>
    </Tabs>
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="img-box" @click="preview(item)">
          <img
            loading="lazy"
            v-if="tabIndex == 0"
            :src="$getUrl(item.src)"
            :alt="item.name"
            :title="item.name"
          />
          <video
            v-else
            :src="$getUrl(item.src)"
            :alt="item.name"
            :title="item.name"
            preload="meta"
          ></video>
        </div>
        <div class="info-box">
          <div class="item-name-box">
            <div
              class="item-name text-overflow"
              v-if="!item.editName"
              @click="editName(item)"
              :title="item.name"
            >
              <Icon type="md-create" class="md-create" />
              {{ item.name }}
            </div>
            <Input
              v-if="item.editName"
              class="edit-name"
              ref="edit-name"
              size="small"
              v-model="nameValue"
              :placeholder="`请输入${item.type ? '视频' : '图片'}名称`"
              @on-blur="setName(item)"
              @on-enter="setName(item)"
            />
          </div>
          <span class="preview-btn" @click="del(item)">删除</span>
          <span class="preview-btn" @click="preview(item)">预览</span>
        </div>
      </li>
    </ul>
    <Modal loading v-model="showAdd" title="新建背景" @on-ok="commit">
      <Bg-add ref="bgAdd"></Bg-add>
    </Modal>
  </div>
</template>

<script>
import BgAdd from "./BgAdd";
import Operation from "./Operation";
export default {
  name: "BgList",
  components: {
    BgAdd,
    Operation,
  },
  data() {
    return {
      imageList: [],
      videoList: [],
      nameValue: "",
      showAdd: false,
      tabIndex: "0",
    };
  },
  methods: {
    editName(item) {
      this.$set(item, "editName", true);
      this.$nextTick(() => {
        this.$refs["edit-name"][0].focus();
      });
      this.nameValue = item.name;
    },
    setName(item) {
      this.$set(item, "editName", false);
      if (item.name === this.nameValue || !this.nameValue) {
        return;
      }
      this.$put(
        `/api/bgList/${item.id}`,
        {
          id: item.id,
          name: this.nameValue,
        },
        true
      ).finally(() => this.getList());
      this.nameValue = "";
    },
    preview(item) {
      window.open(this.$getUrl(item.src));
    },
    getList() {
      this.$get("/api/bgList").then((res) => {
        this.imageList = res.data.filter((item) => item.type == 0);
        this.videoList = res.data.filter((item) => item.type == 1);
      });
    },
    // 创建
    commit() {
      this.$refs.bgAdd.commit().finally(() => {
        this.showAdd = false;
        this.getList();
      });
    },
    // 删除
    del(item) {
      this.$delAPI().then(() => {
        this.$del("/api/bgList/" + item.id, {}, true).then(() => {
          this.getList();
        });
      });
    },
  },
  computed: {
    list() {
      return this.tabIndex == 0 ? this.imageList : this.videoList;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
    }
    > .img-box {
      background-color: #181b24;
      width: 100%;
      height: 0;
      padding-top: 58%;
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
</style>
