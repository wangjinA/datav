<!--
 * @Author: 汪锦
 * @Date: 2020-12-16 16:51:20
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-24 14:51:56
 * @Description: 数据大屏列表
-->
<template>
  <div class="list-container">
    <ul>
      <li class="add-li" v-if="type === 1" @click="showAdd = true">
        <Icon type="md-add" size="120" />
        <div>创建空白项目</div>
      </li>
      <li v-for="item in list" :key="item.id">
        <div class="img-box" @click="preview(item)">
          <img
            loading="lazy"
            :src="$getUrl(item.preview_img)"
            :alt="item.name"
            :title="item.name"
          />
          <div
            v-if="type === 1"
            class="tips"
            @click.stop="(showUseTemplate = true), (templateId = item.id)"
          >
            使用该模板
          </div>
        </div>
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
          <span class="preview-btn" @click="editDatav(item)">编辑</span>
          <span v-if="type === 1" class="preview-btn" @click="preview(item)">预览</span>
        </div>
      </li>
    </ul>
    <Modal loading v-model="showAdd" title="新建项目" @on-ok="add">
      <Form :model="formItem" :label-width="80">
        <FormItem label="项目名称">
          <i-input v-model="formItem.name" placeholder="项目名称"></i-input>
        </FormItem>
        <FormItem label="屏幕宽度">
          <i-input v-model="formItem.w" placeholder="屏幕宽度">
            <span slot="append">px</span>
          </i-input>
        </FormItem>
        <FormItem label="屏幕高度">
          <i-input v-model="formItem.h" placeholder="屏幕高度">
            <span slot="append">px</span>
          </i-input>
        </FormItem>
      </Form>
    </Modal>
    <Modal loading v-model="showUseTemplate" title="使用模板" @on-ok="useTemplate">
      <Form :model="useTemplateForm" :label-width="80">
        <FormItem label="项目名称">
          <i-input v-model="useTemplateForm.name" placeholder="项目名称"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getInt } from "@/lib/utils";
export default {
  name: "List",
  props: {
    type: {
      // 0 普通 1 模板
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      list: [],
      nameValue: "",
      showAdd: false,
      formItem: {
        name: "数据可视化",
        w: 1920,
        h: 1080,
      },
      // 模板
      showUseTemplate: false,
      useTemplateForm: {
        name: "",
      },
      templateId: "", // 使用的模板id
    };
  },
  watch: {
    showAdd() {
      // 初始化
      this.formItem = this.$options.data().formItem;
    },
    showUseTemplate() {
      // 初始化
      this.useTemplateForm = this.$options.data().useTemplateForm;
    },
  },
  methods: {
    // 编辑项目名称
    editName(item) {
      this.$set(item, "editName", true);
      this.$nextTick(() => {
        this.$refs["edit-name"][0].focus();
      });
      this.nameValue = item.name;
    },
    // 设置项目名称
    setName(item) {
      this.$set(item, "editName", false);
      if (item.name === this.nameValue || !this.nameValue) {
        return;
      }
      this.$put(
        `/api/datav/${item.id}`,
        {
          id: item.id,
          name: this.nameValue,
        },
        true
      ).finally(() => this.getList());
      this.nameValue = "";
    },
    // 编辑
    editDatav({ id }) {
      this.$root.modalList.showDatavAdd = false;
      this.$router.push({
        name: "datav",
        params: {
          id: id,
        },
      });
    },
    // 预览项目
    preview({ id }) {
      window.open(
        this.$router.resolve({
          name: "preview",
          params: {
            id: id,
          },
        }).href
      );
    },
    // 获取列表
    getList() {
      this.$get("/api/datav", {
        type: this.type,
      }).then((res) => {
        this.list = res.data;
      });
    },
    // 添加项目
    add() {
      let message = "";
      if (!this.formItem.name) {
        message = "请填写项目名称";
      } else if (!this.formItem.w) {
        message = "请填写屏幕宽度";
      } else if (!this.formItem.h) {
        message = "请填写屏幕高度";
      }
      if (message) {
        this.showAdd = false;
        return this.$Message.error(message);
      }
      this.$post("/api/datav", {
        style: {
          ...this.formItem,
          w: getInt(this.formItem.w) || 1920,
          h: getInt(this.formItem.h) || 1080,
        },
      })
        .then((res) => {
          if (res.status === 1) {
            this.$Message.success("创建成功");
            this.showAdd = false;
            this.editDatav({ id: res.data.id });
          } else {
            throw "创建失败";
          }
        })
        .catch((e) => {
          console.error(e);
          this.$Message.error("创建失败");
        });
    },
    useTemplate() {
      if (!this.useTemplateForm.name) {
        this.showUseTemplate = false;
        return this.$Message.error("请填写项目名称");
      }
      this.$post("/api/useTemplate", {
        ...this.useTemplateForm,
        id: this.templateId,
      }).then((res) => {
        this.$Message.success("创建成功");
        this.editDatav({ id: res.data.id });
        this.showUseTemplate = false;
      });
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
  margin-top: 10px;
  font-size: 12px;
  color: #fff;
  user-select: none;
  position: relative;
  > li {
    position: relative;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 2px 10px 0 rgba(211, 220, 227, 0.7);
    &.add-li {
      color: #333;
      text-align: center;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
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
      &:hover {
        .tips {
          transform: scale(1);
          opacity: 1;
        }
      }
      .tips {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
        transform: scale(0);
        opacity: 0;
        transition: 0.05s;
        color: var(--primary-color);
      }
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
