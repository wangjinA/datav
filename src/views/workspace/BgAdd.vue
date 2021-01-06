<!--
 * @Author: 汪锦
 * @Date: 2020-12-17 11:57:26
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-06 11:16:47
 * @Description: 图片添加
-->
<template>
  <div>
    <Form :model="formItem" :label-width="80">
      <FormItem label="类型">
        <RadioGroup v-model="formItem.type">
          <Radio :label="0">图片</Radio>
          <Radio :label="1">视频</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="`${typeText}选择`">
        <Upload
          action="/"
          type="drag"
          :before-upload="beforeUpload"
          :accept="`${formItem.type ? 'video' : 'image'}/*`"
        >
          <template v-if="formItem.src">
            <div class="upload-preview" v-if="formItem.type === 0">
              <img :src="$getUrl(formItem.src)" />
            </div>
            <div v-else>
              {{ formItem.name }}
            </div>
          </template>
          <div class="upload-text" v-else>点击上传</div>
        </Upload>
      </FormItem>
      <FormItem label="名称">
        <i-input v-model="formItem.name" placeholder="背景名称"></i-input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "BgAdd",
  data() {
    return {
      formItem: {
        src: "",
        name: "",
        type: 0, // 0 图片 1 视频
      },
    };
  },
  watch: {
    "formItem.type": {
      handler() {
        this.formItem.src = "";
      },
    },
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        if (!this.formItem.src) {
          reject();
          return this.$Message.error({
            content: `请选择${this.typeText}`,
          });
        }
        resolve({
          ...this.formItem,
        });
      });
    },
    beforeUpload(file) {
      console.log(file);
      this.formItem.name = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dir", "背景" + this.typeText);
      this.$API.upload(formData).then((res) => {
        this.formItem.src = res.data.src;
      });
      return false;
    },
    // 提交添加
    commit() {
      return this.getData().then((data) => {
        return this.$post("/api/bgList", data).then((res) => {
          if (res.status) {
            this.$Message.success("创建成功");
          }
        });
      });
    },
  },
  computed: {
    typeText() {
      return this.formItem.type ? "视频" : "图片";
    },
  },
};
</script>

<style lang="less" scoped>
.upload-preview {
  max-height: 250px;
  max-width: 400px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
