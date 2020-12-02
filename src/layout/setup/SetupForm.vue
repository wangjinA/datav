<template>
  <div v-if="target && item" class="SetupForm">
    <label>{{ item.name }}</label>
    <section>
      <Upload
        action="/"
        v-if="item.type === 'img'"
        type="drag"
        :before-upload="beforeUpload"
        accept="image/*"
      >
        <div class="upload-preview" v-if="target[item.key]">
          <img :src="`/api/public/${target[item.key]}`" />
        </div>
        <div class="upload-text" v-else>点击上传</div>
      </Upload>
      <Input v-else size="small" v-model="target[item.key]" :type="item.inputType" />
    </section>
  </div>
</template>

<script>
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
  methods: {
    beforeUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      this.$post("/api/api/upload", formData).then((res) => {
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
