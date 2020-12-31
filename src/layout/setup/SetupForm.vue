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
          <Select size="small" :value="value" @on-change="onchange">
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
          <CodeEditor :value="value" @input="codeOnChange" :type="item.codeType" />
          <Button type="primary" size="small" style="margin-top: 12px;" @click="bigEditor"
            >放大编辑</Button
          >
        </template>

        <!-- 颜色选择器 -->
        <template v-else-if="item.type === 'color'">
          <ColorPicker :value="value" size="small" alpha @on-active-change="onchange" />
        </template>

        <!-- switch开关 -->
        <template v-else-if="item.type === 'switch'">
          <iSwitch :value="value" @on-change="onchange" />
        </template>

        <!-- 数字输入框 -->
        <template v-else-if="item.inputType === 'number'">
          <InputNumber
            size="small"
            :max="item.max"
            :min="item.min"
            :value="value"
            @on-change="onchange"
          ></InputNumber>
        </template>

        <!-- 输入框 -->
        <Input
          v-else
          size="small"
          :value="value"
          :type="item.inputType"
          @on-change="inputOnChange"
        />
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
import { deepClone } from "@/lib/utils";
import { mapState } from "vuex";
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
    isUpdateLayers: {
      type: Boolean,
      default: false,
    },
    isUpdateDatavInfo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("layer", ["activeLayer"]),
    value() {
      if (this.target && this.item) {
        return deepClone(this.target[this.item.key]);
      }
      return "";
    },
  },
  components: {
    CodeEditor,
  },
  methods: {
    bigEditor() {
      this.$store.commit("codeEditor/editorOpen", {
        code: this.value,
        type: this.item.codeType,
        callback: (e) => {
          this.setTargetValue(e);
        },
      });
    },
    setTargetValue(value) {
      clearTimeout(this.setTargetValue_timer);
      this.setTargetValue_timer = setTimeout(() => {
        this.$set(this.target, this.item.key, deepClone(value));

        if (this.isUpdateLayers) {
          this.$store.dispatch("updateLayers", {
            name: this.activeLayer.name,
            key: this.item.key,
            value: value,
          });
        } else if (this.isUpdateDatavInfo) {
          this.$store.dispatch("updateDatavInfo", {
            name: "全局设置",
            key: this.item.key,
            value: value,
          });
        }
      }, 20);
    },
    onchange(v) {
      this.setTargetValue(v);
    },
    inputOnChange(e) {
      this.setTargetValue(e.target.value);
    },
    codeOnChange(code) {
      this.setTargetValue(code);
    },

    // 图片上传
    beforeUpload(file) {
      const formData = new FormData();
      if (this.$route.params.id) {
        formData.append("dir", "datav_" + this.$route.params.id);
      }
      formData.append("file", file);
      this.$API.upload(formData).then((res) => {
        this.setTargetValue(res.data.src);
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
