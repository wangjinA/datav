<template>
  <div class="workspace">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div
          class="img-box"
          :style="`background-image:url(/api/public/${item.preview_img})`"
          @click="toDetail(item)"
        ></div>
        <div class="info-box">
          <div class="item-name-box">
            <div class="item-name" v-if="!item.editName" @click="editName(item)">
              <Icon type="md-create" class="md-create" />
              {{ item.name }}
            </div>
            <Input
              v-if="item.editName"
              class="edit-name"
              ref="edit-name"
              size="small"
              v-model="nameValue"
              placeholder="项目名称"
              @on-blur="setName(item)"
              @on-enter="setName(item)"
            />
          </div>
          <span class="preview-btn" @click="preview">预览</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Workspace",
  data() {
    return {
      list: [],
      nameValue: "",
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
        `/api/api/datav/${item.id}`,
        {
          id: item.id,
          name: this.nameValue,
        },
        true
      ).finally(() => this.getList());
      this.nameValue = "";
    },
    toDetail(item) {
      this.$router.push({
        name: "datav",
        params: {
          id: item.id,
        },
      });
    },
    preview() {
      window.open(this.$router.resolve("/preview").href);
    },
    getList() {
      this.$get("/api/api/datav").then((res) => {
        this.list = res.data;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.workspace {
  background-color: #f5f9fc;
  height: 100vh;
  padding-top: 68px;
  padding-left: 200px;
}
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 24px;
  margin-left: 24px;
  margin-right: 24px;
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
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
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
