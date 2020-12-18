<template>
  <div class="SetupForm-container">
    <div v-if="target && item" class="SetupForm">
      <label>{{ item.name }}</label>
      <section>
        <!-- 图片上传 -->
        <template v-if="item.type === 'img'">
          <Upload action="/" type="drag" :before-upload="beforeUpload" accept="image/*">
            <div class="upload-preview" v-if="target[item.key]">
              <img :src="$getUrl(target[item.key])" />
            </div>
            <div class="upload-text" v-else>点击上传</div>
          </Upload>
        </template>

        <!-- 下拉选择器 -->
        <template v-else-if="item.type === 'select'">
          <Select size="small" v-model="target[item.key]">
            <Option
              v-for="select in item.data"
              :value="select.value"
              :key="select.value"
              :label="select.name"
            ></Option>
          </Select>
        </template>

        <!-- 代码编辑器 -->
        <template v-else-if="item.type === 'code' || item.codeType">
          <CodeEditor v-model="target[item.key]" :type="item.codeType" />
        </template>

        <!-- 颜色选择器 -->
        <template v-else-if="item.type === 'color'">
          <ColorPicker
            v-model="target[item.key]"
            size="small"
            @on-active-change="colorActiveChange"
          />
        </template>

        <!-- 输入框 -->
        <Input v-else size="small" v-model="target[item.key]" :type="item.inputType" />
      </section>
    </div>
    <!-- 递归组件实现关联选项 -->
    <template v-if="target && item.relation && item.relation[target[item.key]]">
      <div v-for="(child, i) in item.relation[target[item.key]]" :key="i">
        <SetupForm :target="target" :item="child" />
      </div>
    </template>
  </div>
</template>

<script>
import CodeEditor from "./CodeEditor";
import { debounce } from "@/lib/utils";
export default {
  name: "SetupForm",
  props: {
    target: {
      type: Object,
      default: null,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CodeEditor,
  },
  methods: {
    // 图片上传
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      this.$API.upload(formData).then((res) => {
        this.$set(this.target, this.item.key, res.data.src);
      });
      return false;
    },

    // 颜色实时触发
    colorActiveChange: debounce(function(e) {
      this.target[this.item.key] = e;
    }),
  },
};
</script>

<style lang="less" scoped>
section {
  flex: 1;
  width: 0;
  > .ivu-upload {
    margin: 10px 0;
    .upload-text {
      height: 100%;
      justify-content: center;
      display: flex;
      align-items: center;
    }
    .upload-preview {
      height: 100%;
      width: 100%;
      position: relative;
      > img {
        height: 100%;
        width: 100%;
        left: 0;
        position: absolute;
      }
    }
  }
}
</style>
