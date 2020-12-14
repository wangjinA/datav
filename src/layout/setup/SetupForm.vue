<template>
  <div v-if="target && item" class="SetupForm">
    <label>{{ item.name }}</label>
    <section>
      <!-- 图片上传 -->
      <template v-if="item.type === 'img'">
        <Upload action="/" type="drag" :before-upload="beforeUpload" accept="image/*">
          <div class="upload-preview" v-if="target[item.key]">
            <img :src="$getImgUrl(target[item.key])" />
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

      <!-- 输入框 -->
      <Input v-else size="small" v-model="target[item.key]" :type="item.inputType" />
    </section>
  </div>
</template>

<script>
import CodeEditor from "./CodeEditor";
export default {
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
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      this.$post("/api/upload", formData).then((res) => {
        this.$set(this.target, this.item.key, res.img);
      });
      return false;
    },
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
