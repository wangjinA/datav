<template>
  <div class="SetupForm-container">
    <div v-if="target && item" class="SetupForm">
      <label>{{ item.name }}</label>
      <section>
        <!-- 图片上传 -->
        <template v-if="item.type === 'img'">
          <Upload action="/" type="drag" :before-upload="beforeUpload" accept="image/*">
            <div class="upload-preview" v-if="value">
              <img :src="$getUrl(value)" />
            </div>
            <div class="upload-text" v-else>点击上传</div>
          </Upload>
        </template>

        <!-- 下拉选择器 -->
        <template v-else-if="item.type === 'select'">
          <Select size="small" v-model="value">
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
          <CodeEditor v-model="value" :type="item.codeType" />
        </template>

        <!-- 颜色选择器 -->
        <template v-else-if="item.type === 'color'">
          <ColorPicker v-model="value" size="small" alpha @on-active-change="colorActiveChange" />
        </template>

        <!-- switch开关 -->
        <template v-else-if="item.type === 'switch'">
          <iSwitch v-model="value" @on-change="() => {}" />
        </template>

        <!-- 数字输入框 -->
        <template v-else-if="item.inputType === 'number'">
          <InputNumber size="small" :max="item.max" :min="item.min" v-model="value"></InputNumber>
        </template>

        <!-- 输入框 -->
        <Input v-else size="small" v-model="value" :type="item.inputType" />
      </section>
    </div>
    <!-- 递归组件实现关联选项 -->
    <template v-if="target && item.relation && item.relation[value]">
      <div v-for="(child, i) in item.relation[value]" :key="i">
        <SetupForm :target="target" :item="child" />
      </div>
    </template>
  </div>
</template>

<script>
import CodeEditor from "./CodeEditor";
import { debounce, deepClone } from "@/lib/utils";
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
  data() {
    return {
      value: null,
    };
  },
  watch: {
    target: {
      deep: true,
      immediate: true,
      handler: "initValue",
    },
    item: {
      deep: true,
      immediate: true,
      handler: "initValue",
    },
    value: {
      deep: true,
      handler(value) {
        console.log(this.item.name);
        console.log(value);
      },
    },
  },
  components: {
    CodeEditor,
  },
  methods: {
    initValue() {
      if (this.target && this.item) {
        this.value = deepClone(this.target[this.item.key]);
      }
    },

    // 图片上传
    beforeUpload(file) {
      const formData = new FormData();
      if (this.$route.params.id) {
        formData.append("dir", "datav_" + this.$route.params.id);
      }
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
